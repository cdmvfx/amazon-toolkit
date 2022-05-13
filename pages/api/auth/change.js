import jwt from "jsonwebtoken";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {

	const JWT_SECRET = process.env.JWT_SECRET;

	const { cookies } = req

	const token = cookies.ReviewGet

	const { newPassword, confirmNewPassword } = req.body

	let error = '';		

	if (!newPassword || typeof newPassword !== 'string') {
		error += 'Invalid password. ';
	}

	if (newPassword.length < 6) {
		error += 'Please provide a password longer than 6 characters. ';
	}
	
	if (newPassword !== confirmNewPassword) {
		error += 'Make sure both fields match.';
	}

	if (error != '') return res.status(401).json({success: false, error: error})

	try {
		const user = jwt.verify(token, JWT_SECRET)
		const _id = user.id;

		const hashed = await bcrypt.hash(newPassword, 10)

		await User.updateOne({ _id }, {
			$set: { password: hashed }
		})

		return res.status(200).json({success: true, message: 'Successfully changed password.'})
	}
	catch (err) {
		res.status(403).json({success: false, error: "Invalid request."})
	}


}