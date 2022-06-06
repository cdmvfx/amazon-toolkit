import React, { useEffect } from 'react'

import { Alert, AlertIcon, AlertTitle, Box, Button, CloseButton, Input, Spinner, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import {
	selectSettings,
	fetchSettings,
	editSettings
} from '../../../features/settings/settingsSlice'
import type { AppState } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { SettingsInput } from '../../../types/Settings'

const Store = () => {

	const category = 'store'
	
	const dispatch = useDispatch()
	const settings = useSelector(selectSettings)
	const settingsStatus = useSelector((state: AppState) => state.settings.status)

	const [editSettingsStatus, setEditSettingsStatus] = useState('idle')

	useEffect(() => {
    if (settingsStatus === 'idle') {
      dispatch(fetchSettings())
    }
  }, [settingsStatus, dispatch])

	
	const [tabSettings, setTabSettings] = useState(false)
	
	console.log(settings, tabSettings)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
		console.log(e.target.value)

		setTabSettings({
			...tabSettings,
			[key]: e.target.value
		})
	}

	const saveChanges = async() => {

		const newSettings = {
			...settings,
			[category]: {
				...tabSettings
			}
		}

		try{
			console.log('trying')
			setEditSettingsStatus('pending')
			await dispatch(editSettings(newSettings)).unwrap()
		}
		catch (err) {
			console.error('Failed to save settings.', err)
		}
		finally {
			console.log('finally')
			setEditSettingsStatus('idle')
		}

	}

	const cancelChanges = () => {
		setTabSettings(settings[category]);
	}

	const inputs: SettingsInput[] = [
		{
			label: 'Shopify API Key',
			key: 'apiKey',
		},
		{
			label: 'Shopify API Client ID',
			key: 'clientId',
		},
		{
			label: 'Shopify API Client Secret',
			key: 'clientSecret',
		},
	]

	let content;


	switch (settingsStatus) {
		case "loading":
			content = <Spinner label='Loading...' />
			break
		case "succeeded":
			if(!tabSettings) setTabSettings(settings[category])
			content = inputs.map((input) => (
				<SettingsInputField key={input.key} input={input} tabSettings={tabSettings} handleChange={handleChange} />
			))
			break
		case "failed":
			content = (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>Failed to get settings!</AlertTitle>
					<CloseButton position="absolute" right="8px" top="8px" />
				</Alert>
			)
			break
	}

	return (
		<Box>
			<Stack spacing={8}>
				{content}
				<Box>
					<Stack direction="row">
						<Button disabled={!editSettingsStatus ? true : false} variant={'solid'} colorScheme="yellow" onClick={saveChanges}>
							Save
						</Button>
						<Button disabled={!editSettingsStatus ? true : false} variant={'outline'} colorScheme="yellow" onClick={cancelChanges}>
							Cancel
						</Button>
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}

const SettingsInputField = ({input, tabSettings, handleChange}: {input: SettingsInput, tabSettings: any, handleChange: any}) => {
	return (
		<Box key={input.key}>
			<Text>{input.label}</Text>
			<Input
				name={input.key}
				value={tabSettings[input.key]}
				onChange={(e) => handleChange(e, input.key)}
			/>
		</Box>
	)
}

export default Store
