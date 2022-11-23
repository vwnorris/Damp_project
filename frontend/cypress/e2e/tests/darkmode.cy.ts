/// <reference types="cypress" />

describe("should set to darkmode", () => {
    it("should change to darkmode", () => {
        cy.visit("/");

        cy.contains("Light").click();

        cy.wait(500);

        cy.contains("Dark");
    });
});