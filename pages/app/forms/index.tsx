import { Box, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "src/app/store"
import { fetchForms, selectForms } from "src/features/forms/formsSlice"
import { ReviewGetUser } from "src/types/User"
import DashboardPage, { NavChild, NavParent, navTree } from "../../../src/components/app/DashboardPage"
import FormsList from "../../../src/components/app/forms/FormsList"

const index = () => {

	const toast = useToast()

	// Get current path and send to sidebar/header navigation.

	const router = useRouter()
	const { asPath } = router

	const navTreeByPath = navTree.reduce((obj: { [path: string]: NavParent }, parent) => {
		obj[parent.path] = parent;
		return obj;
	}, {})

	const activePage = navTreeByPath[asPath];

	const [activeChildIndex, setActiveChildIndex] = useState<number>(0)


	// Get settings if not in state.

	const dispatch = useDispatch()
	const forms = useSelector(selectForms)
	const formsStatus = useSelector((state: AppState) => state.settings.status)

	useEffect(() => {
    if (formsStatus === 'idle') {
      dispatch(fetchForms())
    }
  }, [formsStatus, dispatch])

	switch((activePage.children as NavChild[])[activeChildIndex].slug) {
		case 'all':
			return (
				<DashboardPage activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} >
					<FormsList forms={forms} />
				</DashboardPage>
			)
		case 'new':
			return (
				<DashboardPage activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} >
					<Box>New Form</Box>
				</DashboardPage>
			)
		default:
			return <Box>No page found.</Box>
	}
}

export default index