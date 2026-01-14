describe('Mi primer test', () => {
  it('Visitando plataforma de imagenes', () => {
    cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/');
    cy.contains('Santiago');
   });
   
 it('Visitando plataforma de imagenes', () => {
    cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/');
    cy.contains('Buenos Aires').should('not.exist');
  });
});