import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import hmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { generateSecret, jwtVerify, KeyLike, SignJWT } from 'jose'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

	// When a user tries to install the app, Shopify will direct them to the home page of the app.
	// If a HMAC is found, validate it with the Shopify App secret.
	// If validated, send to authorization page.

	// Example URL 
	// https://app.com/?hmac=2f9d05f5ca7dee4173194deec74b329e303b3272adc94a7732f516265fa62b66&host=Y2RtLXRlc3RpbmcubXlzaG9waWZ5LmNvbS9hZG1pbg&shop=cdm-testing.myshopify.com&timestamp=1653397089

	const hmac = req.nextUrl.searchParams.get('hmac');
	const host = req.nextUrl.searchParams.get('host');
	const shop = req.nextUrl.searchParams.get('shop');
	const timestamp = req.nextUrl.searchParams.get('timestamp');
	
	if (hmac && host && shop && timestamp && req.nextUrl.pathname === '/') {
		
		const string = `host=${host}&shop=${shop}&timestamp=${timestamp}`;

		const secret = process.env.SHOPIFY_API_SECRET as string;
		
		const base64String = Base64.stringify(hmacSHA256(string, secret));
		const signedString = Base64.parse(base64String).toString();

		if (hmac === signedString) {
			const api_key = process.env.SHOPIFY_API_CLIENT
			const scopes = process.env.SHOPIFY_API_SCOPES
			const redirect_uri = 'https://a448-2603-9001-e00-19e9-111a-d252-ef5b-c89a.ngrok.io/api/shopify/auth'
			const access_mode = 'value'
			
			const jwt_secret = Base64.
			const SHOPIFY_JWT_SECRET = await crypto.subtle.decrypt('HS256', jwt_secret,)

			console.log('jwt_secret', jwt_secret);
			console.log('SHOPIFY_JWT_SECRET', SHOPIFY_JWT_SECRET);

			const nonce = await new SignJWT({shop, timestamp})
				.setProtectedHeader({ alg: 'HS256' })
				.setIssuedAt()
				.setExpirationTime('1h')
				.sign(jwt_secret)

			const redirect = `https://${shop}/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${access_mode}`
			
			const res = NextResponse.redirect(redirect)

			res.cookie('ReviewGetNonce', nonce, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== "development",
				sameSite: "strict",
				maxAge: 3600,
				path: "/"
			});

			return res;
		}

		console.log('secret', secret);
		console.log('HMAC string', hmac);
		console.log('Test string', string);
		console.log('Test string signed', signedString);

	}
	

	return NextResponse.next()

}
