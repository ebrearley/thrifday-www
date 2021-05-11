import { FetchResult, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { makeReference } from '@apollo/client';
import { noop } from 'lodash';

import {
  LoginMutation,
  LoginMutationVariables,
  AuthLoginInput,
  useLoginMutation,
} from '../../@types/generated';
import { addUserToApolloCache } from '../../utils/addUserToApolloCache';


type LoginMutationProps = MutationHookOptions<LoginMutation, LoginMutationVariables>;
type LoginMutationReturnProps = [
  (input?: AuthLoginInput) => Promise<FetchResult<LoginMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<LoginMutation>
]

export const useLogin = (props: LoginMutationProps = { errorPolicy: 'all' }): LoginMutationReturnProps => {
  const [onLogin, loginProps] = useLoginMutation(props);
  try {
    const login = (input: AuthLoginInput) => {
      return new Promise(resolve => {
        onLogin({
          variables: {
            input,
          },
        }).then(async (mutationResult) => {
          const token = mutationResult?.data?.login?.token;
          if (token) {
            sessionStorage.setItem('jwtToken', token);
          }

          const user = mutationResult?.data?.login?.user;
          if (user) {
            addUserToApolloCache({ user, client: loginProps.client })
          }

          resolve(mutationResult);
        });
      });
    };

    return [
      login,
      loginProps,
    ];
  } catch (error) {
    return [
      noop as any,
      loginProps,
    ];
  }
};

export default useLogin;
