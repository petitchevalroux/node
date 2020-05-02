import graphql from "graphql-tag";
const TYPE_QUERY = graphql `  
query Tyres($id: ID!) {
    tyre(id: $id) {
        title
    }
}`;
export default TYPE_QUERY;