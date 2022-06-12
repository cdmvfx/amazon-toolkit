import { Box, Text, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppState } from "src/app/store"
import SettingsGeneral from "src/components/app/settings/General"
import Shops from "src/components/app/settings/Shops"
import { editSettings, fetchSettings, selectSettings } from "src/features/settings/settingsSlice"
import { Settings, SettingsCategory } from "src/types/Settings"
import DashboardPage, { NavChild, NavParent, navTree } from "../../../src/components/app/DashboardPage"

export type SettingsSectionProps = {
	settings: Settings
	handleChange: (key: string, val: string) => void
	saveChanges: (category: SettingsCategory) => void
}

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
	const settings = useSelector(selectSettings)
	const settingsStatus = useSelector((state: AppState) => state.settings.status)

	useEffect(() => {
    if (settingsStatus === 'idle') {
      dispatch(fetchSettings())
    }
  }, [settingsStatus, dispatch])


	// Handle new changes.

	const [newSettings, setNewSettings] = useState(settings)

	const handleChange = (cat: SettingsCategory, key: string, val: string) => {
		const changes = {...newSettings};
		if (!changes[cat]) changes[cat] = {};
		if (!changes[cat][key]) changes[cat][key] = '';
		changes[cat][key] = val;
		setNewSettings(changes)
		console.log('Changes', changes)
	}

	const handleChangeGeneral = (key: string, val: string) => {
		return handleChange('general', key, val)
	}

	const saveChanges = (category: SettingsCategory) => {
		const editRequest = {
			category, 
			edits: newSettings[category]
		}
		console.log('Edit request', editRequest)
		dispatch(editSettings(editRequest))
	}

	switch((activePage.children as NavChild[])[activeChildIndex].slug) {
		case 'general':
			return (
				<DashboardPage activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} >
					<SettingsGeneral settings={settings} handleChange={handleChangeGeneral} saveChanges={saveChanges} />
				</DashboardPage>
			)
		case 'shops':
			return (
				<DashboardPage activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} >
					<Shops settings={settings} handleChange={handleChangeGeneral} saveChanges={saveChanges} />
				</DashboardPage>
			)
		default:
			return <Box>No page found.</Box>
	}
}


export default index