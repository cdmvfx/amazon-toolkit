import { NextApiHandler } from "next";
import User from "src/models/User";
import * as jose from 'jose'
import { serialize } from 'cookie'
import dbConnect from "lib/dbConnect";
import verifyToken from "lib/verifyToken";
import { ReviewGetUser } from "src/types/User";
import Shopify from "@shopify/shopify-api";

const handler: NextApiHandler = async (req, res) => {

	const token = await verifyToken(req);

	if (!token.success) return res.status(403).json({success: false, message: token.payload});

	await dbConnect();
	const { id } = token.payload as jose.JWTPayload;

	const user: ReviewGetUser = await User.findOne({_id: id}).lean();

	let accessToken = null;

	if (user) {
		for (const shop of user.settings.shops) {
			if (shop.shopUrl === req.body.shopUrl && shop.type === 'shopify' && shop.accessToken) {
				accessToken = shop.accessToken;
				break;
			}
		}
	}

	if (!accessToken) {
		return res.status(403).json({success: false, message: 'Invalid shop.'});
	}

	const client = new Shopify.Clients.Rest(req.body.shopUrl, accessToken);

	const products = await client.get({path: 'products'}) as any;

	return res.status(200).json({success: true, products: products.body.products});

}

export default handler