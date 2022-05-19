import { GetServerSideProps } from "next";
import Reset from "../../../../src/components/auth/Reset";
import { verifyToken } from "../../../../src/utilities/basicAuth";

const reset = () => {
	return (
		<Reset />
	)
};

export default Reset;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return verifyToken(context)
}
