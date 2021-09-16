import { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { FunctionComponent } from "react";

// do a little bit of magic to get the gitpod URL for the API
const APP_API_URL = process.env.GITPOD_WORKSPACE_URL
  ? process.env.GITPOD_WORKSPACE_URL.replace("https://", "https://3001-")
  : process.env.REACT_APP_API;

console.log(`Connecting to API ${APP_API_URL}`);

const httpLink = new HttpLink({
  uri: APP_API_URL,
});

const ApolloClientProvider: FunctionComponent = ({ children }) => {
  const client = useMemo((...args) => {
    return new ApolloClient({
      uri: APP_API_URL,
      link: httpLink,
      cache: new InMemoryCache({}),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
