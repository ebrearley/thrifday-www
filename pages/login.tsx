import { useRouter } from 'next/router'
import Head from 'next/head';
import React from 'react';

import { AuthType } from '../components/auth/@enums/AuthType';
import { AuthForm } from '../components/auth/AuthForm';
import { useCurrentUser } from '../hooks/useCurrentUser'
import { WelcomeMessage } from '../components/WelcomeMessage';
import { LoadingBlock } from '../components/LoadingBlock';

export default function Login() {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return (
      <LoadingBlock>Loading...</LoadingBlock>
    );
  }

  if (user) {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Thrifday | Login</title>
      </Head>
      <WelcomeMessage marginTop="16" />
      <AuthForm authType={AuthType.Login} />
    </>
  )
};
