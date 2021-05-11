import { Box } from '@chakra-ui/react';
import { HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';
import { Logo } from './Logo';

export const Header = (props: HTMLChakraProps<'header'>) => (
  <>
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      left="0"
      right="0"
      borderBottomWidth="1px"
      backgroundColor="gray.800"
      boxShadow="sm"
      width="full"
      height="4rem"
      paddingLeft="1rem"
      {...props}
    >
      <Logo />
    </Box>
    <Box height="4rem">
    </Box>
  </>
);
