describe('Affiliate Dashboard', () => {
  beforeEach(() => {
    cy.visit('/affiliate-networks')
  })

  it('displays the affiliate network dashboard', () => {
    cy.contains('Affiliate Network Dashboard').should('be.visible')
    cy.contains('Welcome, Test User!').should('be.visible')
  })

  it('displays network statuses', () => {
    cy.get('table').should('be.visible')
    cy.contains('Network').should('be.visible')
    cy.contains('Status').should('be.visible')
  })

  it('handles error states', () => {
    cy.intercept('GET', '**/affiliate-networks/status*', {
      statusCode: 500,
      body: 'Server error'
    })
    cy.reload()
    cy.contains('Failed to fetch network statuses').should('be.visible')
  })
})