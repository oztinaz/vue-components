// https://on.cypress.io/api

describe('Home page', () => {
  it('visits the home url', () => {
    cy.visit('/')
    cy.contains('div', 'Home View')
  })
})
