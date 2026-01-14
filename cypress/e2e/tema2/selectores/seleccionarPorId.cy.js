describe('Validando el formulario de contacto', () => {
    it('Validar que este la caja de mensaje', () => {
        cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/contacto.html');
        cy.get('#mensaje');
    })
});
