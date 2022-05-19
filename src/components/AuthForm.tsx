import { ChangeEvent, Dispatch, FormEvent, SetStateAction, SyntheticEvent, useEffect, useState } from 'react'
import NextLink from 'next/link'
import jwt from 'jsonwebtoken'
import {
	Alert,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Checkbox,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import axios from 'axios'

type AuthFormAlertStatus = "info" | "warning" | "success" | "error" | ""

export interface AuthFormAlert {
	type: AuthFormAlertStatus
	message: string
}

interface AuthFormAction {
	content: string
	onAction: () => void
	disabled?: boolean
}

interface AuthFormInput {
	label: string
	name: string
}

type AuthFormProps = {
	id: string
	title: string
	subtitle?: string
	fields: AuthFormInput[]
	primaryAction: AuthFormAction
	secondaryAction?: AuthFormAction
	values: any
	setValues: Dispatch<SetStateAction<any>>
	alert: AuthFormAlert
}

const AuthForm = (props: AuthFormProps) => {

	const {id, title, subtitle, fields, primaryAction, secondaryAction, values, setValues, alert} = props


	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [event.target.name]: event.target.value })
	}
	

	return (
		<Flex
			minH={'100vh'}
			align="center"
			justify="center"
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} align="center" maxW="lg" py={12} px={6}>
				<Stack align="center">
					<Heading fontSize={'4xl'} textAlign="center">
						{title}
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						{subtitle}
					</Text>
				</Stack>
				<Box
					backgroundColor={'white'}
					padding={8}
					borderRadius={10}
					boxShadow={'2xl'}
					minWidth="400px"
				>
					<Stack spacing={6}>
						{
							alert.type !== '' &&
							<Alert 
								title='Alert'
								status={alert.type as 'success' | 'error'}
								borderRadius={4}
							>
								<AlertIcon />
								<AlertTitle>{alert.message}</AlertTitle>
							</Alert>
						}
						{
							fields.map(item => {

								if (item.name === 'password' || item.name === 'confirmNewPassword' || item.name === 'newPassword') {
									return (
											<FormControl variant="floating" id={item.name} isRequired>
											<Input type={values.showPassword ? 'text' : 'password'} name={item.name} onChange={(e) => handleChange(e)} />
											<FormLabel>{item.label}</FormLabel>
											{
												item.name !== 'confirmNewPassword' &&
												<InputRightElement width={'4.5rem'}>
													<Button variant='ghost' onClick={() => setValues({
														...values,
														showPassword: !values.showPassword
													})}>
														{values.showPassword ? 'Hide' : 'Show'}
													</Button>
												</InputRightElement>
											}
										</FormControl>
									)
								}
								else if (item.name === 'rememberMe') {
									return (
										<Stack
											direction={{ base: 'column', sm: 'row' }}
											align={'start'}
											justify={'space-between'}
										>
											<Checkbox checked={values.rememberMe} onChange={() => setValues({
													...values,
													rememberMe: !values.rememberMe
												})}>Remember me</Checkbox>
											<Link color={'blue.400'} href='/reset' >Forgot password?</Link>
										</Stack>
									)
								}

								return (
									<FormControl key={item.name} variant="floating" id={item.name} isRequired>
										<Input type={item.name} name={item.name} onChange={(e) => handleChange(e)} />
										<FormLabel>{item.label}</FormLabel>
									</FormControl>
								)
							})
						}
						
						<Button bg={'gold'} _hover={{ bg: 'yellow.300' }} onClick={primaryAction.onAction} disabled={primaryAction.disabled}>
							{primaryAction.content}
						</Button>
						{
							secondaryAction &&
							<Button colorScheme={'gold'} variant='ghost' onClick={secondaryAction.onAction}>
								Back to login
							</Button>
						}
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default AuthForm
