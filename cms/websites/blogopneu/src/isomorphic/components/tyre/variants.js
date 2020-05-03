import React from "react";
import PropTypes from "prop-types";

const TyreVariants = (props) => {
    return (
        <table>
            <caption>Tailles disponibles</caption>
            <thead>
                <tr>
                    <th>Dimension</th>
                    <th>ETRTO</th>
                    <th>Poids</th>
                    <th>Pressions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.variants.map(
                        (variant, index)=>{
                            const etrtoTyreSize = variant
                                .tyresizes
                                .find(
                                    tyreSize =>
                                        tyreSize.tyresizestandard.name === "etrto"
                                );
                            var etrto = etrtoTyreSize ? etrtoTyreSize.name : "";
                            return (
                                <tr key={index}>
                                    <td>{variant.name}</td>
                                    <td>{etrto}</td>
                                    <td>{variant.weight} g</td>
                                    <td>
                                        min : {(variant.minPressureKpa ? `${variant.minPressureKpa/ 100} bar`  : "") },
                                        max : {(variant.maxPressureKpa ? `${variant.maxPressureKpa/ 100} bar`  : "") }
                                    </td>
                                </tr>
                            );
                        }
                    )
                }
            </tbody>
        </table>
    );
};
TyreVariants.propTypes = {
    variants: PropTypes.array
};
export default TyreVariants;