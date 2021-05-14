import { Box, Button, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


export const Sidebar = () => {
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
    <Box borderRightWidth="1px" flexShrink={1} width="15rem">
      <Box position="fixed" padding="1rem" width="15rem" display="flex" flexDirection="column" justifyContent="space-between" height="calc(100% - 4rem)">
        <Stack as="nav">
          <Link href="/">
            <Button {...getButtonProps('/')}>
              Home
            </Button>
          </Link>
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
      </Box>
    </Box>
  );
};
