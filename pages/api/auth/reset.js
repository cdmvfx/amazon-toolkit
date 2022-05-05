import jwt from "jsonwebtoken";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {

	const { email } = req.body

	let error = '';		

	if (!email || typeof email !== 'string') {
		error += 'Invalid email. ';
	}

	const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	
	if (!regex.test(email)) {
		error += 'Invalid email. ';
	}

	if (error != '') return res.status(401).json({success: false, error: error})

	try {

		await dbConnect();

		const user = await User.findOne({ email }).lean()

		if (user) {
			// to do: send email with reset link
		}

		return res.status(200).json({success: true, message: `Successfully sent reset link to ${email}.`})
	}
	catch (err) {
		console.log(err)
		res.status(403).json({success: false, error: "Invalid request."})
	}


}