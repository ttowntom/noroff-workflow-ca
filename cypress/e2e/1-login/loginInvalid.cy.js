describe("Noroff social invalid login (not a Noroff email address)", () => {
  it("can log in with the login form with valid credentials", () => {
    cy.visit("/");
    cy.wait(500);
    cy.get('button[data-auth="login"]').last().click();
    cy.wait(500);
    cy.fixture("loginDataInvalid.json").then((loginData) => {
      cy.get("input#loginEmail").type(loginData.email);
      cy.get("input#loginPassword").type(loginData.password);
    });
    cy.get('button[type="submit"]').contains("Login").click();
    cy.get("form#loginForm").then(($form) => {
      if ($form[0].checkValidity()) {
        // Form is valid, no validation error
      } else {
        // Form is invalid, validation error has been triggered
        cy.get("input#loginEmail").then(($input) => {
          expect($input[0].validationMessage).to.eq(
            // The error message is in Norwegian
            "Sørg for samsvar med det forespurte formatet.",
          );
        });
      }
    });
  });
});
