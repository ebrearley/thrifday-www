import { useEffect } from 'react';
import { useRouter } from 'next/router';


import { useCurrentUser } from '../hooks/useCurrentUser'


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
    <>
      Specials
    </>
  )
}
