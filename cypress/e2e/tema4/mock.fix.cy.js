describe('Validando el backend', () => {

    beforeEach(() => {
        cy.visit('https://ecommerce-js-test.vercel.app/');
    });

    it('Validar presentación de productos', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            {
                statusCode: 200,
                fixture: 'productos.json'
            }
        ).as('productos');

        cy.wait('@productos');

        cy.contains('Laptop Pro').should('be.visible');
        cy.get('.product-card').should('have.length', 4);
    });

    it('Validar presentación de un producto', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            {
                body: [
                    {
                        id: "3",
                        "title": "Auriculares Bluetooth",
                        "price": 150,
                        "image": "https://m.media-amazon.com/images/I/61lX+a+vOFL.jpg",
                        "description": "Sonido inmersivo y cancelación de ruido."
                    }
                ]
            }
        ).as('unProducto');

        cy.wait('@unProducto');

        cy.contains('Bluetooth').should('be.visible');
        cy.get('.product-card').should('have.length', 1);
    });

    it('Validar presentación con backend caido', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            { statusCode: 500 }
        ).as('productos');

        cy.wait('@productos');

        cy.contains('Error: Error general de la API')
    });

    it('Validar presentación con producto no válido', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            { statusCode: 404 }
        ).as('productos');

        cy.wait('@productos');

        cy.contains('Error: Solicitud de consulta no válida')
    });

    it('Validar presentación con backend caido', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            { statusCode: 502 }
        ).as('productos');

        cy.wait('@productos');

        cy.contains('Error: Gateway caido')
    });

    it('Validar presentación con backend caido', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            { statusCode: 403 }
        ).as('productos');

        cy.wait('@productos');

        cy.contains('Error: Bad request')
    });

    it('Validando con lógica de respuesta', () => {
        cy.intercept('GET', '/products/*', (req) => {
            const productId = req.url.split('/').pop(); // Extraer el ID de la URL
            if (productId === '1') {
                req.reply({ statusCode: 404, body: { error: 'ID de producto inválido' } });
            } else {
                req.continue(); // Dejar pasar la solicitud real si el ID es válido
            }
        }).as('dynamicProductCheck');

        cy.get('#product_1').click();
        cy.wait('@dynamicProductCheck');
        cy.contains('Product Not found');
    });

    it('Validar caida de red', () => {
        cy.intercept('GET', 'https://fakestoreapi.com/products',
            {
                fixture: 'productos.json',
                forceNetworkError: true
            }
        ).as('productos');
        cy.log('Esperando caida de red');
        cy.wait('@productos');

        cy.contains('Error: Failed to fetch');
    });
});