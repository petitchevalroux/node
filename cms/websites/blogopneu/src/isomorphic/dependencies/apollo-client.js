import { InMemoryCache, ApolloClient } from "@apollo/client";
import apiContentUrl from "./api-contents-url";
import isServerSide from "./is-server-side";
import fetch from "isomorphic-fetch";
export default new ApolloClient({
    ssrMode: isServerSide,
    fectch:fetch,
    uri: apiContentUrl,
    cache: new InMemoryCache()
});

