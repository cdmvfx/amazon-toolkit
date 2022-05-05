import { ChangeEvent, FormEvent, SyntheticEvent, useState } from 'react'
import NextLink from 'next/link'
import jwt from 'jsonwebtoken'
import {
  Alert,
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
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
		rememberMe: false
  })

  const [alert, setAlert] = useState({ type: '', message: '' })

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

	const handleRememberMe = () => {
    setValues({
      ...values,
      rememberMe: !values.rememberMe,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    console.log(formData)

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))

    if (response.success) {
      setAlert({ type: 'success', message: 'Successfully logged in.' })
    } else {
      setAlert({ type: 'error', message: response.error })
    }
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
            <FormControl variant="floating" id="email" isRequired>
              <Input type={'email'} onChange={(val) => handleChange('email')} />
              <FormLabel>Email Address</FormLabel>
            </FormControl>
            <FormControl variant="floating" id="password" isRequired>
              <Input type={'password'} onChange={(val) => handleChange('password')} />
              <FormLabel>Password</FormLabel>
            </FormControl>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}
            >
              <Checkbox checked={values.rememberMe} onChange={() => handleRememberMe()}>Remember me</Checkbox>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button bg={'gold'} _hover={{ bg: 'yellow.300' }}>
              Sign in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
