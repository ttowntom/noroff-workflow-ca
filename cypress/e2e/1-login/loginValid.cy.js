describe("Noroff social valid login", () => {
  it("can log in with the login form with valid credentials", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.wait(500);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(500);
    cy.fixture("loginData.json").then((loginData) => {
      cy.get("input#loginEmail").type(loginData.email);
      cy.get("input#loginPassword").type(loginData.password);
    });
    cy.intercept(
      "POST",
      "https://nf-api.onrender.com/api/v1/social/auth/login",
    ).as("loginRequest");
    cy.get('button[type="submit"]').contains("Login").click();
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  });
});
