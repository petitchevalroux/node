const SwaggerParser = require("@apidevtools/swagger-parser"),
    assert = require("assert");
describe("cms-api-contents-documentations", () => {
    const parser = new SwaggerParser();
    it("Package expose a valid Swagger Object", () => {
        const dist = require("../dist/index");
        return parser.validate(dist);
    });
    it("Package and index expose the same objet", () => {
        const dist = require("../dist/index"),
            index = require("../src/index");
        return parser.dereference(index).then( index =>{
            return assert.deepEqual(dist, index);
        });
    });
});