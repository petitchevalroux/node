import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import apiContentUrl from "./api-contents-url";
import isServerSide from "./is-server-side";
import fetch from "isomorphic-unfetch";
export default new ApolloClient({
    ssrMode: isServerSide,
    link: new HttpLink({
        uri:apiContentUrl,
        fetch
    }),
    cache: new InMemoryCache()
});

