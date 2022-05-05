import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import {FaHome} from 'react-icons/fa'
import {GoChecklist} from 'react-icons/go'
import {MdSettings, MdLogout} from 'react-icons/md'
import { useRouter } from 'next/router'

const DashboardPage = ({children}) => {

	const router = useRouter()
	const { asPath } = router

	const navTree = [
		{
			label: "Home",
			slug: "home",
			path: "/dashboard",
			icon: <FaHome />
		},
		{
			label: "Review Forms",
			slug: "review-forms",
			path: "/dashboard/review-forms",
			icon: <GoChecklist />
		},
		{
			label: "Settings",
			slug: "settings",
			path: "/dashboard/settings",
			icon: <MdSettings />,
			children: [
				{
					label: "Account",
					slug: "account",
					path: "/dashboard/settings/account"
				},
				{
					label: "Billing",
					slug: "billing",
					path: "/dashboard/settings/billing"
				},
				{
					label: "Store Integration",
					slug: "store",
					path: "/dashboard/settings/store"
				},
				{
					label: "Amazon Integration",
					slug: "amazon",
					path: "/dashboard/settings/amazon"
				},
	
			]
		}
	];

	const subPages = [
		{
			label: "New Review Form",
			slug: "review-forms",
			path: "/dashboard/review-forms/new"
		}
	]

	let activeFeature = navTree.find((feature) => feature.path == asPath)

	if (!activeFeature) activeFeature = subPages.find((page) => page.path == asPath)
	
	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
		>
			<Flex flexDir="row" align="flex-start" width="full">
				<Sidebar activeFeature={activeFeature} navTree={navTree} />
				<VStack width="full" alignItems="flex-start">
					<Header activeFeature={activeFeature} />
					<Box w="full">
						{children}
					</Box>
				</VStack>
			</Flex>
		</Box>
	)
}
export default DashboardPage