import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import { Dispatch, ReactChildren, SetStateAction, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import {FaHome} from 'react-icons/fa'
import {GoChecklist} from 'react-icons/go'
import {MdSettings, MdLogout} from 'react-icons/md'
import { useRouter } from 'next/router'

export type NavTree = NavParent[]

export interface NavParent {
	label: string
	slug: string
	path: string
	icon: JSX.Element
	children?: NavChild[]
}

export interface NavChild {
	label: string
	slug: string
}

export const navTree: NavTree = [
	{
		label: "Home",
		slug: "home",
		path: "/app",
		icon: <FaHome />
	},
	{
		label: "Review Forms",
		slug: "forms",
		path: "/app/forms",
		icon: <GoChecklist />,
		children: [
			{
				label: "All Review Forms",
				slug: "all",
			},
			{
				label: "New Review Form",
				slug: "new",
			}
		]
	},
	{
		label: "Settings",
		slug: "settings",
		path: "/app/settings",
		icon: <MdSettings />,
		children: [
			{
				label: "General",
				slug: "general"
			},
			{
				label: "Shops",
				slug: "shops",
			},
			{
				label: "Account",
				slug: "account",
			},
			{
				label: "Billing",
				slug: "billing",
			},
			{
				label: "Amazon Integration",
				slug: "amazon",
			}
		]
	}
];

type DashboardPageProps = {
	children: any
	activePage: NavParent
	activeChildIndex: number
	setActiveChildIndex: Dispatch<SetStateAction<number>>
}

const DashboardPage = ({children, activePage, activeChildIndex, setActiveChildIndex}: DashboardPageProps) => {
	

	return (
		<Box
			bg={useColorModeValue('white', 'gray.900')}
		>
			<Flex flexDir="row" align="flex-start" width="full">
				<Sidebar activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} />
				<VStack width="full" alignItems="flex-start">
					<Header activePage={activePage} activeChildIndex={activeChildIndex} setActiveChildIndex={setActiveChildIndex} />
					<Box w="full">
						{children}
					</Box>
				</VStack>
			</Flex>
		</Box>
	)
}
export default DashboardPage