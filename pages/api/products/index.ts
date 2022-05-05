import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Product from "../../../src/models/Product";
import verifyToken from '../auth/verifyToken'

export default async function handler(req: NextRequest, res: NextResponse) {

	const _id = verifyToken(req);

	if (!_id) return res.status(403).json({success: false, error: "Invalid request."});

	await dbConnect();

	switch(req.method) {
		case "GET":
			console.log('getting products')
			const products = await Product.find({}).lean();
			console.log('products got')
			console.log(products)
			return res.status(200).json({success: true, message: 'Retrieved products.', payload: products})
		case "POST":
			const {pid, product} = req.body;
			await User.updateOne({uid: _id, pid}, { $set: product })
			return res.status(200).json({success: true, message: "Successfully updated product.", payload: product})
	}


}