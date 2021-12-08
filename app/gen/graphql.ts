import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCustomers(variables?: GetCustomersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCustomersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCustomersQuery>(GetCustomersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCustomers');
    },
    customerByID(variables: CustomerByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CustomerByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CustomerByIdQuery>(CustomerByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'customerByID');
    },
    addCustomer(variables: AddCustomerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddCustomerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddCustomerMutation>(AddCustomerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addCustomer');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;