import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  Time: any;
};

export type Customer = {
  __typename?: 'Customer';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

/** 'Customer' input values */
export type CustomerInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

/** The pagination object for elements of type 'Customer'. */
export type CustomerPage = {
  __typename?: 'CustomerPage';
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
  /** The elements of type 'Customer' in this page. */
  data: Array<Maybe<Customer>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new document in the collection of 'Customer' */
  createCustomer: Customer;
  /** Delete an existing document in the collection of 'Customer' */
  deleteCustomer?: Maybe<Customer>;
  /** Update an existing document in the collection of 'Customer' */
  updateCustomer?: Maybe<Customer>;
};


export type MutationCreateCustomerArgs = {
  data: CustomerInput;
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCustomerArgs = {
  data: CustomerInput;
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  customers: CustomerPage;
  /** Find a document from the collection of 'Customer' by its id. */
  findCustomerByID?: Maybe<Customer>;
};


export type QueryCustomersArgs = {
  _cursor?: InputMaybe<Scalars['String']>;
  _size?: InputMaybe<Scalars['Int']>;
};


export type QueryFindCustomerByIdArgs = {
  id: Scalars['ID'];
};

export type GetCustomersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomersQuery = { __typename?: 'Query', customers: { __typename?: 'CustomerPage', data: Array<{ __typename?: 'Customer', _id: string, _ts: any, email: string, name: string, phoneNumber: string } | null | undefined> } };

export type CustomerByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CustomerByIdQuery = { __typename?: 'Query', findCustomerByID?: { __typename?: 'Customer', _id: string, _ts: any, email: string, name: string, phoneNumber: string } | null | undefined };

export type AddCustomerMutationVariables = Exact<{
  data: CustomerInput;
}>;


export type AddCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'Customer', _id: string, _ts: any, email: string, name: string, phoneNumber: string } };


export const GetCustomersDocument = gql`
    query getCustomers {
  customers {
    data {
      _id
      _ts
      email
      name
      phoneNumber
    }
  }
}
    `;

/**
 * __useGetCustomersQuery__
 *
 * To run a query within a React component, call `useGetCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomersQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
      }
export function useGetCustomersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomersQuery, GetCustomersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomersQuery, GetCustomersQueryVariables>(GetCustomersDocument, options);
        }
export type GetCustomersQueryHookResult = ReturnType<typeof useGetCustomersQuery>;
export type GetCustomersLazyQueryHookResult = ReturnType<typeof useGetCustomersLazyQuery>;
export type GetCustomersQueryResult = Apollo.QueryResult<GetCustomersQuery, GetCustomersQueryVariables>;
export const CustomerByIdDocument = gql`
    query customerByID($id: ID!) {
  findCustomerByID(id: $id) {
    _id
    _ts
    email
    name
    phoneNumber
  }
}
    `;

/**
 * __useCustomerByIdQuery__
 *
 * To run a query within a React component, call `useCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<CustomerByIdQuery, CustomerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerByIdQuery, CustomerByIdQueryVariables>(CustomerByIdDocument, options);
      }
export function useCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerByIdQuery, CustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerByIdQuery, CustomerByIdQueryVariables>(CustomerByIdDocument, options);
        }
export type CustomerByIdQueryHookResult = ReturnType<typeof useCustomerByIdQuery>;
export type CustomerByIdLazyQueryHookResult = ReturnType<typeof useCustomerByIdLazyQuery>;
export type CustomerByIdQueryResult = Apollo.QueryResult<CustomerByIdQuery, CustomerByIdQueryVariables>;
export const AddCustomerDocument = gql`
    mutation addCustomer($data: CustomerInput!) {
  createCustomer(data: $data) {
    _id
    _ts
    email
    name
    phoneNumber
  }
}
    `;
export type AddCustomerMutationFn = Apollo.MutationFunction<AddCustomerMutation, AddCustomerMutationVariables>;

/**
 * __useAddCustomerMutation__
 *
 * To run a mutation, you first call `useAddCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCustomerMutation, { data, loading, error }] = useAddCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddCustomerMutation(baseOptions?: Apollo.MutationHookOptions<AddCustomerMutation, AddCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCustomerMutation, AddCustomerMutationVariables>(AddCustomerDocument, options);
      }
export type AddCustomerMutationHookResult = ReturnType<typeof useAddCustomerMutation>;
export type AddCustomerMutationResult = Apollo.MutationResult<AddCustomerMutation>;
export type AddCustomerMutationOptions = Apollo.BaseMutationOptions<AddCustomerMutation, AddCustomerMutationVariables>;