import { NextApiRequest } from 'next';
import { jwtVerify } from 'jose'

const verifyToken = async (req: NextApiRequest) => {

	const JWT_SECRET = process.env.JWT_SECRET;

	if (!JWT_SECRET) {
		return {
			success: false,
			payload: 'No JWT secret.'
		}
	}

	const token = req.cookies.ReviewGet

	if (typeof token === 'undefined') {
		return {
			success: false,
			payload: 'No JWT.'
		}
	}

	try {
		const verify = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
		return {
			success: true,
			payload: verify.payload
		}
	}
	catch (err) {
		return {
			success: false,
			payload: 'Failed to get user.'
		}
	}

}

export default verifyToken