import { Alert, Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import NextLink from "next/link";

const Reset = () => {

	const [email, setEmail] = useState("");

	const [alert, setAlert] = useState({type: '', message: ''});

	const handleSubmit = async (e) => {

		e.preventDefault();

		console.log(JSON.stringify({email: email}))

		const response = await fetch('/api/auth/reset', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({email: email})
		})
			.then((res) => res.json())
			.catch((err) => console.error(err));

		if (response.success) {
			setAlert({type: 'success', message: 'Successfully sent reset link.'})
		}
		else {
			setAlert({type: 'error', message: response.error})
		}
	}

	return (
		<Container
			component="main"
			maxWidth="xs"
		>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h5">Reset Password</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography>To reset your password, please enter your email. If we find an account associated with the email, you will receive a link to change your password.</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField 
							fullWidth 
							required
							id="email"
							name="email"
							label="Email" 
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					{
						alert.message != '' &&
						<Grid item xs={12}>
							<Alert severity={alert.type}>{alert.message}</Alert>
						</Grid>
					}
					<Grid item xs={12}>
						<Button
							onClick={handleSubmit}
							fullWidth
							variant="contained"
						>
							Send Reset Link
						</Button>
					</Grid>
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
		</Container>
	)
}

export default Reset