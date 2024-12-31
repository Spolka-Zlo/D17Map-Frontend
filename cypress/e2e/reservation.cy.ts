describe("Reservation", () => {
  it("should make reservation", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get('input[name="buildingName"]').type("D17");
    cy.get('button[type="submit"]').click();
    cy.get("button").contains("+").click();

    cy.get('input[name="title"]').type("Test");
    cy.get('input[name="description"]').type("Test");
    cy.get('input[name="date"]').type("2025-06-09");
    cy.get('input[name="startTime"]').type("10:00");
    cy.get('input[name="endTime"]').type("12:00");
    cy.get('input[name="numberOfParticipants"]').type("10");
    cy.get('input[name="isRecurring"]').click();
    cy.get('input[name="recurringEndDate"]').type("2025-06-15");
    cy.get('button[type="submit"]').click();

    cy.visit("http://localhost:3000/calendar?date=1749456360000");

    cy.get("div").contains("Test");
  });

  it("should edit reservation", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get('input[name="buildingName"]').type("D17");
    cy.get('button[type="submit"]').click();
    cy.get("h1").contains("Nadchodzące rezerwacje");

    cy.visit("http://localhost:3000/calendar?date=1749456360000");
    cy.get("button").contains("🖉").first().click();

    cy.get('input[name="title"]').type("3");
    cy.get('input[name="description"]').type("3");
    cy.get('button[type="submit"]').click();
    cy.get("h1").contains("Nadchodzące rezerwacje");

    cy.get("div").contains("Test3");
  });

  it("should delete reservation", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get('input[name="buildingName"]').type("D17");
    cy.get('button[type="submit"]').click();
    cy.get("h1").contains("Nadchodzące rezerwacje");

    cy.visit("http://localhost:3000/calendar?date=1749456360000");

    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();

    cy.get("div").should("not.contain", "Test3");
  });

  it("should clean up", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get('input[name="buildingName"]').type("D17");
    cy.get('button[type="submit"]').click();
    cy.get("h1").contains("Nadchodzące rezerwacje");

    cy.visit("http://localhost:3000/calendar?date=1749456360000");

    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();
    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();
    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();
    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();
    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();
    cy.get("button").contains("🗑").first().click();
    cy.get("button").contains("Potwierdź").click();
  });
});
