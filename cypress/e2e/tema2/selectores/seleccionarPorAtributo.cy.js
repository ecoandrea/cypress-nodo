describe('Validando el formulario', () => {
    it('Validar que el label del botón es el esperado', () => {
        cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/');
        cy.get('[data-cy="boton_enviar"]').should('have.text', 'Enviar');
    })
})

describe('Validando el formulario', () => {
    it('Validar que el label del botón es el esperado', () => {
        cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/');
        cy.get('[type="submit"]').should('have.text', 'Enviar');
    })
})
    