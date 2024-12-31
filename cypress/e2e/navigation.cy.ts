describe("Navigation", () => {
  it("should display calendar for unsigned user", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href*="calendar"]').first().click();

    cy.url().should("include", "/calendar");

    cy.get("h1").contains("Nadchodzące wydarzenia");
  });

  it("should display map for unsigned user", () => {
    cy.visit("http://localhost:3000/");

    cy.get('a[href*="map"]').first().click();

    cy.url().should("include", "/map");

    cy.get("span").contains("WC");
  });
});
