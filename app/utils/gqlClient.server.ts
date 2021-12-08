import { GraphQLClient } from 'graphql-request';
// import { getSdk } from '../gen/graphql';
const client = new GraphQLClient(process.env.GQL || '/graphql', {
   headers: { Authorization: process.env.FAUNA_TOKEN || '' }
});
// const sdk = getSdk(client);
export { client };
