import jwt from "jsonwebtoken";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/User";
import bcrypt from 'bcrypt';
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {

	const { newPassword, confirmNewPassword, uid, token } = req.body

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
		
		const user = await User.findOne({_id: uid}).lean();

		if (!user) {
			throw new Error('User not found.')
		}

		const key = user.password + '-' + new Date(user.created).getTime()

		const resetData = jwt.verify(token, key)

		if (!resetData.reset) {
			throw new Error('Not a reset token.')
		}

		const hashed = await bcrypt.hash(newPassword, 10)

		await User.updateOne({ _id: user._id }, {
			$set: { password: hashed }
		})

		return res.status(200).json({success: true, message: 'Successfully changed password.'})
	}
	catch (err) {
		res.status(403).json({success: false, error: "Invalid request.", err})
	}


}

export default handler;