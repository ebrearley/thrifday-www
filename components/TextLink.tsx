import { HTMLChakraProps, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface TextLinkProps extends HTMLChakraProps<'a'> {
  href: string;
  children: ReactNode;
  inNewTab?: boolean;
}

export const TextLink = ({ href, children, inNewTab = false, ...rest }: TextLinkProps) => {
  if (inNewTab) {
    return (
      <ChakraLink href={href} target="_blank" {...rest}>{children}</ChakraLink>
    );
  }
  
  return (
    <Link href={href}><ChakraLink {...rest}>{children}</ChakraLink></Link>
  );
};
