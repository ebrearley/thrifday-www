import React from 'react';
import LoginForm from '../components/loginForm';
import useCurrentUser from '../hooks/useCurrentUser'
import { useRouter } from 'next/router'

export default function Login() {
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
      <h1>Login</h1>
      <LoginForm />
    </>
  )
};
