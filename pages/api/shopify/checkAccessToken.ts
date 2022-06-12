import { JWTPayload } from 'jose';
import verifyToken from 'lib/verifyToken';
import { NextApiHandler } from 'next';
import { ReviewGetUser } from 'src/types/User';
import dbConnect from '../../../lib/dbConnect';
import User from "../../../src/models/User";

const handler: NextApiHandler = async (req, res) => {

	const token = await verifyToken(req);

	if (!token.success) return res.status(403).json({success: false, error: token.payload});

	await dbConnect();

	const { id } = token.payload as JWTPayload;

	const { shopName } = req.body
	const shopUrl = `${shopName}.myshopify.com`

	const user: ReviewGetUser = await User.findOne({_id: id}).lean()

	for (const shop of user.settings.shops) {
		if (shop.type !== 'shopify') continue
		if (shop.shopUrl !== shopUrl) continue
		if (!shop.accessToken) continue
		return res.status(200).json({success: true, message: 'Access token successfully retrieved.'})
	}

	return res.status(200).json({success: false, message: 'No access token.'})

}

export default handler