import jwt from "jsonwebtoken";
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";
import bcrypt from 'bcrypt';
import { NextRequest } from "next/server";

const verifyToken = (req: NextRequest): string | boolean => {

	const JWT_SECRET = process.env.JWT_SECRET;

	const token = req.cookies.ReviewGet

	let _id;

	try {
		const user = jwt.verify(token, JWT_SECRET)
		_id = user.id;
		return _id;
	}
	catch (err) {
		return false;
	}

}

export default verifyToken