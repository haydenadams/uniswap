import { TEST_ADDRESS } from '../support/commands'

describe('Landing Page', () => {
  beforeEach(() => cy.visit('/'))
  it('loads exchange page', () => {
    cy.get('#exchangePage')
  })

  it('redirects to url /swap', () => {
    cy.url().should('include', '/swap')
  })

  it('allows navigation to send', () => {
    cy.get('#send-navLink').click()
    cy.url().should('include', '/send')
  })

  it('allows navigation to pool', () => {
    cy.get('#pool-navLink').click()
    cy.url().should('include', '/pool')
  })

  it('is connected', () => {
    cy.get('#web3-status-connected').click()
    cy.get('#web3-account-identifier-row').contains(TEST_ADDRESS)
  })
})
