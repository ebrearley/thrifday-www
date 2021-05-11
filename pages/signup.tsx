import { useRouter } from 'next/router'
import React from 'react';

import { AuthType } from '../components/auth/@enums/AuthType';
import AuthForm from '../components/auth/AuthForm';
import useCurrentUser from '../hooks/useCurrentUser'
import WelcomeMessage from '../components/WelcomeMessage';


export default function Signup() {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  if (isLoading) {
    return (
    <div>
      Loading
    </div>
    );
  }

  if (user) {
    router.push('/');
  }

  return (
    <>
      <WelcomeMessage marginTop="16" />
      <AuthForm authType={AuthType.Signup} />
    </>
  )
}
