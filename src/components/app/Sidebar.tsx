import { Box, Flex, Heading, IconButton, useColorModeValue, useDisclosure, Text, Stack } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {FaHome} from 'react-icons/fa'
import {GoChecklist} from 'react-icons/go'
import {MdSettings, MdLogout} from 'react-icons/md'
import { useRouter } from "next/router"
import Link from "next/link"

const Sidebar = ({activeFeature, navTree}) => {
	
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Box
		>
			<Box
				w={{base: 'full', md: 60}}
				h="100vh"
				bg={useColorModeValue('white', 'gray.900')}
				borderRight="1px solid"
				borderRightColor="gray.300"
			>
				<Flex
					flexDir="column"
					h="full"
				>
					<Box
						p={4}
						w="full"
						display={{base: "flex", md: "block"}}
					>
						<Box flexGrow={{base: "1", md: "initial"}}>
							<Heading size="lg">ReviewGet</Heading>
							<Text color="gray.400">v0.1</Text>
						</Box>
						<IconButton
							aria-label="Menu open button" 
							display={{base: "block", md: "none"}}
							onClick={onToggle}
							icon={
								isOpen ? (
									<CloseIcon w={3} h={3} />
								) : (
									<HamburgerIcon w={5} h={5} />
								)
							}
							variant="ghost"
						/>
					</Box>
					<Box flex={1}>
						<Stack>
							{navTree.map((feature) => (
								<Link href={feature.path}>
									<Flex
										key={feature.slug}
										px={4}
										py={4}
										align="center"
										_hover={{
											bg: 'yellow.500'
										}}
										transition="all 0.2s ease-in-out"
										cursor="pointer"
										bgColor={activeFeature.slug === feature.slug ? 'yellow.300' : 'white'}
									>
										<Text mr={4} fontSize="2xl">{feature.icon}</Text>
										{feature.label}
									</Flex>
								</Link>
							))}
						</Stack>
					</Box>
				</Flex>
			</Box>
		</Box>
	)
}
export default Sidebar