import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react'
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

const Login = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		rememberMe: false
	})

	const [alert, setAlert] = useState({ type: '', message: '' })
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [event.target.name]: event.target.value })
	}

	const handleRememberMe = () => {
		setValues({
			...values,
			rememberMe: !values.rememberMe,
		})
	}

	const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {

		const data = { ...values }

		const res = axios
			.post('/api/auth/login', data)
			.then((res) => {
				console.log('Login response', res);
				return res.data;
			})
			.catch((err) => {
				console.error('Login error', err.response);
				setAlert({type: 'error', message: err.response.data.error})
			})
	}

	return (
		<Flex
			minH={'100vh'}
			align="center"
			justify="center"
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack spacing={8} mx={'auto'} maxW="lg" py={12} px={6}>
				<Stack align="center">
					<Heading fontSize={'4xl'} textAlign="center">
						Sign in to your account
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						and start collecting reviews.
					</Text>
				</Stack>
				<Box
					backgroundColor={'white'}
					padding={8}
					borderRadius={10}
					boxShadow={'2xl'}
				>
					<Stack spacing={4}>
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
						<FormControl variant="floating" id="email" isRequired>
							<Input type={'email'} name={'email'} onChange={(e) => handleChange(e)} />
							<FormLabel>Email Address</FormLabel>
						</FormControl>
						<FormControl variant="floating" id="password" isRequired>
							<Input type={showPassword ? 'text' : 'password'} name={'password'} onChange={(e) => handleChange(e)} />
							<FormLabel>Password</FormLabel>
							<InputRightElement width={'4.5rem'}>
								<Button onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? 'Hide' : 'Show'}
								</Button>
							</InputRightElement>
						</FormControl>
						<Stack
							direction={{ base: 'column', sm: 'row' }}
							align={'start'}
							justify={'space-between'}
						>
							<Checkbox checked={values.rememberMe} onChange={handleRememberMe}>Remember me</Checkbox>
							<Link color={'blue.400'} href='/reset' >Forgot password?</Link>
						</Stack>
						<Button bg={'gold'} _hover={{ bg: 'yellow.300' }} onClick={(e) => handleSubmit(e)}>
							Sign in
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default Login
