import jwt from "jsonwebtoken";

function authUser (req, res) {
	if (req.user == null) {
		return res.status(403).json({success: false, message: "You are not signed in."})
	}
}

function verifyToken (context) {

	const path = context.resolvedUrl

	const publicRoutes = ['/', '/login', '/reset'];

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
		const user = jwt.verify(token, JWT_SECRET)
		return {
			props: { signedIn: true, token },
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

module.exports = {
	authUser,
	verifyToken
}