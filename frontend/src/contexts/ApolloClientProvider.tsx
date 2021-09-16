import { useMemo } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { FunctionComponent } from "react";

console.log(`Connecting to API ${process.env.REACT_APP_API}`);

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API,
});

const ApolloClientProvider: FunctionComponent = ({ children }) => {
  const client = useMemo((...args) => {
    return new ApolloClient({
      uri: process.env.REACT_APP_API,
      link: httpLink,
      cache: new InMemoryCache({}),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
