import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * a way to make sure we only use one client
 */
export const client = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
});