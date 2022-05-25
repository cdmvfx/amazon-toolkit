import { useState } from "react";
import axios, { AxiosError } from "axios";
import AuthForm, { AuthFormAlert } from "../../src/components/AuthForm";

const Forgot = () => {

	const fields = [
		{
			label: 'Email Address',
			name: 'email'
		}
	]

	const [values, setValues] = useState({
		email: ''
	})

	const [alert, setAlert] = useState<AuthFormAlert>({ type: '', message: '' })

	const handleSubmit = async () => {

		const email = values.email

		axios
			.post('/api/auth/forgot', { email })
			.then(res => {
				console.log('Reset link sent.', res.data)
				setAlert({
					type: 'success',
					message: res.data.message
				})
			})
			.catch((err: AxiosError) => {
				setAlert({
					type: 'error',
					message: err.response?.data.error
				})
			})
	}

	return (
		<AuthForm 
			id='reset'
			title='Reset your password'
			subtitle=''
			fields={fields}
			primaryAction={{
				content: 'Send reset link',
				onAction: handleSubmit
			}}
			secondaryAction={{
				content: 'Back to login',
				onAction: () => {}
			}}
			values={values}
			setValues={setValues}
			alert={alert}
		/>
	)
}

export default Forgot