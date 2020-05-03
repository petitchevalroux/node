import React from "react";
import PropTypes from "prop-types";
class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">{this.props.title}</h1>
                {this.props.children}
            </div>
        );
    }
}

Content.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object
};
export default Content;