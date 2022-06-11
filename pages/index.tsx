import Head from 'next/head'
import Navbar from '../src/components/Navbar'
import { GetServerSideProps } from 'next'

type HomeProps = {
	isSignedIn: boolean
	token: string
}

export const getServerSideProps: GetServerSideProps = async () => {

	const isSignedIn = true;

	return {
		props: {
			isSignedIn
		}
	}
}

export default function Home({ isSignedIn, token }: HomeProps) {
	return (
		<div>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Navbar signedIn={isSignedIn} />
		</div>
	)
}