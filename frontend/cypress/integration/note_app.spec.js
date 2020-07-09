describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cypress Testguy',
      username: 'cyptester',
      password: 'testPassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app 2020, created by Jason Wong')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('cyptester')
    cy.get('#password').type('testPassword')
    cy.get('#login-button').click()
    cy.contains('Cypress Testguy logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cyptester', password: 'testPassword' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#content').type('New note for Cypress testing')
      cy.get('#submit-new-note').click()
      cy.contains('New note for Cypress testing')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({ content: 'another note cypress', important: false })
      })

      it('can be made important', function() {
        cy.contains('another note cypress').parent().find('button').click()
        cy.contains('another note cypress').parent().find('button')
          .contains('Make not important')
      })
    })

    describe('and several notes exist', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'Make not important')
      })
    })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('Cypress Testguy')
    cy.get('#password').type('wrongPassword')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
    cy.get('.error')
      .contains('Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Cypress Testguy logged in')
  })
})