import { Box, Button, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { TextLink } from './TextLink';


export const Sidebar = () => (
  <Box borderRightWidth="1px" flexShrink={1} width="15rem">
    <Box position="fixed" padding="1rem" width="15rem" display="flex" flexDirection="column" justifyContent="space-between" height="calc(100% - 4rem)">
      <Box as="nav">Sidebar nav items</Box>
      <Link href="/logout">
        <Button colorScheme="teal" variant="ghost">
          Log out
        </Button>
      </Link>
    </Box>
  </Box>
);
