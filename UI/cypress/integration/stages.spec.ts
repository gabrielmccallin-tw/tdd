import { formDataCheat } from "../../src/components/stages/FormData";

describe("stages", () => {
  const baseUrl = "http://localhost:3000";

  const getInputField = (stageIndex: number, fieldIndex: number) => {
    return cy.get(
      'input[data-id="' + formDataCheat[stageIndex].fields[fieldIndex].id + '"]'
    );
  };

  const allFields = (stageIndex: number) => {
    formDataCheat[stageIndex].fields.forEach((field) => {
      cy.get('input[id="' + field.id + '"]').then(($input) => {
        if ($input[0]["value"].length == 0)
          cy.get('input[data-id="' + field.id + '"]').type(
            "Cypress" + field.label
          );
      });
    });
    cy.get('button[id="nextButton"]').click();
  };

  const generateResponseObj = () => {
    let obj = {brokerDetails:[]};
    formDataCheat.forEach((section, index) => {
      section.fields.forEach((field) => {
        if(!obj.brokerDetails[index]){
          obj.brokerDetails[index] = {};
        }
        obj.brokerDetails[index][field.id] = "Cypress " + field.label;
      });
    });
    return obj;
  };

  beforeEach(() => {
    let obj = generateResponseObj();
    cy.server();

    cy.route({
      url: "/api/BrokerDetails",
      response: JSON.stringify({ woah: "there" }),
      status: 200,
      method: "POST",
    }).as("postME");

    cy.route({
      url: "/api/BrokerDetails",
      response: JSON.stringify(obj),
      status: 200,
      method: "GET",
    }).as("getMe");
    cy.visit(baseUrl);
  });

  it("should have the same value with response", () => {
    cy.wait("@getMe");

    formDataCheat[0].fields.forEach((field) => {
      const value = "Cypress " + field.label;
      cy.get('input[id="' + field.id + '"]').should("have.value", value);
      cy.get('input[id="' + field.id + '"]').should(($p) => {
        expect($p[0]["value"].trim().length).to.not.eq(0);
      });
    });
  });

  it("should not proceed to next stage, required field is not filled out", () => {
    // for (let index = 0; index < formDataCheat.length-2; index++) {
    //     getInputField(0, index).type('Cypress');
    // }
    cy.wait("@getMe");

    let mandatoryField = formDataCheat[0].fields.filter(
      (x) => x.mandatory === true
    );
    if (mandatoryField.length > 0) {
      cy.get('input[data-id="' + mandatoryField[0].id + '"]').clear();
    }
    cy.get('button[id="nextButton"]').click();
    cy.get('input[data-id="' + formDataCheat[0].fields[0].id + '"]').should(
      "exist"
    );
  });

  it("should proceed to next stage, all required fields are filled out", () => {
    // for (let index = 0; index < formDataCheat.length-1; index++) {
    //     getInputField(0, index).type('Cypress');
    // }
    cy.get('button[id="nextButton"]').click();
    // cy.wait('@postME');
    cy.get('input[data-id="' + formDataCheat[1].fields[0].id + '"]').should(
      "exist"
    );
  });

  it("should proceed to confirmation", () => {
    allFields(0);
    allFields(1);
    allFields(2);
    // allFields(3);

    cy.wait("@postME");
    cy.contains("Your application has been registered");
    cy.url().should("include", "ConfirmationPage");
  });
});
