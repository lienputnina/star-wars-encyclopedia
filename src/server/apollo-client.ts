import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Make fancy later
const httpLink = new HttpLink({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

export const client = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
});
