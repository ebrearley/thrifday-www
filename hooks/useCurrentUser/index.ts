import { QueryHookOptions } from '@apollo/react-hooks';

import {
  CurrentUserQuery,
  CurrentUserQueryVariables,
  useCurrentUserQuery,
} from '../../@types/generated';


interface UseCurrentUserProps {
  queryArgs?: QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>;
}

export const useCurrentUser = (props: UseCurrentUserProps = { queryArgs: { errorPolicy: 'all' }}) => {
  try {
    const { data, loading, ...queryProps } = useCurrentUserQuery(props.queryArgs);
    const user = data?.currentUser;

    return {
      user,
      isLoading: loading,
      queryProps,
    };
  } catch (error) {
    return {
      isLoading: false,
      error,
    };
  }
};

export default useCurrentUser;
