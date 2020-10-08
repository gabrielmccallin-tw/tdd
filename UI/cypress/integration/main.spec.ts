// it("should navigate to confirmation page", () => {
//   cy.server();
//   cy.route({
//     url: "/api/BrokerDetails",
//     response: JSON.stringify({ woah: "there" }),
//     status: 200,
//     method: "POST",
//   }).as("postME");
//   const baseUrl = "http://localhost:3000/ContactDetails";
//   cy.visit(baseUrl);
//
//   cy.contains("Fill out this form to join the Open Gi family");
//   cy.get('input[id="companyName"]').type("Cypress Name Gabriel");
//   cy.get('input[id="address"]').type("Cypress Address");
//   cy.get('input[id="postCode"]').type("Cypress PostCode");
//   cy.get('input[id="email"]').type("Cypress Email");
//   cy.get('input[id="tel"]').type("Cypress Tel");
//   cy.get('input[id="mainContactName"]').type("Cypress MName");
//   cy.get('input[id="mainContactEmail"]').type("Cypress MEmail");
//   cy.get('input[id="mainContactTel"]').type("Cypress MTel");
//   cy.get('input[id="fcaRef"]').type("Cypress Ref");
//
//   cy.get('button[id="nextButton"]').click();
//   cy.wait("@postME");
//   cy.contains("Your application has been registered");
//   cy.url().should("include", "ConfirmationPage");
// });
