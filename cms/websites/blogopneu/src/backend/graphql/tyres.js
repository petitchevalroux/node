import graphql from "graphql-tag";
const TYRE_QUERY = graphql`
query ($start:Int!,$limit:Int!) {
  tyres(start:$start,limit:$limit) {
    id,
    title
  }
}`;
export default TYRE_QUERY;