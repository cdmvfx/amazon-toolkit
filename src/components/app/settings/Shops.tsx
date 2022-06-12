import React, { useState } from 'react'

import { Alert, AlertIcon, AlertStatus, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { SettingsSectionProps } from 'pages/app/settings'
import axios, { AxiosError } from 'axios'

const Shops = ({settings, handleChange, saveChanges}: SettingsSectionProps) => {

	const {isOpen, onOpen, onClose} = useDisclosure()

	const [newShop, setNewShop] = useState({
		type: '',
		shopUrl: '',
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

	const connectShop = () => {

		setConnectAlert({
			status: 'loading',
			message: ''
		})

		axios.post('/api/shopify/check', {shop: newShop.shopUrl})
			.then(res => {
				console.log('Check success', res)

				if (!res.data.success) {
					return setConnectAlert({
						status: 'error',
						message: res.data.message
					})
				}

				let i = 1;
				const connectChecker = setInterval(() => {
					console.log(`Attempt ${i}`)
					if (i == 3) {
						setConnectAlert({
							status: 'error',
							message: 'Connection timed out. Please try again.'
						})
						clearInterval(connectChecker);
					}
					i++
				}, 5000)

				// window.open(res.data.redirect)
				
			})
			.catch((err: AxiosError) => {
				console.error('Failed to check shop.', err.message)
			})

	}

	const [isShopConnected, setIsShopConnected] = useState(false)

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
							<Stack>
								<FormControl>
									<FormLabel>What type of shop is this?</FormLabel>
									<Select name='type' onChange={(e) => handleNewChange(e.target.name, e.target.value)} value={newShop.type}>
										<option value=''>Select a shop type.</option>
										<option value='shopify'>Shopify</option>
										<option value='manual'>Manual</option>
									</Select>
									<FormHelperText>If you have a Shopify shop, orders will be created and set to be fulfilled automatically. If manual, submissions will be logged in your dashboard for you to fulfill manually.</FormHelperText>
								</FormControl>
								{
									newShop.type && newShop.type == 'shopify' &&
									<>
										<FormControl isInvalid={!isShopConnected}>
											<FormLabel>Shop URL</FormLabel>
											<InputGroup mb={4}>
												<Input name='shopUrl' onChange={(e) => handleNewChange(e.target.name, e.target.value)} value={newShop.shopUrl} />
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
											{connectAlert.status !== 'success' && <Button 
												w='100%' 
												disabled={!`${newShop.shopUrl}.myshopify.com`.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*.myshopify.com$/) || connectAlert.status === 'loading' ? true : false}
												onClick={connectShop}
												isLoading={connectAlert.status === 'loading'}
											>
												Connect
											</Button>}
									</>
								}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme={'yellow'} disabled={true}>Save shop</Button>
							<Button variant='ghost'>Cancel</Button>
						</ModalFooter>
					</ModalContent>
			</Modal>
		</Box>
	)
}

export default Shops