describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  it('goes to login page & clicks login', () => {
    cy.visit('http://localhost:8080')

    cy.contains('Login Page')

    cy.contains('login').click()
  })

  it('fails', () => {
    expect(false).to.equal(true)
  })
})