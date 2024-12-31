describe("Login", () => {
  it("should display login form", () => {
    cy.visit("http://localhost:3000/");

    cy.get("span").contains("Zaloguj się");
    cy.get('a[href*="login"]').first().click();

    cy.url().should("include", "/login");
  });

  it("should login admin", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get('input[name="buildingName"]').type("D17");
    cy.get('button[type="submit"]').click();

    cy.get("h1").contains("Nadchodzące rezerwacje");
    cy.get("span").contains("Admin Panel");

    cy.get('a[href*="admin-panel"]').first().click();

    cy.url().should("include", "/admin-panel");
  });
});
