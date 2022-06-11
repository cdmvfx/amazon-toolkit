import { JWTPayload, JWTVerifyResult } from 'jose';
import verifyToken from 'lib/verifyToken';
import { NextApiHandler } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/user";

const handler: NextApiHandler = async (req, res) => {

	const token = await verifyToken(req);

	if (!token.success) return res.status(403).json({success: false, error: token.payload});

	await dbConnect();

	const { id } = token.payload as JWTPayload;

	switch(req.method) {
		case "GET":
			const user = await User.findOne({_id: id}).lean();
			return res.status(200).json({success: true, message: 'Retrived settings.', payload: user.settings})
		case "POST":
			const body = req.body;
			const field = `settings.${body.category}`;
			const updateRes = await User.updateOne({_id: id}, { $set: { [field]: body.edits } })
			console.log(body);
			console.log(updateRes);
			return res.status(200).json({success: true, message: "Successfully updated settings.", payload: body})
	}


}

export default handler