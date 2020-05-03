import graphql from "graphql-tag";
const TYRE_QUERY = graphql `  
query Tyres($id: ID!) {
    tyre(id: $id) {
        title
    }
}`;
export default TYRE_QUERY;