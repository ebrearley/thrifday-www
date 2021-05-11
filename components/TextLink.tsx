import { Box, HTMLChakraProps, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface TextLinkProps extends HTMLChakraProps<'a'> {
  href: string;
  children: ReactNode;
}

export const TextLink = ({ href, children, ...rest }: TextLinkProps) => (
  <Link href={href}><ChakraLink {...rest}>{children}</ChakraLink></Link>
);
