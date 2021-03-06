import { serialize } from 'cookie'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {

	const { cookies } = req

	const token = cookies.ReviewGet

	if(!token) {
		return res.status(401).json({success: false, message: "You are already logged out."})
	}

	const serialized = serialize("ReviewGet", '', {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 0,
		path: "/"
	})

	res.setHeader("Set-Cookie", serialized)
	res.status(200).json({message: "Successfully logged out."})

}

export default handler;