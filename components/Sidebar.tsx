import { Flex, Button, HTMLChakraProps, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


export const Sidebar = (props: HTMLChakraProps<'header'>) => {
  const router = useRouter();
  const { route } = router;

  const getButtonProps = (href) => ({
    variant: route === href
      ? 'solid'
      : 'outline',
    colorScheme: route === href
      ? 'teal'
      : undefined,
  });


  return (
    <Flex borderRightWidth="1px" flexShrink={1} width="15rem" padding="1rem" paddingTop="2rem" flexDirection="column" justifyContent="space-between" align-self="stretch" {...props}>
      <Stack as="nav">
        <Link href="/specials">
          <Button {...getButtonProps('/specials')}>
            Specials
          </Button>
        </Link>
        <Link href="/products">
          <Button {...getButtonProps('/products')}>
            Products
          </Button>
        </Link>
      </Stack>
      <Link href="/logout">
        <Button colorScheme="teal" variant="ghost">
          Log out
        </Button>
      </Link>
    </Flex>
  );
};
