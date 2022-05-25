import { Container, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { verifyToken } from '../src/utilities/basicAuth'
import Navbar from '../src/components/Navbar'
import { GetServerSideProps } from 'next'

type HomeProps = {
	signedIn: boolean
	token: string
}

export default function Home({ signedIn, token }: HomeProps) {
	return (
		<div>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Navbar signedIn={signedIn} />
		</div>
	)
}