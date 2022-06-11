import { NextApiRequest } from 'next';
import { jwtVerify } from 'jose'
import { LoginJWT } from 'pages/api/auth/login';

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
			payload: verify.payload as LoginJWT
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