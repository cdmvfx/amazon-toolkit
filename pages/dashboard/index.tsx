import { verifyToken } from '../../src/utilities/basicAuth'
import { Box } from '@chakra-ui/react'
import DashboardPage from '../../src/components/dashboard/DashboardPage'
import FormsList from '../../src/components/dashboard/forms/FormsList'

const dashboard = () => {

	return (
		<DashboardPage>
				Home dashboard here.
	</DashboardPage>
	)
}



export default dashboard


export const getServerSideProps = async (context) => {

	return verifyToken(context)

}