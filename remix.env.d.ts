/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface Context {
   apolloClient: ApolloClient<NormalizedCacheObject>;
}
