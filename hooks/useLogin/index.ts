import { FetchResult, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { noop } from 'lodash';

import {
  LoginMutation,
  LoginMutationVariables,
  AuthLoginInput,
  // LoginMutationResult,
  useLoginMutation,
} from '../../@types/generated';


type LoginMutationProps = MutationHookOptions<LoginMutation, LoginMutationVariables>;
type LoginMutationReturnProps = [
  (input?: AuthLoginInput) => Promise<FetchResult<LoginMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<LoginMutation>
]

export const useLogin = (props: LoginMutationProps = { errorPolicy: 'all' }): LoginMutationReturnProps => {
  const onCompleted = (data: LoginMutation) => {
    const token = data?.login?.token;
    console.log(data);
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

  const [onLogin, registerProps] = useLoginMutation(propsWithCompleted);
  try {
    const register = (input: AuthLoginInput) => {
      return onLogin({
        variables: {
          input,
        }
        // refetchQueries: (mutationResult: LoginMutationResult) => {
        //   return [
        //     { query: CurrentUserDocument, fetchPolicy: 'cache-and-network' },
        //     { query: GetCartDocument, variables: { input: { cartId } } },
        //   ];
        // },
      });
    };

    return [
      register,
      registerProps,
    ];
  } catch (error) {
    return [
      noop,
      registerProps,
    ];
  }
};

export default useLogin;
