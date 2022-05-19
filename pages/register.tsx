import { GetServerSideProps } from "next"
import Register from "../src/components/auth/Register"
import { verifyToken } from "../src/utilities/basicAuth"

const register = () => {
	return (
		<Register />
	)
}

export default register

export const getServerSideProps: GetServerSideProps = async (context) => {
	return verifyToken(context)
}
