import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {

	const token = req.cookies['ReviewGet'];

	if (typeof token === 'undefined') {
		return NextResponse.next()
	}

	const JWT_SECRET = process.env.JWT_SECRET;

	try {
		const user = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
		console.log('Redirecting to dashboard.');
		const url = req.nextUrl.clone();
		url.pathname = '/dashboard';
		return NextResponse.redirect(url)
	}
	catch (err) {
		return NextResponse.next()
	}

}
