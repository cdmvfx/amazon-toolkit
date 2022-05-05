import { Box, Heading, Tab, TabList, Tabs, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"

const Header = ({ activeFeature }) => {

	const [headerIndex, setHeaderIndex] = useState(0)

	return (
		<Box
			w="100%"
			bg={useColorModeValue('white', 'gray.400')}
			p={8}
			borderBottom="1px solid"
			borderBottomColor="gray.300"
		>
			<Heading mb={4}>{activeFeature.label}</Heading>
			{
				activeFeature.children &&
				<Tabs width="full" index={headerIndex} onChange={(val) => setHeaderIndex(val)}>
					<TabList>
						{
							activeFeature.children.map((parent) => (
								<Tab key={parent.key}>{parent.label}</Tab>
							))
						}
					</TabList>
				</Tabs>
			}

		</Box>
	)
}
export default Header