import axios from 'axios';
import { NextApiHandler } from 'next';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import * as jose from 'jose'
import User from "src/models/User";
import dbConnect from 'lib/dbConnect';
import verifyToken from 'lib/verifyToken';

// When a merchant approves app permissions and clicks 'Install app',
// a GET request will be made to this endpoint.

// Example URI
// https://example.org/some/redirect/uri?code={authorization_code}&hmac=da9d83c171400a41f8db91a950508985&host={base64_encoded_hostname}&shop={shop_origin}&state={nonce}&timestamp=1409617544


const handler: NextApiHandler = async (req, res) => {

	const token = await verifyToken(req);
	if (!token.success) return res.status(403).json({success: false, message: token.payload});
	await dbConnect();
	const { id } = token.payload as jose.JWTPayload;

	const client_secret = process.env.SHOPIFY_API_SECRET as string

	// Get all parameters in URL.
	const code = req.query.code;
	const hmac = req.query.hmac;
	const host = req.query.host;
	const shop = req.query.shop as string;
	const nonce = req.query.state as string;
	const timestamp = req.query.timestamp;

	if (!code || !hmac || !host || !shop || !nonce || !timestamp) {
		return res.status(403).json({status: 'failed', message: 'Missing parameters.'}); 
	}
	
	// Remove HMAC, restructure the query,
	// hash the string using the Shopify app secret,
	// then compare to the HMAC
	const string = `code=${code}&host=${host}&shop=${shop}&state=${nonce}&timestamp=${timestamp}`;
	const base64String = Base64.stringify(hmacSHA256(string, client_secret));
	const signedString = Base64.parse(base64String).toString();
	if (hmac !== signedString) {
		return res.status(403).json({status: 'failed', message: 'Invalid HMAC.'}); 
	}

	// Get nonce from cookies and compare to nonce in query.
	const nonce_cookies = req.cookies.ReviewGetNonce;
	if (nonce_cookies !== nonce) {
		return res.status(403).json({status: 'failed', message: 'Invalid nonce.'});
	}

	// Verify the nonce is legitimate.
	try {
		const jwk = await jose.importJWK({kty: 'oct', k: process.env.SHOPIFY_AUTH_JWK}, 'HS256')
		await jose.jwtVerify(nonce, jwk)
	}
	catch (e) {
		return res.status(403).json({status: 'failed', message: 'Invalid JWT.'}); 
	}

	// Verify the shop is a valid hostname.
	if (!shop.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*.myshopify.com/)) {
		return res.status(403).json({status: 'failed', message: 'Invalid hostname.'}); 
	}

	// If all security checks pass, exchange the access code for a permanent token.

	const client_id = process.env.SHOPIFY_API_CLIENT

	const shopify_res = await axios.post(`https://${shop}/admin/oauth/access_token`, {
		client_id,
		client_secret,
		code 
	})
		.then((res) => {
			return {
				success: true,
				message: 'Successfully got access token.',
				payload: res.data
			}
		})
		.catch((err: string) => {
			return { success: false, message: err, payload: {} }
		})

	if (!shopify_res.success) {
		return res.status(403).json({status: 'failed', message: shopify_res.message}); 
	}

	const scopes = process.env.SHOPIFY_API_SCOPES

	if (scopes != shopify_res.payload.scope) {
		return res.status(403).json({status: 'failed', message: 'Invalid scopes.'}); 
	}

	const access_token = shopify_res.payload.access_token;

	// To do: update user document in database.
	const updateRes = await User.updateOne(
		{
			_id: id, "settings.shops.shopUrl": shop
		}, 
		{ 
			$set: {
				"settings.shops.$.accessToken": access_token, 
				"settings.shops.$.status": 'connected'
			}
		}
	)

	return res.status(200).send('Installation successful. You may now close this page.');
	

}

export default handler;