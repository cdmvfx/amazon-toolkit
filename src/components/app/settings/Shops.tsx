import React, { useState } from 'react'

import { Alert, AlertIcon, AlertStatus, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { SettingsSectionProps } from 'pages/app/settings'
import axios, { AxiosError } from 'axios'

const Shops = ({settings, handleChange, saveChanges}: SettingsSectionProps) => {

	const {isOpen, onOpen, onClose} = useDisclosure()
	

	const [newShop, setNewShop] = useState({
		type: '',
		shopName: '',
		accessToken: '',
		name: ''
	})

	const [connectAlert, setConnectAlert] = useState<{status: AlertStatus, message: string}>({
		status: 'info',
		message: ''
	})

	const handleNewChange = (key: string, val: string) => {
		const changes: any = {...newShop}
		changes[key] = val
		setNewShop(changes)
	}

	const connectShop = async () => {

		setConnectAlert({
			status: 'loading',
			message: ''
		})

		const connectRes = await axios.post('/api/shopify/connect', {shopName: newShop.shopName, name: newShop.name})
			.then(res => {
				console.log('Check success', res)
				return res.data
			})
			.catch((err: AxiosError) => {
				console.error('Failed to check shop.', err.message)
			})
			

		if (!connectRes.success) {
			return setConnectAlert({
				status: 'error',
				message: connectRes.message
			})
		}

		window.open(connectRes.redirect, '_blank')
		
		let i = 1;

		const connectChecker = setInterval(async () => {
			console.log(`Attempt ${i}`)

			await axios.post(`/api/shopify/checkAccessToken`, {shopName: newShop.shopName})
				.then(res => {
					if (res.data.success) {
						setConnectAlert({
							status: 'success',
							message: 'Shop connected successfully.'
						})
						clearInterval(connectChecker)
						onClose()
					}
				})
				.catch(err => {
					setConnectAlert({
						status: 'error',
						message: 'Failed to check for access token.'
					})
					clearInterval(connectChecker)
				})

			if (i > 10) {
				setConnectAlert({
					status: 'error',
					message: 'Connection timed out. Please try again.'
				})
				clearInterval(connectChecker)
			}
			i++
		}, 5000)


	}

	const validateNewShopForm = () => {
		if (newShop.name === '' || newShop.name.length < 5) return true
		if (!`${newShop.shopName}.myshopify.com`.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*.myshopify.com$/)) return true
		if (connectAlert.status === 'loading') return true
		return false
	}

	return (
		<Box>
			<Flex 
				direction={'column'} 
				p={8} 
				gap={8}
				w={{
					base: '100%',
					md: '400px'
				}}
			>
				<Text>Add/edit shops to use for your forms.</Text>
				<Button colorScheme={'yellow'} onClick={onOpen}>Add shop</Button>
				<Box>
					{
						(!settings.shops || settings.shops.length < 0) &&
						<Box>You have no shops! Please add one to then create a review form.</Box>
					}
				</Box>
			</Flex>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
			>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Add a shop</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack gap={4}>
								<FormControl>
									<FormLabel>What type of shop is this?</FormLabel>
									<Select name='type' onChange={(e) => handleNewChange(e.target.name, e.target.value)} value={newShop.type}>
										<option value=''>Select a shop type.</option>
										<option value='shopify'>Shopify</option>
										<option value='manual'>Manual</option>
									</Select>
									<FormHelperText>If you have a Shopify shop, orders will be created and set to be fulfilled automatically. If manual, submissions will be logged in your dashboard for you to fulfill manually.</FormHelperText>
								</FormControl>
								<FormControl>
									<FormLabel>Shop Name</FormLabel>
									<Input name='name' onChange={(e) => handleNewChange(e.target.name, e.target.value)} value={newShop.name} />
									<FormHelperText>Internal use only.</FormHelperText>
								</FormControl>
								{
									newShop.type && newShop.type == 'shopify' &&
									<>
										<FormControl>
											<FormLabel>Shop URL</FormLabel>
											<InputGroup mb={4}>
												<Input name='shopName' onChange={(e) => handleNewChange(e.target.name, e.target.value)} value={newShop.shopName} />
												<InputRightAddon>
													.myshopify.com
												</InputRightAddon>
											</InputGroup>
											<FormHelperText>In order to automatically create orders on your Shopify store, ReviewGet must be installed as a Shopify application. Please enter your primary shop URL, and click 'Connect' to install the application.</FormHelperText>
										</FormControl>
											{
												connectAlert.message != '' &&
												<Alert status={connectAlert.status}>
													<AlertIcon />
													<AlertTitle>{connectAlert.message}</AlertTitle>
												</Alert>
											}
									</>
								}
							</Stack>
						</ModalBody>
						<ModalFooter>
						{
							newShop.type && newShop.type == 'shopify' &&
							<Button 
								colorScheme={'yellow'}
								disabled={ validateNewShopForm() }
								onClick={connectShop}
								isLoading={connectAlert.status === 'loading'}
							>
								Connect
							</Button>
						}
							<Button variant='ghost'>Cancel</Button>
						</ModalFooter>
					</ModalContent>
			</Modal>
		</Box>
	)
}

export default Shops