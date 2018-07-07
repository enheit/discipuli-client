import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import Authorization from './services/authorization.service';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((request, previousContext) => {
  // get the authentication token from local storage if it exists
  const token = Authorization.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...previousContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
});

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
  cache,
});

export default client;
