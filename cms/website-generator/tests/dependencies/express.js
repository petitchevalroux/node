"use strict";
const assert = require("assert");
describe("dependencies/express", () => {
    it("return an object with a listen function", () => {
        const express  = require("../../src/dependencies/express");
        assert.equal(typeof(express.listen),"function");
    });
});