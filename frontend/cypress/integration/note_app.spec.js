describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app 2020, created by Jason Wong')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('Jenny')
    cy.get('#password').type('myPassword')
    cy.get('#login-button').click()
    cy.contains('Smith logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('Jenny')
      cy.get('#password').type('myPassword')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#content').type('New note for Cypress testing')
      cy.get('#submit-new-note').click()
      cy.contains('New note for Cypress testing')
    })
  })
})