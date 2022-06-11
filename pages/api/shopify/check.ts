// Called when connecting a new shop to Review Get.
// Checks if the shop has already been connected, if an access token exists.
// If it isn't, return the installation URL.

import { NextApiHandler } from "next";
import user from "src/models/user";
import * as jose from 'jose'
import { serialize } from 'cookie'

const handler: NextApiHandler = async (req, res) => {

	const shop = req.body.shop

	const result = await user
		.find({
			'settings.shops': {
				'$elemMatch': {
					'shopUrl': shop, 
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

	const nonce = await new jose.SignJWT({ shop, timestamp: new Date().getTime() })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('1h')
		.sign(jwk)


	// Construct the redirect URL.
	const api_key = process.env.SHOPIFY_API_CLIENT
	const scopes = process.env.SHOPIFY_API_SCOPES
	const redirect_uri = process.env.HOST + '/api/shopify/auth'
	const access_mode = 'value'
	const redirect = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${access_mode}`

	const serialized = serialize("ReviewGetNonce", nonce, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 30,
		path: "/"
	})

	res.setHeader('Set-Cookie', serialized)

	return res.status(200).json({success: true, redirect})
	
}

export default handler