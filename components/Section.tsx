import { Box, HTMLChakraProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SectionProps extends HTMLChakraProps<'section'> {
  children: ReactNode;
}

export default function Section(props: SectionProps) {
  const { children, ...restProps } = props;

  return (
    <Box as="section" pt={24} pb={24} {...restProps}>
      {children}
    </Box>
  );
}
