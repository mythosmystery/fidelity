import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../gen/graphql';
const endpoint = 'https://graphql.us.fauna.com/graphql';
const client = new GraphQLClient(endpoint, {
   headers: { Authorization: process.env.FAUNA_TOKEN as string }
});
const sdk = getSdk(client);
export { client, sdk };
