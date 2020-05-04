import { useRouter } from "next/router";
import React from "react";
import ContentTyre from "../../backend/components/content-tyre";
import { getDataFromTree } from "@apollo/react-ssr";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "../../isomorphic/dependencies/apollo-client";

function getQuery(props) {
    if (props.query) {
        return props.query;
    }
    const router = useRouter();
    return router.query;
}

const TyrePage = (props) => {
    apolloClient.cache.restore(props.apolloState || {});
    const id = getQuery(props).id;
    return (
        <ApolloProvider client={apolloClient}>
            <ContentTyre id={id}/>
        </ApolloProvider>
    );
};

export function getServerSideProps(context) {
    return getDataFromTree(TyrePage({apolloState:{},query:context.query||undefined})).then(() =>{
        return {props:{apolloState:apolloClient.extract()}};
    });
}

export default TyrePage;
