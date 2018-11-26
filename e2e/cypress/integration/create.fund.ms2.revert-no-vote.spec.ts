/// <reference types="cypress"/>
import {
  loadWeb3,
  randomString,
  syncTimeWithEvm,
  increaseTime
} from "../helpers";
import { createDemoProposal, fundProposal, authenticateUser } from "../parts";

describe("create.fund.ms2.revert-no-vote", () => {
  const id = randomString();
  const title = `[${id}] e2e ms2 revert no-vote`;
  const amount = "1";

  afterEach(function() {
    if (this.currentTest.state === "failed") {
      //(Cypress as any).runner.stop();
      this.skip();
    }
  });

  it("authenticates and creates if necessary", () => {
    authenticateUser(cy, 0);
  });

  it("creates demo proposal", () => {
    createDemoProposal(cy, title, amount);
  });

  it("funds the proposal with 5th account", () => {
    fundProposal(cy, 5, 1);
    cy.get(".ProposalCampaignBlock-fundingOver", { timeout: 20000 }).contains(
      "Proposal has been funded"
    );
  });

  it("receives initial payout for milestone 1", () => {
    // MILESTONE 1
    syncTimeWithEvm(cy);
    cy.url().then(url => cy.visit(url, { onBeforeLoad: loadWeb3(0) }));
    cy.get(".MilestoneAction-top > div > .ant-btn", { timeout: 20000 }).click();
    cy.contains(
      ".MilestoneAction-top > div > .ant-btn",
      "Receive initial payout",
      { timeout: 20000 }
    ).click();
  });

  it("requests milestone 2 payout", () => {
    // MILESTONE 2
    cy.contains(
      ".MilestoneAction-top > div > .ant-btn",
      "Request milestone payout",
      { timeout: 20000 }
    ).click();
    cy.contains(".MilestoneAction-progress-text", "voted against payout", {
      timeout: 20000
    });
  });

  it("votes against milestone 2 payout as account 5 and then reverts the vote", () => {
    // NO VOTE... REVERT
    syncTimeWithEvm(cy);
    cy.url().then(url => cy.visit(url, { onBeforeLoad: loadWeb3(5) }));
    cy.contains(".ant-btn", "Vote against payout", { timeout: 20000 })
      .click()
      .should("have.class", "ant-btn-loading");
    cy.contains(".ant-btn", "Revert vote against payout", { timeout: 20000 })
      .click()
      .should("have.class", "ant-btn-loading");
    cy.contains(".ant-btn", "Vote against payout", { timeout: 20000 });
  });

  it("milestone 2 vote expires and payout is received", () => {
    // EXPIRE
    increaseTime(cy, 70000);
    // PAYOUT
    cy.url().then(url => cy.visit(url, { onBeforeLoad: loadWeb3(0) }));
    cy.contains(
      ".MilestoneAction-top > div > .ant-btn",
      "Receive milestone payout"
    ).click();
  });

  it("milestone 3 becomes active", () => {
    // MILESTONE 3
    cy.contains(
      ".MilestoneAction-top > div > .ant-btn",
      "Request milestone payout",
      { timeout: 20000 }
    );
  });
});
