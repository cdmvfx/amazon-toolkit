import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";
import verifyToken from '../auth/verifyToken'

export default async function handler(req: NextRequest, res: NextResponse) {

	const _id = verifyToken(req);

	if (!_id) return res.status(403).json({success: false, error: "Invalid request."});

	await dbConnect();

	switch(req.method) {
		case "GET":
			const user = await User.findOne({_id}).lean();
			return res.status(200).json({success: true, message: 'Retrived settings.', payload: user.settings})
		case "POST":
			const settings = req.body;
			await User.updateOne({_id}, { $set: { settings: settings } })
			return res.status(200).json({success: true, message: "Successfully updated settings.", settings})
	}


}