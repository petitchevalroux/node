import Content from "../../isomorphic/components/content";
import query from "../graphql/tyre";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import PropTypes from "prop-types";

const ContentTire = (props) => {
    const { loading, error, data } = useQuery(query, {
        variables: { id:props.id },
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return <Content title={data.tyre.title}></Content>;
};

ContentTire.propTypes = {
    id: PropTypes.number.isRequired
};

export default ContentTire;
