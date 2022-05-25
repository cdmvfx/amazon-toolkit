import { NextApiHandler } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Product from "../../../src/models/Product";
import verifyToken from '../auth/verifyToken'
import User from "../../../src/models/user";

const handler: NextApiHandler = async (req, res) => {
	
	// To do: Verify incoming request's JWT, and throw error if invalid or missing.

	await dbConnect();

	switch(req.method) {
		case "GET":
			const products = await Product.find({}).lean();
			return res.status(200).json({success: true, message: 'Retrieved products.', payload: products})
		case "POST":
			const {pid, product} = req.body;
			await User.updateOne({uid: _id, pid}, { $set: product })
			return res.status(200).json({success: true, message: "Successfully updated product.", payload: product})
	}

	return res.status(403).json({success: false, error: "Invalid request."});

}

export default handler;