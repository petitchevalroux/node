import withApollo from "next-with-apollo";
import apolloClient from "../dependencies/apollo-client";
import {getDataFromTree} from "@apollo/react-ssr";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import PropTypes from "prop-types";


function renderWithApollo({ Page, props }) {
    return (
        <ApolloProvider client={apolloClient}>
            <Page {...props} />
        </ApolloProvider>
    );
}

renderWithApollo.propTypes = {
    Page: PropTypes.instanceOf(React.Component).isRequired,
    props:PropTypes.object.isRequired
};


export default withApollo(
    ({ initialState }) => {
        if(typeof(initialState) !== "undefined") {
            apolloClient.cache.restore(initialState);
        }
        return apolloClient;
    },
    {
        getDataFromTree:getDataFromTree,
        render: renderWithApollo
    }
);