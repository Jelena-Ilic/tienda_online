const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

describe('Api de products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app)
                .get('/api/products')
                .send();
        });

        it('debería devolver status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('debería devolver la respuesta en formato JSON', () => {
            expect(response.headers['content-type'])
                .toContain('application/json')
        });

        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });










    describe('POST /api/products', () => {

        let response;
        const newProduct = { name: 'Producto de prueba', description: 'Esto es para probar', price: 100, category: 'test', available: true, stock: 10, image: 'url de la imagen' };
        beforeAll(async () => {
            response = await request(app)
                .post('/api/products')
                .send(newProduct);
        });

        it('debería existir la URL en la aplicación', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto devuelto debería tener _id', () => {
            expect(response.body._id).toBeDefined();
        });

    });












});