describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('passes', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Login Page')

    cy.contains('login').click()
  })
})