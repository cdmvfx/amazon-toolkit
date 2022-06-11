import { Box, Button, Divider, Flex, Grid, Heading, HStack, Input, InputGroup, InputLeftAddon, InputRightElement, Link, Spacer, Text, useClipboard, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { ReviewGetUser } from "src/types/User";
import { ReviewForm } from "../../../types/ReviewForm"

type FormsListProps = {
	user: ReviewGetUser
}

const FormsList = ({user}: FormsListProps) => {

	console.log('user', user);

	const forms: ReviewForm[] = [
		{
			fid: 'fdsfsfsf',
			uid: 'user1',
			title: "Main Form",
			desc: "The first for testing.",
			slug: "main-form",
			pages: [],
			config: {}
		},
		{
			fid: 'gfdgdgd',
			uid: 'user1',
			title: "Testing Form",
			desc: "The second for testing.",
			slug: "test-form",
			pages: [],
			config: {}
		}
	]

	const [newFormAlert, setNewFormAlert] = useState('')

	const openNewForm = () => {
		console.log('opening new')
	}

	return (
		<Box
			p={4}
			w="full"
			textAlign="left"
		>
			<Flex p={4} alignItems='center'>
				<Heading size="md">
					Your Review Forms
				</Heading>
				<Spacer />
				<Text color="red" mr={4}>{newFormAlert}</Text>
				<Button colorScheme="yellow" onClick={openNewForm}>New Form</Button>
			</Flex>
			{
				forms.map(form => (
					<Box key={'form-list-' + form.fid}>
						<Divider />
						<ReviewFormItem form={form} />
					</Box>
				))
			}
		</Box>
	)
}

const ReviewFormItem = ({ form }: { form: ReviewForm }) => {

	const url = "/form/" + form.slug;

	return (
		<Box
			_hover={{
				bg: 'gray.100'
			}}
			w="full"
			p={4}
			transition="all ease-in-out .2s"
		>
			<Grid templateColumns='10% 10% 55% 10%' gap={"5%"} alignItems="center">
				<Text fontWeight="medium">{form.title}</Text>
				<Text>{form.desc}</Text>
				<ReviewFormURL url={url} />
				<HStack w="full">
					<Link w="full" href={url} isExternal>
						<Button colorScheme="yellow" w="full">View</Button>
					</Link>
					<Link w="full" href='https://chakra-ui.com'>
						<Button colorScheme="yellow" variant="outline" w="full">Edit</Button>
					</Link>
				</HStack>
			</Grid>
		</Box>
	)
}

const ReviewFormURL = ({ url }: { url: string }) => {

	const { hasCopied, onCopy } = useClipboard(url);

	return (
		<InputGroup size="md" maxW="30em">
			<Input
				value={url}
				pr="4em"
				readOnly
			/>
			<InputRightElement w="4em">
				<Button colorScheme="yellow" size="sm" onClick={onCopy}>
					{hasCopied ? 'Copied' : 'Copy'}
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export default FormsList