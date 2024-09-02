import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
});

export const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};

export const serverClient = createApolloClient();
