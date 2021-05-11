import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from "@chakra-ui/react"
import { useApollo } from '../lib/apolloClient'
import '../styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS={true}>
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </ApolloProvider>
  )
}
