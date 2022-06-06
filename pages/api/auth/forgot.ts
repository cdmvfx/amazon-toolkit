import jwt from "jsonwebtoken";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {

	const { email } = req.body

	let error = '';		

	if (!email || typeof email !== 'string') {
		error += 'Invalid email. ';
	}

	const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
	
	if (!regex.test(email)) {
		error += 'Invalid email. ';
	}

	if (error != '') return res.status(404).json({success: false, error: error})

	try {

		await dbConnect();

		const user = await User.findOne({ email }).lean()

		if (user) {

			const key = user.password + '-' + new Date(user.created).getTime()
			
			const token = jwt.sign({
				email: user.email,
				reset: true
			}, key)

			const link = `http://localhost:3000/auth/reset/${user._id}/${token}`

			// to do: send email with reset link

			return res.status(200).json({success: true, message: `Successfully sent reset link to ${email}.`, link: link})
		}

		return res.status(200).json({success: true, message: `Successfully sent reset link to ${email}.`})

	}
	catch (err) {
		console.log(err)
		res.status(403).json({success: false, error: "Invalid request."})
	}


}

export default handler;