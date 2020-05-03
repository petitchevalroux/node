import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const ListLinks = (props) => {
    return <ul>
        {
            props.contents.map(
                (content, index) =>
                    <li key={index}>
                        <Link href="/tyres/[id]" as={`/tyres/${content.id}`}>
                            <a>{content.title}</a>
                        </Link>
                    </li>
            )}
    </ul>;
};

ListLinks.propTypes = {
    contents: PropTypes.array.isRequired
};

export default ListLinks;