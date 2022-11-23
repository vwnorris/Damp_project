// This file is supposed to test the filter component

beforeEach(() => {
  cy.visit("/");
});

describe("The filter", () => {
  it("Filters is clickable", () => {
    cy.get("[data-testid=filters]").should("not.be.disabled");
  });

  it("click filter button and add simple filter, and is visible while filters is closed", () => {
    cy.get("[data-testid=filters]").click();
    cy.get("[data-testid=Genre]").click();
    cy.get("[data-testid=settingsGenre]").contains("Action").click();
    cy.contains("Add filter").click();
    cy.get("[data-testid=Genre]").should("not.exist");
    cy.get("span").contains("Genre");
    cy.get("[data-testid=GenreActive]").click();
    cy.contains(/genre/i);
  });

  it("add filter and remove it", () => {
    cy.get("[data-testid=filters]").click();
    cy.get("[data-testid=Genre]").click();
    cy.get("[data-testid=settingsGenre]").contains("Action").click();
    cy.contains("Add filter").click();
    cy.get("[data-testid=Genre]").should("not.exist");
    cy.get("span").contains("Genre");
    cy.contains("Genre | Gore").click();
    cy.contains("Filters").click();
    cy.contains("Gore").should("not.exist");
  });

  it.only("add multiple filters", () => {
    cy.get("[data-testid=filters]").click();
    cy.get("[data-testid=Genre]").click();
    cy.get("[data-testid=settingsGenre]").contains("Action").click();
    cy.contains("Add filter").click();
    cy.get("[data-testid=Genre]").should("not.exist");
    cy.get("span").contains("Genre");
    cy.contains("Achievements").click();
    cy.contains("No achievements").click();
    cy.contains("Add filter").click();
    cy.contains("Filters").click();
    cy.contains("Genre");
    cy.contains("Achievements");
  });
});
