import { makeReference } from '@apollo/client';

import { useCurrentUser } from '../useCurrentUser';

interface UseLogoutProps {
  isReady: boolean;
}

export const useLogout = (props: UseLogoutProps = { isReady: true }) => {
  const { user, queryProps } = useCurrentUser({ queryArgs: { skip: !props.isReady }});
  const cache = queryProps?.client?.cache;

  const logout = (): Promise<void> => {
    return new Promise((resolve) => {
      const userId = user?.id;
      console.log('userId', user);
      sessionStorage.removeItem('jwtToken');

      if (userId) {
        cache.modify({
          id: cache.identify(makeReference('ROOT_QUERY')),
          fields(fieldValue, details) {
            return details.DELETE;
          },
        });
        cache.gc();
      }

      resolve();
    });
  }

  return logout;
};

