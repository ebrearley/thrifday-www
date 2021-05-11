import { Box, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface WrapperProps extends HTMLChakraProps<'div'> {
  children: ReactNode;
}

export default function Wrapper(props: WrapperProps) {
  const { children, ...restProps } = props;

  return (
    <Box width="full" maxWidth="1280px" mx="auto" px={6} {...restProps}>
      {children}
    </Box>
  );
}
