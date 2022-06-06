import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

	const token = req.cookies['ReviewGet'];

	if (typeof token === 'undefined') {
		const url = req.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url)
	}

	const JWT_SECRET = process.env.JWT_SECRET;

	try {
		// console.log('Signed in. Proceeding to dashboard.');
		const user = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
		return NextResponse.next()
	}
	catch (err) {
		console.log('Error verifying token.', err)
		const url = req.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url)
	}

}