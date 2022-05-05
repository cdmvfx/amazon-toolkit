import { serialize } from 'cookie'

export default async function handler(req, res) {

	const { cookies } = req

	const token = cookies.ReviewGet

	if(!token) {
		return res.status(401).json({success: false, message: "You are already logged out."})
	}

	const serialized = serialize("ReviewGet", null, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 30,
		path: "/"
	})

	res.setHeader("Set-Cookie", serialized)
	res.status(200).json({message: "Successfully logged out."})

}