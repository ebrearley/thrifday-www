import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
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
      paddingX="1rem"
      display="flex"
      alignItems="center"
      {...props}
    >
      <Logo marginRight="2rem" />
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search for products" backgroundColor="gray.700" />
      </InputGroup>
    </Box>
    <Box height="4rem">
    </Box>
  </>
);
