import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../gen/graphql';
const endpoint = 'https://graphql.us.fauna.com/graphql';
const client = new GraphQLClient(endpoint, {
   headers: { Authorization: 'Bearer fnAEZwPsvEAAQtSFvnhaS6Ca16gN1lpDlqRR9ELe' }
});
const sdk = getSdk(client);
export { client, sdk };
