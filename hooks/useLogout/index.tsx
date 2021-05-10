import { CurrentUserQuery, useCurrentUserQuery } from '../../@types/generated';
import { useRouter } from 'next/router'

const useLogout = () => {
  const { client } = useCurrentUserQuery({ errorPolicy: 'all' });
  const router = useRouter();

  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      client.resetStore();
      router.push('/');
      sessionStorage.removeItem('jwtToken');

      resolve();
    });
  }

  return logout;
};

export default useLogout;
