import React from "react";
import PropTypes from "prop-types";

class Content extends React.Component {
    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}
Content.propTypes = {
    title: PropTypes.string
};
export default Content;