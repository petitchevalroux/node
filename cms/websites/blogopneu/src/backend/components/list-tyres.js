import ListLinks from "../../isomorphic/components/list-links";
import query from "../graphql/tyres";
import { useQuery } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";

const ListTyres = (props) => {
    const { loading, error, data } = useQuery(query, {
        variables: { start:props.start, limit:props.limit },
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return <ListLinks contents={data.tyres}/>;
};

ListTyres.propTypes = {
    start: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired
};

export default ListTyres;
