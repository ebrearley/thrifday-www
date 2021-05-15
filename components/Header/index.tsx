import { Box, HStack, InputGroup, useMediaQuery } from '@chakra-ui/react';
import { HTMLChakraProps } from '@chakra-ui/react';
import React from 'react';
import { Logo } from '../Logo';
import { Hamburger } from './Hamburger';
import { ProductSearchInput } from './ProductSearchInput';

export const Header = (props: HTMLChakraProps<'header'>) => {
  const [ isLargerThanMobile ] = useMediaQuery("(min-width: 481px)");
  
  return (
    <Box>
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
        <HStack marginBottom="0" flexGrow={1}>
          {!isLargerThanMobile && <Hamburger />}
          <Logo isWordmarkTextHidden={!isLargerThanMobile} />
          <InputGroup>
            <ProductSearchInput />
          </InputGroup>
        </HStack>
      </Box>
      <Box height="4rem">
      </Box>
    </Box>
  );
};
