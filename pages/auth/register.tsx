import { useState } from "react";
import AuthForm, { AuthFormAlert } from "../../src/components/AuthForm";
import axios from "axios";

const Register = () => {

	const fields = [
		{
			label: 'First Name',
			name: 'fname'
		},
		{
			label: 'Last Name',
			name: 'lname'
		},
		{
			label: 'Email Address',
			name: 'email'
		},
		{
			label: 'Password',
			name: 'password'
		}
	]

	const [values, setValues] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		showPassword: false
	});

	const [alert, setAlert] = useState<AuthFormAlert>({ type: '', message: '' })

	const handleSubmit = async () => {

		const data = { ...values }

		const res = axios
			.post('/api/auth/register', data)
			.then((res) => {
				console.log('Register response', res);
				return res.data;
			})
			.catch((err) => {
				console.error('Register error', err.response);
				setAlert({type: 'error', message: err.response.data.error})
			})
	}

	return (
		<AuthForm 
			id='register'
			title='Register for free'
			subtitle='and become a best seller.'
			fields={fields}
			primaryAction={{
				content: 'Register',
				onAction: handleSubmit
			}}
			values={values}
			setValues={setValues}
			alert={alert}
		/>
	)
};

export default Register;
