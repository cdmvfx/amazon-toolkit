import { Box, Heading, useColorModeValue } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { NavParent } from "./DashboardPage"

type HeaderProps = {
	activePage: NavParent
	activeChildIndex: number
	setActiveChildIndex: Dispatch<SetStateAction<number>>
}

const Header = ({activePage, activeChildIndex, setActiveChildIndex}: HeaderProps) => {
	
	return (
		<Box
			w="100%"
			bg={useColorModeValue('white', 'gray.400')}
			p={8}
			borderBottom="1px solid"
			borderBottomColor="gray.300"
		>
			<Heading mb={4}>{activePage.children ? activePage.children[activeChildIndex].label : activePage.label }</Heading>
		</Box>
	)
}
export default Header