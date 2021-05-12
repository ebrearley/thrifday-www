import { Box, Button, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


export const Sidebar = () => {
  const router = useRouter();
  const { route } = router;


  return (
    <Box borderRightWidth="1px" flexShrink={1} width="15rem">
      <Box position="fixed" padding="1rem" width="15rem" display="flex" flexDirection="column" justifyContent="space-between" height="calc(100% - 4rem)">
        <Stack as="nav">
          <Link href="/specials">
            <Button variant={route === '/specials' ? 'solid' : 'outline'} colorScheme={route === '/specials' ? 'teal' : undefined}>
              Specials
            </Button>
          </Link>
          <Link href="/products">
            <Button  variant={route === '/products' ? 'solid' : 'outline'} colorScheme={route === '/products' ? 'teal' : undefined}>
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
