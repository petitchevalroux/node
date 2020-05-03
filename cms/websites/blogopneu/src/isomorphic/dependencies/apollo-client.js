import { InMemoryCache, ApolloClient } from "@apollo/client";
import apiContentUrl from "./api-contents-url";
import isServerSide from "./is-server-side";
export default new ApolloClient({
    ssrMode: isServerSide,
    uri: apiContentUrl,
    cache: new InMemoryCache()
});

