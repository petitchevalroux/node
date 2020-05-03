import graphql from "graphql-tag";
const TYRE_QUERY = graphql`
{
  tyre(id: "1") {
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