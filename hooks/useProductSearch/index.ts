import { QueryHookOptions } from '@apollo/react-hooks';

import {
  ProductSearchQuery,
  ProductSearchQueryVariables,
  RetailerEnum,
  useProductSearchQuery
} from '../../@types/generated';


interface UseProductSearchProps {
  searchTerm: string;
  retailers?: RetailerEnum[];
  queryArgs?: QueryHookOptions<ProductSearchQuery, ProductSearchQueryVariables>;
}

export const useProductSearch = ({ searchTerm, retailers = [RetailerEnum.Woolworths], queryArgs }: UseProductSearchProps) => {
  const serachQueryArgs: QueryHookOptions<ProductSearchQuery, ProductSearchQueryVariables> = {
    errorPolicy: 'all',
    context: {
      debounceKey: 'productSearch',
      debounceTimeout: 1000,
    },
    fetchPolicy: 'cache-first',
    ...queryArgs,
    variables: {
      input: {
        searchTerm,
        retailers,
      }
    }
  };

  try {
    const { data, loading, ...queryProps } = useProductSearchQuery(serachQueryArgs);
    const products = data?.products;

    return {
      products,
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
