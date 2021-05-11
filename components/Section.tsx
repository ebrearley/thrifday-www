import { Box, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SectionProps extends HTMLChakraProps<'section'> {
  children: ReactNode;
}

export const Section = ({ children, ...restProps }: SectionProps) => (
  <Box as="section" pt={24} pb={24} {...restProps}>
    {children}
  </Box>
);
