import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

console.log('created apollo client');
export const client = new ApolloClient({
   ssrMode: true,
   link: new HttpLink({
      uri: process.env.GQL,
      headers: {
         Authorization: process.env.FAUNA_TOKEN || ''
      }
   }),
   cache: new InMemoryCache()
});
