import { useEffect } from 'react';
import { useRouter } from 'next/router';


import { useCurrentUser } from '../hooks/useCurrentUser'
import { initializeApollo } from '../lib/apolloClient';
import { CurrentUserDocument, CurrentUserQueryResult } from '../@types/generated';
import { GetServerSidePropsContext } from 'next';


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

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   console.log('cookies', context.req.cookies);

//   const apolloClient = initializeApollo();

//   const result = await apolloClient.query<CurrentUserQueryResult>({
//     query: CurrentUserDocument,
//   });

//   // console.log(result?.data?.data);

// }
