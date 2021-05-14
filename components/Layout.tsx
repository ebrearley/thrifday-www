import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (router.route === '/login' || router.route === '/signup') {
    return (
      <>
      <Head>
        <title>Thrifday</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
    );
  }

  return (
    <>
      <Head>
        <title>Thrifday</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
