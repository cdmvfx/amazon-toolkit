import { useRouter } from "next/router"
import { useState } from "react"
import DashboardPage, { NavParent, navTree } from "../../src/components/app/DashboardPage"

const dashboard = () => {

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
			Home dashboard here.
		</DashboardPage>
	)
}



export default dashboard