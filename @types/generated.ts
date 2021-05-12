import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AddProductPageToMonitoredProductInput = {
  monitoredProductId: Scalars['ID'];
  productPages: Array<ProductPageInput>;
};

export type AuthLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateMonitoredProductInput = {
  name?: Maybe<Scalars['String']>;
  productPages: Array<ProductPageInput>;
};


export type MonitoredProduct = {
  id: Scalars['ID'];
  name: Scalars['String'];
  retailerProducts: Array<RetailerProduct>;
};

export type Mutation = {
  addMonitoredProduct?: Maybe<MonitoredProduct>;
  removeMonitoredProduct?: Maybe<RemoveResult>;
  addProductPageToMonitoredProduct?: Maybe<MonitoredProduct>;
  removeProductPageFromMonitoredProduct?: Maybe<MonitoredProduct>;
  register: TokenUser;
  login: TokenUser;
};


export type MutationAddMonitoredProductArgs = {
  input: CreateMonitoredProductInput;
};


export type MutationRemoveMonitoredProductArgs = {
  input: RemoveMonitoredProductInput;
};


export type MutationAddProductPageToMonitoredProductArgs = {
  input: AddProductPageToMonitoredProductInput;
};


export type MutationRemoveProductPageFromMonitoredProductArgs = {
  input: RemoveProductPagesFromMonitoredProductInput;
};


export type MutationRegisterArgs = {
  input: AuthRegisterInput;
};


export type MutationLoginArgs = {
  input: AuthLoginInput;
};

export type ProductPageInput = {
  url: Scalars['String'];
  retailer: RetailerEnum;
};

export type ProductPrice = {
  id: Scalars['ID'];
  observedAtDateTime: Scalars['DateTime'];
  value: Scalars['Float'];
};

export type Query = {
  currentUser?: Maybe<User>;
  products: Array<RetailerProduct>;
  retailerProduct?: Maybe<RetailerProduct>;
};


export type QueryProductsArgs = {
  input: RetailerProductSearchTermInput;
};


export type QueryRetailerProductArgs = {
  input: ProductPageInput;
};

export type RemoveMonitoredProductInput = {
  monitoredProductId: Scalars['ID'];
};

export type RemoveProductPagesFromMonitoredProductInput = {
  monitoredProductId: Scalars['ID'];
  productPageIds: Array<Scalars['ID']>;
};

export type RemoveResult = {
  removedItemWithId: Scalars['ID'];
  errorMessage?: Maybe<Scalars['String']>;
  successfulyRemoved: Scalars['Boolean'];
};

export enum RetailerEnum {
  Coles = 'Coles',
  Woolworths = 'Woolworths',
  Costco = 'Costco',
  Iga = 'IGA'
}

export type RetailerProduct = {
  id: Scalars['ID'];
  brand?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  productPageUrl: Scalars['String'];
  unitPrice?: Maybe<Scalars['String']>;
  packageSize?: Maybe<Scalars['String']>;
  retailer: RetailerEnum;
  isUnavailable?: Maybe<Scalars['Boolean']>;
  isOnSpecial?: Maybe<Scalars['Boolean']>;
  prices?: Maybe<Array<ProductPrice>>;
  latestPrice?: Maybe<ProductPrice>;
  previousPrice?: Maybe<ProductPrice>;
};

export type RetailerProductSearchTermInput = {
  searchTerm: Scalars['String'];
  retailers?: Maybe<Array<RetailerEnum>>;
};

export type TokenUser = {
  token: Scalars['String'];
  user: User;
};

export type User = {
  id: Scalars['ID'];
  email: Scalars['String'];
  monitoredProducts?: Maybe<Array<MonitoredProduct>>;
};

export type BasicUserDetailsFragment = Pick<User, 'id' | 'email'>;

export type ProductPriceFragment = Pick<ProductPrice, 'id' | 'value' | 'observedAtDateTime'>;

export type RetailerProductFragment = (
  Pick<RetailerProduct, 'id' | 'brand' | 'name' | 'imageUrl' | 'productPageUrl' | 'unitPrice' | 'packageSize' | 'retailer' | 'isUnavailable' | 'isOnSpecial'>
  & { previousPrice?: Maybe<ProductPriceFragment>, latestPrice?: Maybe<ProductPriceFragment>, prices?: Maybe<Array<ProductPriceFragment>> }
);

export type MonitoredProductFragment = (
  Pick<MonitoredProduct, 'id' | 'name'>
  & { retailerProducts: Array<RetailerProductFragment> }
);

export type AddMonitoredProductMutationVariables = Exact<{
  input: CreateMonitoredProductInput;
}>;


export type AddMonitoredProductMutation = { addMonitoredProduct?: Maybe<(
    Pick<MonitoredProduct, 'id' | 'name'>
    & { retailerProducts: Array<RetailerProductFragment> }
  )> };

export type AddProductToMonitoredProductMutationVariables = Exact<{
  input: AddProductPageToMonitoredProductInput;
}>;


export type AddProductToMonitoredProductMutation = { addProductPageToMonitoredProduct?: Maybe<(
    Pick<MonitoredProduct, 'id' | 'name'>
    & { retailerProducts: Array<RetailerProductFragment> }
  )> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser?: Maybe<(
    { monitoredProducts?: Maybe<Array<MonitoredProductFragment>> }
    & BasicUserDetailsFragment
  )> };

export type LoginMutationVariables = Exact<{
  input: AuthLoginInput;
}>;


export type LoginMutation = { login: (
    Pick<TokenUser, 'token'>
    & { user: BasicUserDetailsFragment }
  ) };

export type ProductSearchQueryVariables = Exact<{
  input: RetailerProductSearchTermInput;
}>;


export type ProductSearchQuery = { products: Array<RetailerProductFragment> };

export type RegisterMutationVariables = Exact<{
  input: AuthRegisterInput;
}>;


export type RegisterMutation = { register: (
    Pick<TokenUser, 'token'>
    & { user: BasicUserDetailsFragment }
  ) };

export type RemoveMonitoredProductMutationVariables = Exact<{
  input: RemoveMonitoredProductInput;
}>;


export type RemoveMonitoredProductMutation = { removeMonitoredProduct?: Maybe<Pick<RemoveResult, 'removedItemWithId' | 'errorMessage' | 'successfulyRemoved'>> };

export const BasicUserDetailsFragmentDoc = gql`
    fragment BasicUserDetails on User {
  id
  email
}
    `;
export const ProductPriceFragmentDoc = gql`
    fragment ProductPrice on ProductPrice {
  id
  value
  observedAtDateTime
}
    `;
export const RetailerProductFragmentDoc = gql`
    fragment RetailerProduct on RetailerProduct {
  id
  brand
  name
  imageUrl
  productPageUrl
  unitPrice
  packageSize
  retailer
  isUnavailable
  isOnSpecial
  previousPrice {
    ...ProductPrice
  }
  latestPrice {
    ...ProductPrice
  }
  prices {
    ...ProductPrice
  }
}
    ${ProductPriceFragmentDoc}`;
export const MonitoredProductFragmentDoc = gql`
    fragment MonitoredProduct on MonitoredProduct {
  id
  name
  retailerProducts {
    ...RetailerProduct
  }
}
    ${RetailerProductFragmentDoc}`;
export const AddMonitoredProductDocument = gql`
    mutation AddMonitoredProduct($input: CreateMonitoredProductInput!) {
  addMonitoredProduct(input: $input) {
    id
    name
    retailerProducts {
      ...RetailerProduct
    }
  }
}
    ${RetailerProductFragmentDoc}`;
export type AddMonitoredProductMutationFn = Apollo.MutationFunction<AddMonitoredProductMutation, AddMonitoredProductMutationVariables>;

/**
 * __useAddMonitoredProductMutation__
 *
 * To run a mutation, you first call `useAddMonitoredProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMonitoredProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMonitoredProductMutation, { data, loading, error }] = useAddMonitoredProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddMonitoredProductMutation(baseOptions?: Apollo.MutationHookOptions<AddMonitoredProductMutation, AddMonitoredProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMonitoredProductMutation, AddMonitoredProductMutationVariables>(AddMonitoredProductDocument, options);
      }
export type AddMonitoredProductMutationHookResult = ReturnType<typeof useAddMonitoredProductMutation>;
export type AddMonitoredProductMutationResult = Apollo.MutationResult<AddMonitoredProductMutation>;
export type AddMonitoredProductMutationOptions = Apollo.BaseMutationOptions<AddMonitoredProductMutation, AddMonitoredProductMutationVariables>;
export const AddProductToMonitoredProductDocument = gql`
    mutation AddProductToMonitoredProduct($input: AddProductPageToMonitoredProductInput!) {
  addProductPageToMonitoredProduct(input: $input) {
    id
    name
    retailerProducts {
      ...RetailerProduct
    }
  }
}
    ${RetailerProductFragmentDoc}`;
export type AddProductToMonitoredProductMutationFn = Apollo.MutationFunction<AddProductToMonitoredProductMutation, AddProductToMonitoredProductMutationVariables>;

/**
 * __useAddProductToMonitoredProductMutation__
 *
 * To run a mutation, you first call `useAddProductToMonitoredProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToMonitoredProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToMonitoredProductMutation, { data, loading, error }] = useAddProductToMonitoredProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToMonitoredProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductToMonitoredProductMutation, AddProductToMonitoredProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductToMonitoredProductMutation, AddProductToMonitoredProductMutationVariables>(AddProductToMonitoredProductDocument, options);
      }
export type AddProductToMonitoredProductMutationHookResult = ReturnType<typeof useAddProductToMonitoredProductMutation>;
export type AddProductToMonitoredProductMutationResult = Apollo.MutationResult<AddProductToMonitoredProductMutation>;
export type AddProductToMonitoredProductMutationOptions = Apollo.BaseMutationOptions<AddProductToMonitoredProductMutation, AddProductToMonitoredProductMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...BasicUserDetails
    monitoredProducts {
      ...MonitoredProduct
    }
  }
}
    ${BasicUserDetailsFragmentDoc}
${MonitoredProductFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export function refetchCurrentUserQuery(variables?: CurrentUserQueryVariables) {
      return { query: CurrentUserDocument, variables: variables }
    }
export const LoginDocument = gql`
    mutation Login($input: AuthLoginInput!) {
  login(input: $input) {
    token
    user {
      ...BasicUserDetails
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ProductSearchDocument = gql`
    query ProductSearch($input: RetailerProductSearchTermInput!) {
  products(input: $input) {
    ...RetailerProduct
  }
}
    ${RetailerProductFragmentDoc}`;

/**
 * __useProductSearchQuery__
 *
 * To run a query within a React component, call `useProductSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductSearchQuery(baseOptions: Apollo.QueryHookOptions<ProductSearchQuery, ProductSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductSearchQuery, ProductSearchQueryVariables>(ProductSearchDocument, options);
      }
export function useProductSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductSearchQuery, ProductSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductSearchQuery, ProductSearchQueryVariables>(ProductSearchDocument, options);
        }
export type ProductSearchQueryHookResult = ReturnType<typeof useProductSearchQuery>;
export type ProductSearchLazyQueryHookResult = ReturnType<typeof useProductSearchLazyQuery>;
export type ProductSearchQueryResult = Apollo.QueryResult<ProductSearchQuery, ProductSearchQueryVariables>;
export function refetchProductSearchQuery(variables?: ProductSearchQueryVariables) {
      return { query: ProductSearchDocument, variables: variables }
    }
export const RegisterDocument = gql`
    mutation Register($input: AuthRegisterInput!) {
  register(input: $input) {
    token
    user {
      ...BasicUserDetails
    }
  }
}
    ${BasicUserDetailsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveMonitoredProductDocument = gql`
    mutation RemoveMonitoredProduct($input: RemoveMonitoredProductInput!) {
  removeMonitoredProduct(input: $input) {
    removedItemWithId
    errorMessage
    successfulyRemoved
  }
}
    `;
export type RemoveMonitoredProductMutationFn = Apollo.MutationFunction<RemoveMonitoredProductMutation, RemoveMonitoredProductMutationVariables>;

/**
 * __useRemoveMonitoredProductMutation__
 *
 * To run a mutation, you first call `useRemoveMonitoredProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMonitoredProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMonitoredProductMutation, { data, loading, error }] = useRemoveMonitoredProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveMonitoredProductMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMonitoredProductMutation, RemoveMonitoredProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMonitoredProductMutation, RemoveMonitoredProductMutationVariables>(RemoveMonitoredProductDocument, options);
      }
export type RemoveMonitoredProductMutationHookResult = ReturnType<typeof useRemoveMonitoredProductMutation>;
export type RemoveMonitoredProductMutationResult = Apollo.MutationResult<RemoveMonitoredProductMutation>;
export type RemoveMonitoredProductMutationOptions = Apollo.BaseMutationOptions<RemoveMonitoredProductMutation, RemoveMonitoredProductMutationVariables>;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddProductPageToMonitoredProductInput: AddProductPageToMonitoredProductInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  AuthLoginInput: AuthLoginInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  AuthRegisterInput: AuthRegisterInput;
  CreateMonitoredProductInput: CreateMonitoredProductInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  MonitoredProduct: ResolverTypeWrapper<MonitoredProduct>;
  Mutation: ResolverTypeWrapper<{}>;
  ProductPageInput: ProductPageInput;
  ProductPrice: ResolverTypeWrapper<ProductPrice>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Query: ResolverTypeWrapper<{}>;
  RemoveMonitoredProductInput: RemoveMonitoredProductInput;
  RemoveProductPagesFromMonitoredProductInput: RemoveProductPagesFromMonitoredProductInput;
  RemoveResult: ResolverTypeWrapper<RemoveResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  RetailerEnum: RetailerEnum;
  RetailerProduct: ResolverTypeWrapper<RetailerProduct>;
  RetailerProductSearchTermInput: RetailerProductSearchTermInput;
  TokenUser: ResolverTypeWrapper<TokenUser>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddProductPageToMonitoredProductInput: AddProductPageToMonitoredProductInput;
  ID: Scalars['ID'];
  AuthLoginInput: AuthLoginInput;
  String: Scalars['String'];
  AuthRegisterInput: AuthRegisterInput;
  CreateMonitoredProductInput: CreateMonitoredProductInput;
  DateTime: Scalars['DateTime'];
  MonitoredProduct: MonitoredProduct;
  Mutation: {};
  ProductPageInput: ProductPageInput;
  ProductPrice: ProductPrice;
  Float: Scalars['Float'];
  Query: {};
  RemoveMonitoredProductInput: RemoveMonitoredProductInput;
  RemoveProductPagesFromMonitoredProductInput: RemoveProductPagesFromMonitoredProductInput;
  RemoveResult: RemoveResult;
  Boolean: Scalars['Boolean'];
  RetailerProduct: RetailerProduct;
  RetailerProductSearchTermInput: RetailerProductSearchTermInput;
  TokenUser: TokenUser;
  User: User;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MonitoredProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['MonitoredProduct'] = ResolversParentTypes['MonitoredProduct']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  retailerProducts?: Resolver<Array<ResolversTypes['RetailerProduct']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addMonitoredProduct?: Resolver<Maybe<ResolversTypes['MonitoredProduct']>, ParentType, ContextType, RequireFields<MutationAddMonitoredProductArgs, 'input'>>;
  removeMonitoredProduct?: Resolver<Maybe<ResolversTypes['RemoveResult']>, ParentType, ContextType, RequireFields<MutationRemoveMonitoredProductArgs, 'input'>>;
  addProductPageToMonitoredProduct?: Resolver<Maybe<ResolversTypes['MonitoredProduct']>, ParentType, ContextType, RequireFields<MutationAddProductPageToMonitoredProductArgs, 'input'>>;
  removeProductPageFromMonitoredProduct?: Resolver<Maybe<ResolversTypes['MonitoredProduct']>, ParentType, ContextType, RequireFields<MutationRemoveProductPageFromMonitoredProductArgs, 'input'>>;
  register?: Resolver<ResolversTypes['TokenUser'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  login?: Resolver<ResolversTypes['TokenUser'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
}>;

export type ProductPriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductPrice'] = ResolversParentTypes['ProductPrice']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  observedAtDateTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['RetailerProduct']>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'input'>>;
  retailerProduct?: Resolver<Maybe<ResolversTypes['RetailerProduct']>, ParentType, ContextType, RequireFields<QueryRetailerProductArgs, 'input'>>;
}>;

export type RemoveResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveResult'] = ResolversParentTypes['RemoveResult']> = ResolversObject<{
  removedItemWithId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  successfulyRemoved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RetailerProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['RetailerProduct'] = ResolversParentTypes['RetailerProduct']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productPageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitPrice?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packageSize?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  retailer?: Resolver<ResolversTypes['RetailerEnum'], ParentType, ContextType>;
  isUnavailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isOnSpecial?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  prices?: Resolver<Maybe<Array<ResolversTypes['ProductPrice']>>, ParentType, ContextType>;
  latestPrice?: Resolver<Maybe<ResolversTypes['ProductPrice']>, ParentType, ContextType>;
  previousPrice?: Resolver<Maybe<ResolversTypes['ProductPrice']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenUser'] = ResolversParentTypes['TokenUser']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  monitoredProducts?: Resolver<Maybe<Array<ResolversTypes['MonitoredProduct']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  MonitoredProduct?: MonitoredProductResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ProductPrice?: ProductPriceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveResult?: RemoveResultResolvers<ContextType>;
  RetailerProduct?: RetailerProductResolvers<ContextType>;
  TokenUser?: TokenUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    