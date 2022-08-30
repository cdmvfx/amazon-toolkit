import React, { Dispatch, SetStateAction, useState } from 'react'

import {
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { SettingsSectionProps } from 'pages/app/settings'
import { FaAngleDown, FaAngleUp, FaEdit, FaExternalLinkAlt } from 'react-icons/fa'
import NewShopModal from './NewShopModal'
import MapProducts from './MapProducts'
import { Shop, ShopifyShop } from 'src/types/Settings'

const Shops = ({ settings }: SettingsSectionProps) => {
  const [selectedShop, setSelectedShop] = useState<number>()

  const {
    isOpen: isOpenNewShop,
    onOpen: onOpenNewShop,
    onClose: onCloseNewShop,
  } = useDisclosure()

  const {
    isOpen: isOpenMapProducts,
    onOpen: onOpenMapProducts,
    onClose: onCloseMapProducts,
  } = useDisclosure()

  return (
    <Box>
      <Flex direction={'column'} p={8} gap={8} w="100%">
        <Box>
          <Text mb={4}>Add/edit shops to use for your forms.</Text>
          <Button colorScheme={'yellow'} onClick={onOpenNewShop}>
            Add shop
          </Button>
        </Box>
        <Box w="100%" bgColor="gray.100" p={4} borderRadius={10}>
          {!settings.shops || !settings.shops.length ? (
            <Box>
              You have no shops! Please add one to create a review form.
            </Box>
          ) : (
            <Stack w="100%">
              {
                settings.shops.map((shop, index) => (
                  <ShopSettings
                    shop={shop}
                    index={index}
                    selectedShop={selectedShop}
                    setSelectedShop={setSelectedShop}
                    onOpenMapProducts={onOpenMapProducts}
                  />
                ))}
            </Stack>
          )}
        </Box>
      </Flex>
      <NewShopModal isOpen={isOpenNewShop} onClose={onCloseNewShop} />
      {selectedShop !== undefined && (
        <MapProducts
          settings={settings}
          selectedShop={selectedShop}
          isOpen={isOpenMapProducts}
          onClose={onCloseMapProducts}
        />
      )}
    </Box>
  )
}

type ShopSettingsProps = {
  shop: Shop
  index: number
  selectedShop: undefined | number
  setSelectedShop: Dispatch<SetStateAction<number | undefined>>
  onOpenMapProducts: () => void
}

const ShopSettings = ({
  shop,
  index,
  selectedShop,
  setSelectedShop,
  onOpenMapProducts,
}: ShopSettingsProps) => {
  return (
    <Box p={4} borderRadius={10} shadow="lg" w="100%" bgColor="white">
      <Stack>
        <Flex align="center">
          <Box>
            <Heading size={'md'}>
              {shop.name}
              <Badge ml={1}>{shop.type}</Badge>
            </Heading>
            <Link isExternal={true} href={`https://${shop.shopUrl}`}>
              <Flex alignItems={'center'} gap={2}>{shop.shopUrl} <FaExternalLinkAlt /></Flex>
            </Link>
          </Box>
          <Spacer />
          <Button
            fontSize={'xl'}
            variant="ghost"
            onClick={() => {
              if (selectedShop === index) {
                setSelectedShop(undefined)
              } else {
                setSelectedShop(index)
              }
            }}
          >
            {selectedShop === index ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </Flex>
        <Collapse in={selectedShop === index} animateOpacity>
          <Box>
            <Heading size="sm">Products</Heading>
            <Box>
              {shop.products.length > 0 &&
                shop.products.map((product, index) => <Box></Box>)}
            </Box>
            <Button variant="unstyled" onClick={onOpenMapProducts}>
              Map products
            </Button>
          </Box>
        </Collapse>
      </Stack>
    </Box>
  )
}

export default Shops
