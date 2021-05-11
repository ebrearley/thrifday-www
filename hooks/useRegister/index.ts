import { FetchResult, makeReference, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { noop } from 'lodash';

import {
  RegisterMutation,
  RegisterMutationVariables,
  AuthRegisterInput,
  useRegisterMutation,
  CurrentUserDocument,
  RegisterMutationResult,
} from '../../@types/generated';


type LoginMutationProps = MutationHookOptions<RegisterMutation, RegisterMutationVariables>;
type LoginMutationReturnProps = [
  (input?: AuthRegisterInput) => Promise<FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<RegisterMutation>
]

export const useRegister = (props: LoginMutationProps = { errorPolicy: 'all' }): LoginMutationReturnProps => {
  const onCompleted = (data: RegisterMutation) => {
    const token = data?.register?.token;
    if (token) {
      sessionStorage.setItem('jwtToken', token);
    }

    if (props.onCompleted) {
      props.onCompleted(data);
    }
  }

  const propsWithCompleted = {
    ...props,
    onCompleted,
  }

  const [onRegister, registerProps] = useRegisterMutation(propsWithCompleted);
  try {
    const register = (input: AuthRegisterInput) => {
      return new Promise(resolve => {
        onRegister({
          variables: {
            input,
          },
        }).then(async (mutationResult) => {
          const token = mutationResult?.data?.register?.token;
          if (token) {
            sessionStorage.setItem('jwtToken', token);
          }

          const user = mutationResult?.data?.register?.user;
          if (user) {
            const { cache } = registerProps.client;
            cache.modify({
              id: cache.identify(makeReference('ROOT_QUERY')),
              fields: {
                currentUser() {
                  return user;
                },
              },
            });
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

export default useRegister;
