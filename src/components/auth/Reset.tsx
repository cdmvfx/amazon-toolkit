import { useState } from "react";
import NextLink from "next/link";
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

const Reset = () => {

	const [email, setEmail] = useState("");

	const [alert, setAlert] = useState({type: '', message: ''});

	const handleSubmit = async () => {

		console.log('Reset link sent.')

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
						Reset your password
					</Heading>
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
							<Input type={'email'} name={'email'} onChange={(e) => setEmail(e.target.value)} />
							<FormLabel>Email Address</FormLabel>
						</FormControl>
						<Button bg={'gold'} _hover={{ bg: 'yellow.300' }} onClick={handleSubmit}>
							Send reset link
						</Button>
						<Link href='/login'>
							<Button colorScheme={'gold'} variant='ghost' onClick={handleSubmit}>
								Back to login
							</Button>
						</Link>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default Reset