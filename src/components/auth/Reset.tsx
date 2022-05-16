import { useState } from "react";
import AuthForm, { AuthFormAlert } from "../AuthForm";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

const Reset = () => {

	const router = useRouter()

	const fields = [
		{
			label: 'New Password',
			name: 'newPassword'
		},
		{
			label: 'Confirm New Password',
			name: 'confirmNewPassword'
		}
	]

	const [values, setValues] = useState({
		newPassword: '',
		confirmNewPassword: '',
		showPassword: false
	})

	const [alert, setAlert] = useState<AuthFormAlert>({ type: '', message: '' })

	const handleSubmit = async () => {

		const data = {
			...values,
			uid: router.query.uid,
			token: router.query.token
		}

		axios
			.post('/api/auth/reset', data)
			.then(res => {
				console.log('Password changed.', res)
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
				console.log(err.response)
			})
	}

	return (
		<AuthForm
			id='change'
			title='Set new password'
			fields={fields}
			primaryAction={{
				content: 'Change password',
				onAction: handleSubmit
			}}
			values={values}
			setValues={setValues}
			alert={alert}
		/>
	);
}

export default Reset