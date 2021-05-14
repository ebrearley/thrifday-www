import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import React from 'react';

import '../styles/globals.css';
import { Layout } from '../components/Layout';
import { useApollo } from '../hooks/useApollo';
import { PageRouteProgress } from '../components/PageRouteProgress';


export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS={true}>
        <PageRouteProgress />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ApolloProvider>
  )
}
