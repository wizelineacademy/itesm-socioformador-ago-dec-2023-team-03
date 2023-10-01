describe('m5a2, implementacion cypress', () => {
  it('mostrar el html de un elemento', () => {
    cy.visit('localhost:3000')
    
    cy.get('button').invoke('html').then((val) => cy.task('log',val))
  })
})