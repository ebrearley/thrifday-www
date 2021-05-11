import { FetchResult, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { noop } from 'lodash';

import { addUserToApolloCache } from '../../utils/addUserToApolloCache';
import {
  AuthLoginInput,
  LoginMutation,
  LoginMutationVariables,
  useLoginMutation,
} from '../../@types/generated';


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
          const user = mutationResult?.data?.login?.user;

          if (token) {
            sessionStorage.setItem('jwtToken', token);
          }

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
