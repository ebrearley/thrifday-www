import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (router.route === '/login' || router.route === '/signup') {
    return children;
  }

  return (
    <>
      <Header />
        <Flex minHeight="calc(100% - 4rem)">
          <Sidebar />
          <Box flexGrow={1} backgroundColor="gray.900">
            <Box as="main" height="100%" padding="1rem">
              {children}
            </Box>
          </Box>
        </Flex>
    </>
  )
};
