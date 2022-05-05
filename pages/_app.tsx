import '../styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider as Redux } from 'react-redux'
import store from '../src/app/store'

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}
export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            },
          },
        },
      },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
		<ChakraProvider theme={theme}>
			<Redux store={store}>
				<Component {...pageProps} />
			</Redux>
		</ChakraProvider>
	)
}

export default MyApp
