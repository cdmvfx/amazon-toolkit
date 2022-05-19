import { GetServerSideProps } from "next"
import Forgot from "../src/components/auth/Forgot"
import { verifyToken } from "../src/utilities/basicAuth"

const forgot = () => {
	return (
		<Forgot />
	)
}

export default forgot

export const getServerSideProps: GetServerSideProps = async (context) => {
	return verifyToken(context)
}
