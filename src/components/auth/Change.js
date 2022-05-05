import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NextLink from "next/link";
import jwt from "jsonwebtoken";

const Change = () => {

	const [values, setValues] = useState({
		newPassword: "",
		confirmNewPassword: "",
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

		const response = await fetch('/api/auth/change', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				newPassword: values.newPassword,
				confirmNewPassword: values.confirmNewPassword
			})
		})
			.then((res) => res.json())
			.catch((err) => console.error(err));

		if (response.success) {
			setAlert({type: 'success', message: 'Password successfully changed.'})
		}
		else {
			setAlert({type: 'error', message: response.error})
		}

		console.log(response)
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
				<Typography variant="h5">Change Password</Typography>
				<TextField
					fullWidth 
					required
					margin="normal"
					label="New Password"
					id="newPassword"
					name="newPassword"
					type={values.showPassword ? 'text' : 'password'}
					value={values.newPassword}
					onChange={handleChange('newPassword')}
					autoComplete="new-newPassword"
					InputProps={{
						endAdornment:
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle newPassword visibility"
								onClick={handleClickShowPassword}
								edge="end"
							>
								{values.showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}}
				/>
				<TextField
					fullWidth 
					required
					margin="normal"
					label="Confirm New Password"
					id="confirmNewPassword"
					name="confirmNewPassword"
					type={values.showPassword ? 'text' : 'password'}
					value={values.confirmNewPassword}
					onChange={handleChange('confirmNewPassword')}
					autoComplete="new-password"
				/>
				<Button
					type="submit"
					fullWidth
					sx={{ mt: 3, mb: 2 }}
					variant="contained"
				>
					Submit
				</Button>
				<Grid container>
					{
						alert.message != '' &&
						<Grid item xs={12}>
							<Alert severity={alert.type}>{alert.message}</Alert>
						</Grid>
					}
					<Grid item xs>
						<NextLink href="/login" passHref>
							<Link variant="body2">
								Back to log in.
							</Link>
						</NextLink>
					</Grid>
					<Grid item>
						<NextLink href="/register" passHref>
							<Link variant="body2">
								Don't have an account? Register.
							</Link>
						</NextLink>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

export default Change