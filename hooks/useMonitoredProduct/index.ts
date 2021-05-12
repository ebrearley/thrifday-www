import { FetchResult, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import { noop } from 'lodash';

import {
  CreateMonitoredProductInput,
  AddMonitoredProductMutation,
  AddMonitoredProductMutationVariables,
  useAddMonitoredProductMutation,
  CurrentUserDocument,
} from '../../@types/generated';


type AddMonitoredProductMutationProps = MutationHookOptions<AddMonitoredProductMutation, AddMonitoredProductMutationVariables>;
type AddMonitoredProductMutationReturnProps = [
  (input?: CreateMonitoredProductInput) => Promise<FetchResult<AddMonitoredProductMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<AddMonitoredProductMutation>
]

export const useMonitoredProduct = (props: AddMonitoredProductMutationProps = { errorPolicy: 'all' }): AddMonitoredProductMutationReturnProps => {
  const [onAddMonitoredProduct, addMonitoredProductProps] = useAddMonitoredProductMutation(props);
  try {
    const addMonitoredProduct = (input: CreateMonitoredProductInput) => {
      return onAddMonitoredProduct({
        variables: {
          input,
        },
        refetchQueries: [
          { query: CurrentUserDocument },
        ],
        awaitRefetchQueries: true,
      });
    };

    return [
      addMonitoredProduct,
      addMonitoredProductProps,
    ];
  } catch (error) {
    return [
      noop as any,
      addMonitoredProductProps,
    ];
  }
};
