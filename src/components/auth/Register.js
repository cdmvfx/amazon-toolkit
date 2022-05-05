import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NextLink from "next/link";

const Register = () => {

	const [values, setValues] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		showPassword: false
	});

	const [alert, setAlert] = useState({type: '', message: ''});

	const handleChange = (prop) => (event) => {
		setValues({...values, [prop]: event.target.value})
	}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const registerInfo = {
			fname: data.get('fname'),
			lname: data.get('lname'),
			email: data.get('email'),
			password: data.get('password')
		};
		
		console.log('sent info', JSON.stringify(registerInfo));

		const res = await fetch('/api/auth/register', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(registerInfo)
		})
			.then((res) => res.json())
			.catch((err) => console.error(err));

		if (res.success) {
			setAlert({type: 'success', message: 'Registration successful!'})
		}
		else {
			setAlert({type: 'error', message: res.error})
		}

		console.log('received info', res);
	}

	return (
		<Container
			component="main"
			maxWidth="xs"
		>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
				onSubmit={handleSubmit}
				component="form"
				noValidate
			>
				<Typography variant="h4" sx={{mb: 3}}>Register</Typography>
				<Grid container spacing={2}>
					
					<Grid item xs={12} sm={6}>
						<TextField 
							fullWidth 
							required
							id="fname"
							name="fname"
							label="First name" 
							autoComplete="given-name"
							value={values.fname}
							onChange={handleChange('fname')}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField 
							fullWidth 
							required
							id="lname"
							name="lname"
							label="Last name" 
							autoComplete="family-name"
							value={values.lname}
							onChange={handleChange('lname')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							fullWidth 
							required
							id="email"
							name="email"
							label="Email" 
							autoComplete="email"
							value={values.email}
							onChange={handleChange('email')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth 
							required
							label="Password"
							id="password"
							name="password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							autoComplete="new-password"
							InputProps={{
								endAdornment:
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}}
						/>
					</Grid>
					{
						alert.message != '' &&
						<Grid item xs={12}>
							<Alert severity={alert.type}>{alert.message}</Alert>
						</Grid>
					}
				</Grid>

				<Button
					type="submit"
					fullWidth
					sx={{ mt: 3, mb: 2 }}
					variant="contained"
				>
					Register
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<NextLink href="/login">
							<Link variant="body2">
								Already have an account? Log in.
							</Link>
						</NextLink>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default Register;
