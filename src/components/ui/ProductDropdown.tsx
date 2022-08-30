import { Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import {
  FaAngleDown,
  FaArrowDown,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa'

type Product = {
  image: string
  name: string
  id: string
}

type Props = {
  products: Product[]
}

const ProductDropdown = (props: Props) => {
  const { products } = props

  const { isOpen, onToggle } = useDisclosure()

  const [activeProduct, setActiveProduct] = useState(0)

  return (
    <Box w='100%'>
      <Flex
        cursor="pointer"
        onClick={onToggle}
        border={isOpen ? "1px solid gold" : "1px solid #f4f4f4"}
        p={4}
        align="center"
      >
        <div>
          <Image w={50} src={products[activeProduct].image || ''} />
        </div>
        <div>
          <Text fontWeight="bold" lineHeight={1.2}>{products[activeProduct].name}</Text>
          <Text fontSize="10px">{products[activeProduct].id}</Text>
        </div>
        <Flex justify="end" flex="1">
          <FaAngleDown />
        </Flex>
      </Flex>
      {isOpen && (
        <Box position='absolute'>
          {products.map((product, index) => {
            return (
              <Flex
                key={index}
                onClick={() => {
                  setActiveProduct(index)
                  onToggle()
                }}
                border="1px solid #f4f4f4"
								bgColor='white'
								boxShadow='0px 5px 10px rgba(0, 0, 0, 0.4)'
								w='100%'
                p={4}
                _hover={{ backgroundColor: '#f4f4f4', cursor: 'pointer' }}
								zIndex={10}
								position='relative'
              >
                <div>
                  <Image src={product.image} w={50} />
                </div>
                <div>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text fontSize="10px">{product.id}</Text>
                </div>
              </Flex>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default ProductDropdown
