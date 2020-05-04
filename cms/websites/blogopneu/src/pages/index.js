import React from "react";
import Head from "next/head";
import ListTyres from "../backend/components/list-tyres";
import { getDataFromTree } from "@apollo/react-ssr";
import {ApolloProvider} from "@apollo/client";
import apolloClient from "../isomorphic/dependencies/apollo-client";


function Home(props) {
    apolloClient.cache.restore(props.apolloState);
    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ListTyres start={0} limit={10}/>
        </ApolloProvider>
    );
}

export function getServerSideProps() {
    return getDataFromTree(Home({apolloState:{}})).then(() =>{
        return {props:{apolloState:apolloClient.extract()}};
    });
}

export default Home;