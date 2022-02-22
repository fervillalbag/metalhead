import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";

import { getToken } from "utils/helpers";

const httpLink = createUploadLink({
  uri: process.env.URL_API,
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
