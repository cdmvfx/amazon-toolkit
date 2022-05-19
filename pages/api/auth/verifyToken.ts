import jwt from "jsonwebtoken";
import { NextApiHandler } from "next";

const verifyToken: NextApiHandler = (req, res) => {

	const JWT_SECRET = process.env.JWT_SECRET;

	const token = req.cookies.ReviewGet

	let _id;

	if (!JWT_SECRET)
		res.status(404).json({ message: 'No secret found.' })

	try {
		const user = jwt.verify(token, JWT_SECRET as string)
		res.status(200).json({ _id: user.id })
	}
	catch (err) {
		res.status(403).json({ message: 'Failed to verify token.' })
	}

}

export default verifyToken