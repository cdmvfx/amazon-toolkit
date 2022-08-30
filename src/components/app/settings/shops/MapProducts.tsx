import {
  Alert,
  AlertStatus,
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaArrowRight, FaEquals, FaPlus } from 'react-icons/fa'
import ProductDropdown from 'src/components/ui/ProductDropdown'
import { AmazonProduct } from 'src/types/Amazon'
import { Product, Settings, ShopifyProduct } from 'src/types/Settings'
import { ShopifyShopProduct } from 'src/types/Shopify'

type Props = {
  settings: Settings
  selectedShop: number
  isOpen: boolean
  onClose(): void
}

type AllShopProducts = {
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string
  data: ShopifyShopProduct[]
}

type AllAmazonProducts = {
  status: 'idle' | 'loading' | 'success' | 'error'
  error: string
  data: AmazonProduct[]
}

const MapProducts = (props: Props) => {
  const { settings, selectedShop, isOpen, onClose } = props

  const [pageNum, setPageNum] = useState(1)

  const [newMap, setNewMap] = useState<{
    shopifyProductId: number | null
    amazonAsin: string | null
  }>({
    shopifyProductId: null,
    amazonAsin: null,
  })

  const [alert, setAlert] = useState<{ status: AlertStatus; message: string }>({
    status: 'info',
    message: '',
  })

  const [allShopProducts, setAllShopProducts] = useState<AllShopProducts>({
    status: 'idle',
    error: '',
    data: [],
  })

	const [allAmazonProducts, setAllAmazonProducts] = useState<AllAmazonProducts>({
    status: 'idle',
    error: '',
    data: [],
  })

  useEffect(() => {

    setAllShopProducts({
      status: 'loading',
      error: '',
      data: [],
    })

		setAllAmazonProducts({
      status: 'loading',
      error: '',
      data: [],
    })

    axios
      .post(`/api/shopify/getProducts`, {
        shopUrl: settings.shops[selectedShop].shopUrl,
      })
      .then((res) => {
        console.log('successfully retrieved products', res)
        setAllShopProducts({
          status: 'success',
          error: '',
          data: res.data.products,
        })
      })
      .catch((err) => {
        setAllShopProducts({
          status: 'error',
          error: err.message,
          data: [],
        })
      })
  }, [])

  const validatePage = () => {
    if (pageNum === 1) {
      if (!newMap.shopifyProductId) {
        return setAlert({
          status: 'error',
          message: 'Please select a product from the list.',
        })
      }
    }
    if (pageNum === 2) {
      if (!newMap.amazonAsin) {
        return setAlert({
          status: 'error',
          message: 'Please select a product from the list.',
        })
      }
    }

    setPageNum(pageNum + 1)
  }

  const MapProductsPage = () => {
    switch (pageNum) {
      case 1:
        return (
          <Box>
            <Text mb={4}>
              Step 1: Select a Shopify product. Only products created in your
              Shopify product catalog will appear here.
            </Text>
            <Flex direction="column">
              {allShopProducts.status === 'success' &&
                allShopProducts.data.map((product) => (
                  <Box
                    p={4}
                    borderBottom="1px solid"
                    borderBottomColor="gray.100"
                    onClick={() =>
                      setNewMap({ ...newMap, shopifyProductId: product.id })
                    }
                    bgColor={
                      product.id === newMap.shopifyProductId
                        ? 'gray.100'
                        : 'white'
                    }
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Grid gridTemplateColumns='70px 1fr 1fr' alignItems='center'>
                      <Image w={50} src={product.image.src} />
                      <Text>{product.title}</Text>
                      <Text>{product.id}</Text>
                    </Grid>
                  </Box>
                ))}
            </Flex>
          </Box>
        )
      case 2:
        return (
          <Box>
            <Text mb={4}>
              Step 2: Select an Amazon product. Only products with an active listing on Amazon will appear here.
            </Text>
            <Flex direction="column">
              {allAmazonProducts.status === 'success' &&
                allAmazonProducts.data.map((product) => (
                  <Box
                    p={4}
                    borderBottom="1px solid"
                    borderBottomColor="gray.100"
                    onClick={() =>
                      setNewMap({ ...newMap, amazonAsin: product.asin })
                    }
                    bgColor={
                      product.asin === newMap.amazonAsin
                        ? 'gray.100'
                        : 'white'
                    }
                    _hover={{ cursor: 'pointer' }}
                  >
                    <Flex align="center" gap={2}>
                      <Image w={50} src={product.image.src} />
                      <Text>{product.title}</Text>
                    </Flex>
                  </Box>
                ))}
            </Flex>
          </Box>
        )
      default:
        return <Box>No page.</Box>
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Map product to {settings.shops[selectedShop].name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MapProductsPage />
          {alert.message && (
            <Alert status={alert.status}>{alert.message}</Alert>
          )}
        </ModalBody>
        <ModalFooter>
          {
						pageNum !== 1 && (
							<Button colorScheme="yellow" variant={'outline'} onClick={() => {setPageNum(pageNum - 1); setAlert({status: 'info', message: ''})}}>
								Back
							</Button>
						)
					}
          <Button ml={2} colorScheme="yellow" onClick={validatePage}>
            {pageNum === 3 ? 'Save' : 'Next'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default MapProducts
