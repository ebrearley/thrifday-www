import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  if (router.route === '/login' || router.route === '/signup') {
    return children;
  }

  return (
    <>
      <Header />
      
        <Flex>
          <Sidebar />
            <Box flexGrow={1}>
              <main>
                {children}
              </main>
            </Box>
        </Flex>
    </>
  )
};
