import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'

const Navbar = ({ signedIn }: {signedIn: boolean}) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Box
        px={8}
        py={4}
        borderBottom={'1px solid'}
        borderBottomColor={useColorModeValue('gray.200', 'white')}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          alignItems="center"
        >
          <Heading
            textAlign={useBreakpointValue({ base: 'start', md: 'left' })}
            flexGrow={1}
          >
            ReviewGet v0.1
          </Heading>
          <Flex display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              variant={'ghost'}
              aria-label={'Toggle navigation'}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
            />
          </Flex>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={8}
            flexGrow={1}
            alignItems="center"
          >
            <Stack direction={'row'} spacing={6}>
              {NAV_ITEMS.map((navItem) => (
                <Link href={navItem.href} key={navItem.href}>
                  <Text p={2}>{navItem.label}</Text>
                </Link>
              ))}
            </Stack>
          </Flex>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            ml={8}
            alignItems="center"
          >
            <Stack direction={'row'} spacing={6}>
              {!signedIn ? (
                <>
                  <Link href="/login">
                    <Text p={2}>Login</Text>
                  </Link>
                  <Button>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              ) : (
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg={useColorModeValue('gray.100', 'gray.800')}
          spacing={4}
          p={8}
          display={{ md: 'none' }}
          onClick={onToggle}
        >
          {NAV_ITEMS.map((navItem) => (
            <Flex py={2} key={navItem.href}>
              <Link href={navItem.href}>
                <Text>{navItem.label}</Text>
              </Link>
            </Flex>
          ))}
          {!signedIn ? (
            <>
              <Flex py={2}>
                <Link href="/login">
                  <Text>Login</Text>
                </Link>
              </Flex>
              <Flex py={2}>
                <Link href="/register">Register</Link>
              </Flex>
            </>
          ) : (
            <Flex py={2} onClick={onToggle}>
              <Link href="/dashboard">
                <Text>Dashboard</Text>
              </Link>
            </Flex>
          )}
        </Stack>
      </Collapse>
    </Box>
  )
}

const NAV_ITEMS = [
  {
    label: 'Overview',
    href: '#overview',
  },
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'Pricing',
    href: '#pricing',
  },
]
export default Navbar
