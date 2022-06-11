import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useState } from "react"
import FormsNew from "src/components/app/forms/new"
import { ReviewGetUser } from "src/types/User"
import DashboardPage, { NavChild, NavParent, navTree } from "../../../src/components/app/DashboardPage"
import FormsList from "../../../src/components/app/forms/FormsList"

type FormsProps = {
	user: ReviewGetUser
}

const index = ({user}: FormsProps) => {

	const router = useRouter()
	const { asPath } = router

	const navTreeByPath = navTree.reduce((obj: { [path: string]: NavParent }, parent) => {
		obj[parent.path] = parent;
		return obj;
	}, {})

	const activePage = navTreeByPath[asPath];

	const [activeChildIndex, setActiveChildIndex] = useState<number>(0)

	return (
		<DashboardPage activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} >
			<Contr activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} />
		</DashboardPage>
	)
}

type ContrProps = {
	activePage: NavParent
	activeChildIndex: number
	setActiveChildIndex: Dispatch<SetStateAction<number>>
}

const Contr = ({activePage, activeChildIndex}: ContrProps) => {
	switch((activePage.children as NavChild[])[activeChildIndex].slug) {
		case 'all':
			return (
				<FormsList user={user} />
			)
		case 'new':
			return (
				<FormsNew />
			)
		default:
			return <Box>No page found.</Box>
	}
}

export default index