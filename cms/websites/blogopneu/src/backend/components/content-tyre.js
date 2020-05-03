import Content from "../../isomorphic/components/content";
import TyreVariants from "../../isomorphic/components/tyre/variants";
import query from "../graphql/tyre";
import { useQuery } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";

const ContentTyre = (props) => {
    const { loading, error, data } = useQuery(query, {
        variables: { id:props.id },
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
        <Content title={data.tyre.title}>
            <TyreVariants variants={data.tyre.tyrevariants}/>
        </Content>
    );
};

ContentTyre.propTypes = {
    id: PropTypes.string.isRequired
};

export default ContentTyre;
