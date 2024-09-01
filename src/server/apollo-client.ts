import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

const httpLink = new HttpLink({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    ssrMode: true,
    link: httpLink,
    cache: new InMemoryCache(),
  });
});
