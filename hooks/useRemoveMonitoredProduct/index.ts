import { FetchResult, makeReference, MutationHookOptions, MutationResult } from '@apollo/react-hooks';
import _, { noop } from 'lodash';

import {
  RemoveMonitoredProductMutation,
  RemoveMonitoredProductMutationVariables,
  CurrentUserDocument,
  useRemoveMonitoredProductMutation,
  RemoveMonitoredProductInput,
} from '../../@types/generated';


type RemoveMonitoredProductMutationProps = MutationHookOptions<RemoveMonitoredProductMutation, RemoveMonitoredProductMutationVariables>

type RemoveMonitoredProductMutationReturnProps = [
  (input?: RemoveMonitoredProductInput) => Promise<FetchResult<RemoveMonitoredProductMutation, Record<string, any>, Record<string, any>>>,
  MutationResult<RemoveMonitoredProductMutation>
]

export const useRemoveMonitoredProduct = (props: RemoveMonitoredProductMutationProps = {}): RemoveMonitoredProductMutationReturnProps => {
  const propsWithDefaults: MutationHookOptions<RemoveMonitoredProductMutation, RemoveMonitoredProductMutationVariables> = {
    errorPolicy: 'all',
    ...props,
  };

  const [onRemoveMonitoredProduct, removeMonitoredProductProps] = useRemoveMonitoredProductMutation(propsWithDefaults);

  try {
    const cache = removeMonitoredProductProps?.client?.cache;
    const removeMonitoredProduct = (input: RemoveMonitoredProductInput) => {
      return new Promise((resolve) => {
        return onRemoveMonitoredProduct({
          variables: {
            input,
          },
          refetchQueries: [
            { query: CurrentUserDocument },
          ],
          awaitRefetchQueries: true,
        }).then((fetchResult) => {
          const retailerProductId = fetchResult?.data?.removeMonitoredProduct?.removedItemWithId;
          const isSuccessful = fetchResult?.data?.removeMonitoredProduct?.successfulyRemoved;
          if (retailerProductId && isSuccessful) {
            cache.modify({
              id: cache.identify(makeReference(retailerProductId)),
              fields(fieldValue, details) {
                return details.DELETE;
              },
            });
            cache.gc();
          }

          resolve(fetchResult);
        });
      });
    };

    return [
      removeMonitoredProduct,
      removeMonitoredProductProps,
    ];
  } catch (error) {
    return [
      noop as any,
      removeMonitoredProductProps,
    ];
  }
};
