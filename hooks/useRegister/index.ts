import { FetchResult, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { noop } from 'lodash';

import {
  RegisterMutation,
  RegisterMutationVariables,
  AuthRegisterInput,
  useRegisterMutation,
} from '../../@types/generated';
import { addUserToApolloCache } from '../../utils/addUserToApolloCache';


type LoginMutationProps = MutationHookOptions<RegisterMutation, RegisterMutationVariables>;
type LoginMutationReturnProps = [
  (input?: AuthRegisterInput) => Promise<FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<RegisterMutation>
]

export const useRegister = (props: LoginMutationProps = { errorPolicy: 'all' }): LoginMutationReturnProps => {
  const [onRegister, registerProps] = useRegisterMutation(props);
  try {
    const register = (input: AuthRegisterInput) => {
      return new Promise(resolve => {
        onRegister({
          variables: {
            input,
          },
        }).then(async (mutationResult) => {
          const token = mutationResult?.data?.register?.token;
          const user = mutationResult?.data?.register?.user;

          if (token) {
            sessionStorage.setItem('jwtToken', token);
          }

          if (user) {
            addUserToApolloCache({ user, client: registerProps.client })
          }

          resolve(mutationResult);
        });;
      });
    };

    return [
      register,
      registerProps,
    ];
  } catch (error) {
    return [
      noop as any,
      registerProps,
    ];
  }
};
