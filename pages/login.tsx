import axios from "axios"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Login from "../src/components/auth/Login"
import { verifyToken } from "../src/utilities/basicAuth"

type LoginProps = {
	isLoggedIn: boolean
}

const login = (props: LoginProps) => {

	return (
		<Login />
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return verifyToken(context)
}

export default login