'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { client } from '../lib/apollo-client';

export const ApolloWrapper = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
