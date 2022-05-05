import { Container, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import {verifyToken} from '../src/utilities/basicAuth'
import Navbar from '../src/components/Navbar'

export default function Home({signedIn, token}) {
  return (
		<div>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				<meta name="viewport" content="initial-scale=1, width=device-width" />

			</Head>
				<Navbar signedIn={signedIn} />
		</div>
  )
}


export const getServerSideProps = async (context) => {

	return verifyToken(context)

}