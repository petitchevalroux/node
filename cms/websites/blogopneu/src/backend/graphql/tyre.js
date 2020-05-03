import graphql from "graphql-tag";
const TYRE_QUERY = graphql`
query ($id: ID!){
  tyre(id: $id) {
    title
    tyrevariants{
      name,
      weight,
      minPressureKpa,
      maxPressureKpa,
      maxLoadKg,
      tyresizes {
        name,
        tyresizestandard {
          name
        }
      }
    }
  }
}`;
export default TYRE_QUERY;