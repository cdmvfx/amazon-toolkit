import { Box, Center, Heading, Input, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Text, useColorModeValue } from "@chakra-ui/react"
import Account from "./Account"
import Amazon from "./Amazon"
import Billing from "./Billing"
import Store from "./Store"

const Settings = ({headerIndex, setHeaderIndex}) => {
	return (
				<Box
					w="full"
					p={8}
				>
					<Box
						maxW={{base: "100%", xl: "62em"}}
						bg={useColorModeValue('white', 'gray.800')}
						boxShadow={'2xl'}
						rounded={'md'}
						overflow={'hidden'}
						p={4}
					>
						<Tabs width="full" index={headerIndex}>
							<TabPanels>
								<TabPanel><Account /></TabPanel>
								<TabPanel><Billing /></TabPanel>
								<TabPanel><Store /></TabPanel>
								<TabPanel><Amazon /></TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Box>
	)
}
export default Settings