import { Box, Button, Divider, Flex, Grid, Heading, HStack, Input, InputGroup, InputLeftAddon, InputRightElement, Link, Spacer, Text, useClipboard, VStack } from "@chakra-ui/react"
import { randomUUID } from "crypto"
import { useState } from "react"
import { ReviewForm } from "../../../types/ReviewForm"
import NextLink from "next/link"

const FormsList = () => {

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

	return (
		<Box
			p={4}
			w="full"
			textAlign="left"
		>
				<Flex p={4}>
					<Heading size="md">
						Your Review Forms
					</Heading>
					<Spacer />
					<NextLink href="/dashboard/review-forms/new">
						<Button colorScheme="yellow">New Form</Button>
					</NextLink>
				</Flex>
				{
					forms.map( form => (
						<>
							<Divider/>
							<ReviewFormItem form={form} />
						</>
					))
				}
		</Box>
	)
}

const ReviewFormItem = ({form}: {form: ReviewForm}) => {

	const url = "localhost:3000/form/" + form.slug;

	return (
		<Box
			_hover={{
				bg: 'gray.100'
			}}
			w="full"
			p={4}
			transition="all ease-in-out .2s"
		>
			<Grid templateColumns='10% 10% 40% 10%' gap={6} alignItems="center">
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

const ReviewFormURL = ({url}: {url: string}) => {

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