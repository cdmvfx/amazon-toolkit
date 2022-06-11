import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react"
import { SettingsSectionProps } from "pages/app/settings"
import { Settings } from "src/types/Settings"


const SettingsGeneral = ({settings, handleChange, saveChanges}: SettingsSectionProps) => {

	return (
		<Box>
			<Box p={8}>
				<Text mb={8}>Here you can edit general settings such as company name, contact information, etc.</Text>
				<Stack
					w={{
						base: '100%',
						md: '400px'
					}}
					gap={4}
				>
					<FormControl variant="floating">
						<Input name='companyName' placeholder=" " defaultValue={settings.general?.companyName} onChange={(e) => handleChange(e.target.name, e.target.value)} />
						<FormLabel>Company Name</FormLabel>
					</FormControl>
					<FormControl variant="floating">
						<Input name='contactEmail' placeholder=" " defaultValue={settings.general?.contactEmail} onChange={(e) => handleChange(e.target.name, e.target.value)} />
						<FormLabel>Contact Email</FormLabel>
					</FormControl>
					<FormControl variant="floating">
						<Input name='contactPhone' placeholder=" " defaultValue={settings.general?.contactPhone} onChange={(e) => handleChange(e.target.name, e.target.value)} />
						<FormLabel>Contact Phone</FormLabel>
					</FormControl>
					<Button colorScheme='yellow' onClick={() => saveChanges('general')}>Save changes</Button>
				</Stack>
			</Box>
		</Box>
	)
}

export default SettingsGeneral