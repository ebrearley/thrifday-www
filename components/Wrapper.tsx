import { Box, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperProps extends HTMLChakraProps<'div'> {
  children: ReactNode;
}

export const Wrapper = ({ children, ...restProps }: WrapperProps) => (
  <Box width="full" maxWidth="1280px" mx="auto" px={6} {...restProps}>
    {children}
  </Box>
);
