import { NextApiHandler } from "next";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/User";
import bcrypt from 'bcrypt';

const handler: NextApiHandler = async (req, res) => {

	const {method} = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({})
				res.status(200).json({success: true, data: users})
			}
			catch (err) {
				res.status(400).json({success: false})
			}
			break;
		case 'POST': 
			try {

				if (!req.body) {
					res.statusCode = 404
					res.end('Error')
					return
				}
			
				const {fname, lname, email, password} = req.body;

				let error = '';

				if (!fname || typeof fname !== 'string') {
					error += 'Please provide your first name. ';
				}

				if (!lname || typeof lname !== 'string') {
					error += 'Please provide your last name. ';
				}

				if (!email || typeof email !== 'string') {
					error += 'Invalid email. ';
				}
				
				if (!password || typeof password !== 'string') {
					error += 'Invalid password. ';
				}

				if (password.length < 6) {
					error += 'Please provide a password longer than 6 characters.';
				}

				if (error != '') return res.status(200).json({success: false, error: error})

				const hashed = await bcrypt.hash(password, 10);

				try {
					const response = await User.create({
						fname,
						lname,
						email,
						password: hashed
					})

					console.log('User created successfully', response)
					return res.status(200).json({success: true, user: response})
				}
				catch (err: any) {
					console.log(err)
					if (err.code === 11000) {
						// Duplicate email
						return res.status(200).json({success: false, error: 'Email is already registered. Please log in.'})
					}
					throw err;
				}
			
				// res.status(200).json({
				// 	fname, lname, username, hashed,
				// 	token: jwt.sign({
				// 		username,
				// 		hashed,
				// 		admin: username === 'admin' && password === 'admin'
				// 	}, 'fdsfdsfdsf')
				// });

			}
			catch (err) {
				console.log('post error', err)
				res.status(400).json({success: false})
			}
			break;
	}
}

export default handler;