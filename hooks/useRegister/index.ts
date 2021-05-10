import { FetchResult, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { noop } from 'lodash';

import {
  RegisterMutation,
  RegisterMutationVariables,
  AuthRegisterInput,
  // RegisterMutationResult,
  useRegisterMutation,
} from '../../@types/generated';


type LoginMutationProps = MutationHookOptions<RegisterMutation, RegisterMutationVariables>;
type LoginMutationReturnProps = [
  (input?: AuthRegisterInput) => Promise<FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<RegisterMutation>
]

export const useRegister = (props: LoginMutationProps = { errorPolicy: 'all' }): LoginMutationReturnProps => {
  const onCompleted = (data: RegisterMutation) => {
    const token = data?.register?.token;
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

  const [onRegister, registerProps] = useRegisterMutation(propsWithCompleted);
  try {
    const register = (input: AuthRegisterInput) => {
      return onRegister({
        variables: {
          input,
        }
        // refetchQueries: (mutationResult: RegisterMutationResult) => {
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

export default useRegister;
