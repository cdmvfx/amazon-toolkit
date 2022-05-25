import axios from 'axios';
import { NextApiHandler } from 'next';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import jwt from "jsonwebtoken";

// When a merchant approves app permissions and clicks 'Install app',
// a GET request will be made to this endpoint.

// Example URI
// https://example.org/some/redirect/uri?code={authorization_code}&hmac=da9d83c171400a41f8db91a950508985&host={base64_encoded_hostname}&shop={shop_origin}&state={nonce}&timestamp=1409617544


const handler: NextApiHandler = async (req, res) => {

	const client_secret = process.env.SHOPIFY_API_SECRET as string

	console.log('All query', req.query);

	// Get all parameters in URL.
	const code = req.query.code;
	const hmac = req.query.hmac;
	const host = req.query.host;
	const shop = req.query.shop;
	const nonce = req.query.state as string;
	const timestamp = req.query.timestamp;

	const string = `code=${code}&host=${host}&shop=${shop}&state=${nonce}&timestamp=${timestamp}`;

	const base64String = Base64.stringify(hmacSHA256(string, client_secret));
	const signedString = Base64.parse(base64String).toString();

	console.log('HMAC compare', hmac, signedString);
	if (hmac !== signedString) {
		console.log('Invalid HMAC');
		res.status(403).json({status: 'failed', message: 'Invalid HMAC.'}); 
	}

	try {
		const token = jwt.verify(nonce, client_secret);
	}
	catch (e) {
		console.log('Invalid JWT.');
		res.status(403).json({status: 'failed', message: 'Invalid JWT.'}); 
	}

	return;

	// If all security checks pass, exchange the access code for a permanent token.
	if (!true) {

		const client_id = process.env.SHOPIFY_API_CLIENT

		const access_token = await axios.post(`https://${shop}/admin/oauth/access_token`, {
			client_id,
			client_secret,
			code 
		})
			.then((res) => {
				console.log('Successfully got access token.', res.data);
				return res.data.access_token
			})
			.catch((err) => {
				console.log('Failed to get access token,', err)
			})
	}

	res.status(200).json({status: 'success', message: 'Successfully stored access token.'});
}




export default handler;