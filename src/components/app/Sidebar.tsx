import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Text,
  Stack,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NavChild, NavParent, navTree } from "./DashboardPage"
import { Dispatch, SetStateAction } from 'react'

type SidebarProps = {
	activePage: NavParent
	activeChildIndex: number
	setActiveChildIndex: Dispatch<SetStateAction<number>>
}

const Sidebar = ({activePage, activeChildIndex, setActiveChildIndex}: SidebarProps) => {
  const { isOpen, onToggle } = useDisclosure()

	const router = useRouter()
	const { asPath } = router

  return (
    <Box>
      <Box
        w={{ base: 'full', md: 60 }}
        h="100vh"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px solid"
        borderRightColor="gray.300"
      >
        <Flex flexDir="column" h="full">
          <Box p={4} w="full" display={{ base: 'flex', md: 'block' }}>
            <Box flexGrow={{ base: '1', md: 'initial' }}>
              <Heading size="lg">ReviewGet</Heading>
              <Text color="gray.400">v0.1</Text>
            </Box>
            <IconButton
              aria-label="Menu open button"
              display={{ base: 'block', md: 'none' }}
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant="ghost"
            />
          </Box>
          <Box flex={1}>
            <Stack>
              {navTree.map((parent) => (
                <Stack
                  key={`nav-parent-${parent.slug}`}
									spacing={0}
                  gap={0}
                  align="left"
                  bgColor={
                    asPath === parent.path ? 'yellow.300' : 'white'
                  }
									fontWeight={asPath == parent.path ? 'bold' : 'normal'}
                >
                  <Link href={parent.path}>
                    <Flex
                      gap={4}
                      px={4}
                      py={4}
                      _hover={{
                        bg: 'yellow.200',
                      }}
											transition="all 0.2s ease-in-out"
											cursor="pointer"
                    >
                      <Text fontSize="2xl">{parent.icon}</Text>
                      {parent.label}
                    </Flex>
                  </Link>
									{
										parent.children && parent.slug === activePage.slug &&
										<Stack gap={0} spacing={0}>
                    {parent.children.map((child, index) => (
												<Box
													key={`${parent.slug}-${child.slug}`}
													onClick={() => setActiveChildIndex(index)}
													px={8}
													py={2}
													_hover={{
														bg: 'yellow.200',
													}}
													transition="all 0.2s ease-in-out"
													cursor="pointer"
													fontWeight={(activePage.children as NavChild[])[activeChildIndex]?.slug === child.slug ? 'bold' : 'normal'}
												>
													{child.label}
												</Box>
                      ))}
                  </Stack>
									}
                  
                </Stack>
              ))}
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
export default Sidebar
