import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useCurrentUser } from '../hooks/useCurrentUser';
import { useLogout } from '../hooks/useLogout';
import { LoadingBlock } from '../components/LoadingBlock';


export default function Logout() {
  const { user } = useCurrentUser();
  const router = useRouter();
  const [isReadyToLogout, setIsreadyToLogout] = useState(false) ;
  const logout = useLogout({ isReady: isReadyToLogout });

  useEffect(() => {
    if (user) {
      setIsreadyToLogout(true);
    }

    if (user && isReadyToLogout) {
      logout().then(() => {
        router.push('/login');
      });
    }

    if (!user) {
      router.push('/login');
    }
  }, [user, isReadyToLogout]);

  return (
    <>
      <Head>
        <title>Thrifday | Logging out</title>
      </Head>
      <LoadingBlock>Logging out</LoadingBlock>
    </>
  );
}

