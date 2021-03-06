import verifyToken from 'lib/verifyToken';
import { NextApiHandler } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/User";

const handler: NextApiHandler = async (req, res) => {

	const token = await verifyToken(req)

	if (!token.success || typeof token.payload === 'string') return res.status(403).json({success: false, error: "Invalid request."});

	const { id } = token.payload

	await dbConnect();

	switch(req.method) {
		case "GET":{
			const forms = await User.find({uid: id}).lean();
			return res.status(200).json({success: true, message: 'Retrived forms.', payload: forms})
		}
		case "POST": {
			const {_id, fid, form} = req.body;
			await User.updateOne({uid: _id, fid: fid}, { $set: form })
			return res.status(200).json({success: true, message: "Successfully updated forms.", payload: form})
		}
	}


}

export default handler;