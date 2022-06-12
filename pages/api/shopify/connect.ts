// Called when connecting a new shop to Review Get.
// Checks if the shop has already been connected, if an access token exists.
// If it isn't, return the installation URL.

import { NextApiHandler } from "next";
import User from "src/models/User";
import * as jose from 'jose'
import { serialize } from 'cookie'
import dbConnect from "lib/dbConnect";
import verifyToken from "lib/verifyToken";

const handler: NextApiHandler = async (req, res) => {

	const token = await verifyToken(req);

	if (!token.success) return res.status(403).json({success: false, message: token.payload});

	await dbConnect();

	const { id } = token.payload as jose.JWTPayload;

	const shopName = req.body.shopName

	const shopUrl = `${shopName}.myshopify.com`

	const result = await User
		.find({
			'settings.shops': {
				'$elemMatch': {
					'shopUrl': shopUrl, 
					'type': 'shopify'
				}
			}
		})
		.lean()

	if (result.length) {
		return res.status(200).json({success: false, message: 'Shop is already connected to ReviewGet.'})
	}

	// Create a nonce JWT to persist as HTTPonly cookie.
	const jwk = await jose.importJWK({ kty: 'oct', k: process.env.SHOPIFY_AUTH_JWK }, 'HS256')

	const nonce = await new jose.SignJWT({ shopUrl, timestamp: new Date().getTime() })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1h')
		.sign(jwk)


	// Construct the redirect URL.
	const api_key = process.env.SHOPIFY_API_CLIENT
	const scopes = process.env.SHOPIFY_API_SCOPES
	const redirect_uri = process.env.HOST + '/api/shopify/auth'
	const access_mode = 'value'
	const redirect = `https://${shopUrl}/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${access_mode}`

	const serialized = serialize("ReviewGetNonce", nonce, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 30,
		path: "/"
	})

	const updateRes = await User.updateOne({_id: id}, { $push: { "settings.shops": { status: 'pending', type: 'shopify', shopUrl } } }).lean();

	res.setHeader('Set-Cookie', serialized)

	return res.status(200).json({success: true, redirect})
	
}

export default handler