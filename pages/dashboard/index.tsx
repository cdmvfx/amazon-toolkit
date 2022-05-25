import { verifyToken } from '../../src/utilities/basicAuth'
import DashboardPage from '../../src/components/dashboard/DashboardPage'
import { useOAuth } from "shopify-nextjs-toolbox";

const dashboard = () => {

	useOAuth();

	return (
		<DashboardPage>
			Home dashboard here.
		</DashboardPage>
	)
}



export default dashboard