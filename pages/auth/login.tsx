import axios from "axios"
import { useState } from "react"
import AuthForm, { AuthFormAlert } from "../../src/components/AuthForm";

type Props = {}

const Login = (props: Props) => {

	const fields = [
		{
			label: 'Email Address',
			name: 'email'
		},
		{
			label: 'Password',
			name: 'password'
		},
		{
			label: 'Remember me',
			name: 'rememberMe'
		}
	]

	const [values, setValues] = useState({
		email: '',
		password: '',
		rememberMe: false,
		showPassword: false
	})

	const [alert, setAlert] = useState<AuthFormAlert>({ type: '', message: '' })

	const handleSubmit = async () => {

		const data = { ...values }

		axios
			.post('/api/auth/login', data)
			.then((res) => {
				if (!res.data.success) {
					setAlert({type: 'error', message: 'Failed to login.'})
				}
				else {
					window.open('/app', '_self')
				}
			})
			.catch((err) => {
				console.error('Login error', err.response);
				setAlert({type: 'error', message: err.response.data.error})
			})
	}

	return (
		<AuthForm 
			id='login'
			title='Sign in to your account'
			subtitle='and start collecting reviews.'
			fields={fields}
			primaryAction={{
				content: 'Sign in',
				onAction: handleSubmit
			}}
			values={values}
			setValues={setValues}
			alert={alert}
		/>
	)
}

export default Login