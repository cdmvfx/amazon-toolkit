import jwt from "jsonwebtoken";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/User";
import bcrypt from 'bcrypt';
import { serialize } from 'cookie'
import { NextApiHandler } from 'next'

export type LoginJWT = {
	id: string
	email: string
	role: string
}

const handler: NextApiHandler = async (req, res) => {

	if (!req.body) {
		res.statusCode = 404
		res.end('Error')
		return
	}

	await dbConnect();

	const KEY = process.env.JWT_SECRET as string;

	const { email, password } = req.body;

	let error = '';

	if (!email || typeof email !== 'string') {
		error += 'Please provide your email. ';
	}

	if (!password || typeof password !== 'string') {
		error += 'Please provide your password. ';
	}

	if (error != '') return res.status(200).json({ success: false, error: error })

	const user = await User.findOne({ email }).lean();

	if (!user) {
		return res.status(401).json({ success: false, error: "Invalid email and password combination." })
	}

	if (! await bcrypt.compare(password, user.password)) {
		return res.status(401).json({ success: false, error: "Invalid email and password combination!" })
	}

	const token = jwt.sign({
		id: user._id,
		email,
		role: email == "cmpkmninja@gmail.com" ? "admin" : "user"
	}, KEY)

	const serialized = serialize("ReviewGet", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 60 * 60 * 24 * 30,
		path: "/"
	})

	res.setHeader('Set-Cookie', serialized)

	res.status(200).json({
		success: true
	})

}

export default handler;