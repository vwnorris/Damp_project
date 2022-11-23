/// <reference types="cypress" />

describe('The Home Page', () => {
    it('successfully loads', () => {
      cy.visit('/') // change URL to match your dev URL
    })

    it('header contains title', () => {
        cy.visit('/') // change URL to match your dev URL

        cy.contains('DAMP')

        cy.contains('Filter')
      })

      it('click filter button', () => {
        cy.visit('/') // change URL to match your dev URL

        cy.get('[data-testid=filters]').click()

      })
  })