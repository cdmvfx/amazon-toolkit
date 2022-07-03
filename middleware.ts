import { NextMiddleware, NextResponse } from 'next/server'
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import * as jose from 'jose'

export const middleware: NextMiddleware = async (req, event) => {

	if (req.nextUrl.pathname === '/') {

		// When a user tries to install the app, Shopify will direct them to the home page of the app.
		// If a HMAC is found, validate it with the Shopify App secret.
		// If validated, send to authorization page.

		// Example URL 
		// https://app.com/?hmac=2f9d05f5ca7dee4173194deec74b329e303b3272adc94a7732f516265fa62b66&host=Y2RtLXRlc3RpbmcubXlzaG9waWZ5LmNvbS9hZG1pbg&shop=cdm-testing.myshopify.com&timestamp=1653397089

		const hmac = req.nextUrl.searchParams.get('hmac');
		const host = req.nextUrl.searchParams.get('host');
		const shop = req.nextUrl.searchParams.get('shop');
		const timestamp = req.nextUrl.searchParams.get('timestamp');

		if (!hmac || !host || !shop || !timestamp || req.nextUrl.pathname !== '/') {
			return NextResponse.next()
		}

		// Removing HMAC, restructure the query, hash the string using the Shopify app secret,
		// then compare to the HMAC
		const string = `host=${host}&shop=${shop}&timestamp=${timestamp}`;
		const secret = process.env.SHOPIFY_API_SECRET as string;
		const base64String = Base64.stringify(hmacSHA256(string, secret));
		const signedString = Base64.parse(base64String).toString();

		if (hmac !== signedString) {
			const errorUrl = new URL('/error', req.url)
			errorUrl.searchParams.set('error', 'Invalid HMAC')
			return NextResponse.redirect(errorUrl)
		}

		// Create a nonce JWT to persist as HTTPonly cookie.
		const jwk = await jose.importJWK({ kty: 'oct', k: process.env.SHOPIFY_AUTH_JWK }, 'HS256')

		const nonce = await new jose.SignJWT({ shop, timestamp })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('1h')
			.sign(jwk)


		// Construct the redirect URL.
		const api_key = process.env.SHOPIFY_API_CLIENT
		const scopes = process.env.SHOPIFY_API_SCOPES
		const redirect_uri = process.env.HOST + '/api/shopify/auth'
		const access_mode = 'value'
		const redirect = `https://${shop}/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${access_mode}`


		// Redirect user and set cookie.
		const res = NextResponse.redirect(redirect)

		res.cookies.set('ReviewGetNonce', nonce, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "lax",
			maxAge: 3600,
			path: "/"
		});

		return res;

	}

	if (req.nextUrl.pathname.startsWith('/app')) {
		
		const token = req.cookies.get('ReviewGet');

		const loginUrl = new URL('/auth/login', req.url)

		if (typeof token === 'undefined') {
			return NextResponse.redirect(loginUrl)
		}
	
		const JWT_SECRET = process.env.JWT_SECRET;
	
		try {
			await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
			return NextResponse.next()
		}
		catch (err) {
			console.log('Error verifying token.', err)
			return NextResponse.redirect(loginUrl)
		}
	}

	if (req.nextUrl.pathname.startsWith('/auth')) {
		const token = req.cookies.get('ReviewGet');

		if (typeof token === 'undefined') {
			return NextResponse.next()
		}
	
		const JWT_SECRET = process.env.JWT_SECRET;
	
		try {
			await jose.jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
			const appUrl = new URL('/app', req.url)
			return NextResponse.redirect(appUrl)
		}
		catch (err) {
			return NextResponse.next()
		}
	}


}

// Supports both a single string value or an array of matchers
export const config = {
	matcher: [
		'/',
		'/app/:path*',
		'/auth/:path*'
	],
}