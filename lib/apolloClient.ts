import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import DebounceLink from 'apollo-link-debounce';

import graphQlFragments from '../graphql/fragments.json';
import { CookieManager } from '../utils/CookieManager';


export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

const debounceLink = new DebounceLink(100);

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_ENDPOINT_TRANSPORT}://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_ENDPOINT_PORT}/graphql`, // Server URL (must be absolute)
  credentials: 'same-origin',
});

const getAuthLink = (jwtToken?: string) => setContext((gqlRequest, { headers }) => {
  let token = jwtToken;

  if (typeof window !== 'undefined' && !jwtToken) {
    const cookieManager = new CookieManager();
    token = cookieManager.get('jwtToken');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : undefined,
    }
  }
});

function createApolloClient(jwtToken?: string) {
  const authLink = getAuthLink(jwtToken);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: debounceLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache({
      possibleTypes: graphQlFragments.possibleTypes,
      typePolicies: {
        User: {
          fields: {
            monitoredProducts : {
              merge(existing, incoming) {
                return incoming;
              },
            },
          }
        }
      }
    }),
  })
}

interface InitializeApolloProps {
  initialState?: any;
  jwtToken?: string;
}

export function initializeApollo(props: InitializeApolloProps = {}): ApolloClient<NormalizedCacheObject> {
  const initialState = props?.initialState;
  const jwtToken = props?.jwtToken;

  const _apolloClient = apolloClient ?? createApolloClient(jwtToken);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    let flattenedInitialState = initialState; 
    if (initialState['__APOLLO_STATE__']) {
      flattenedInitialState = initialState['__APOLLO_STATE__'];
    }

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(flattenedInitialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    
    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}
