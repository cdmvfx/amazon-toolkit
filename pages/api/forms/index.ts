import { NextApiHandler } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";

const handler: NextApiHandler = async (req, res) => {


	if (!_id) return res.status(403).json({success: false, error: "Invalid request."});

	await dbConnect();

	switch(req.method) {
		case "GET":
			const forms = await User.find({uid: _id}).lean();
			return res.status(200).json({success: true, message: 'Retrived forms.', payload: forms})
		case "POST":
			const {_id, fid, form} = req.body;
			await User.updateOne({uid: _id, fid: fid}, { $set: form })
			return res.status(200).json({success: true, message: "Successfully updated forms.", payload: form})
	}


}

export default handler;