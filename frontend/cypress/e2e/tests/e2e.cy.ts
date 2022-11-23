beforeEach(() => {
  cy.visit("/");
});
// First some simple tests
// After the the simple tests we head over to more complex e2e tests
describe("E2E tests, with some simple tests", () => {
  it("successfully loads", () => {});

  it("header contains title", () => {
    cy.contains(/damp/i);
    cy.contains(/filter/i);
  });

  it("click filter button and add simple filter", () => {
    cy.get("[data-testid=filters]").click();
    cy.get("[data-testid=Genre]").click();
    cy.contains("Gore").click();
    cy.contains("Add filter").click();
  });

  it("enter search request", () => {
    let newItem = "Eve Online";
    cy.get("[data-testid=searchBox]").type(`${newItem}{enter}`);
  });

  it("click on game and check price", () => {
    cy.get("[data-testid=img379720]").click();

    cy.contains(/\$19\.99/i);
  });

  it("click on game and check language", () => {
    cy.get("[data-testid=img637090]").click();
    cy.contains(/Language/i);
    cy.contains(/English/i);
  });

  it("user check price of game", () => {
    let newItem = "eve";
    cy.wait(5000);
    cy.get("[data-testid=searchBox]").type(`${newItem}`);
    cy.wait(500);
    cy.get("[data-testid=gameCard-EVEOnline]")[0].click();
    cy.get('/\$19\.99/i');
  });
  
  it.only("user add comment to a game", () => {
    let newItem = "eve online";
    cy.wait(1500);
    cy.get("[data-testid=searchBox]").type(`${newItem}`);
    cy.wait(1500);
    cy.get("[data-testid=gameCard-EVEOnline]").first().click();
    cy.get(
      ".MuiCardActions-root > .MuiPaper-root > .MuiAccordionSummary-root"
    ).click();
    cy.get("[data-testid=name_textbox]").type("the watcher");
    cy.get('[for=":rf:"]').click();
    cy.get("[data-testid=comment_textbox]").type("i recommend this game");
    cy.get("[data-testid=add_comment]").click()
    cy.contains("the watcher");
  });
});
