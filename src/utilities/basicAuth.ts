import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";

export const verifyToken = (context: GetServerSidePropsContext) => {

	const path = context.resolvedUrl

	const publicRoutes = ['/', '/login', '/reset', '/register'];

	const token = context.req.cookies['ReviewGet']
	const JWT_SECRET = process.env.JWT_SECRET;

	if (!token && !publicRoutes.includes(path)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

	if (!token) {
		return {
			props: { signedIn: false }
		}
	}

	try {
		const user = jwt.verify(token, JWT_SECRET as string)

		if (['/login', '/reset', '/forgot', '/register'].includes(path)) {
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false,
				},
			}
		}

		return {
			props: { signedIn: true, token: token },
		}
	}
	catch (err) {
		console.log(err)
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}
	
}