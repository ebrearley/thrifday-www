import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'

import { useCurrentUser } from '../hooks/useCurrentUser'
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { CurrentUserDocument } from '../@types/generated';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { LoadingBlock } from '../components/LoadingBlock';

export default function Home() {
  const { user, isLoading } = useCurrentUser();

  const router = useRouter();

  
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }

    if (user) {
      router.push('/specials');
    }
  }, [isLoading, user]);

  return (
    <LoadingBlock>Loading</LoadingBlock>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  try {
    const jwtToken = context.req.cookies['jwtToken'];
    const apolloClient = initializeApollo({ jwtToken });
    const user = await apolloClient.query({
      query: CurrentUserDocument,
    });

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        }
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: '/specials',
      }
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      }
    };
  }
}
