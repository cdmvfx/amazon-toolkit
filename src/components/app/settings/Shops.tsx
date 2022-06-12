import React, { useState } from 'react'

import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react'
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

	const handleNewChange = (key: string, val: string) => {
		const changes: any = {...newShop}
		changes[key] = val
		setNewShop(changes)
	}

	const connectShop = () => {

		axios.post('/api/shopify/check', {shop: newShop.shopUrl})
			.then(res => {
				console.log('Check success', res)
				window.open(res.data.redirect)
			})
			.catch((err: AxiosError) => {
				console.error('Failed to check shop.', err.message)
			})

	}

	const [isShopConnected, setIsShopConnected] = useState(false)

	return (
		<Box>
			<Flex direction={'column'} p={8} gap={8}>
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
											<Button 
												w='100%' 
												disabled={`${newShop.shopUrl}.myshopify.com`.match(/^[a-zA-Z0-9][a-zA-Z0-9-]*.myshopify.com$/) ? false : true}
												onClick={connectShop}
											>
												Connect shop
											</Button>
											<FormHelperText>In order to automatically create orders on your Shopify store, ReviewGet must be installed as a Shopify application. Please enter your primary shop URL, and click 'Connect' to install the application.</FormHelperText>
											<FormErrorMessage>Shop has not been connected.</FormErrorMessage>
										</FormControl>
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