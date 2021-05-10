import React from 'react';
import SignupForm from '../components/signupForm';
import useCurrentUser from '../hooks/useCurrentUser'
import { useRouter } from 'next/router'

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
    <SignupForm />
  )
}
