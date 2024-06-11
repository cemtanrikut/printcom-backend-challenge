import request from 'supertest';
import app from '../src/app';

describe('Product API', () => {
  test('should create a product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ sku: 'BUSINESS_CARD' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Product created successfully');
  });

  test('should add a product property', async () => {
    await request(app)
      .post('/api/products')
      .send({ sku: 'BUSINESS_CARD' });
    const response = await request(app)
      .post('/api/products/BUSINESS_CARD/properties')
      .send({ propertyName: 'Size', options: ['A5', 'A4'] });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Property added successfully');
  });

  test('should set product configuration', async () => {
    await request(app)
      .post('/api/products')
      .send({ sku: 'BUSINESS_CARD' });
    const response = await request(app)
      .post('/api/products/BUSINESS_CARD/configurations')
      .send({
        propertyValues: { Size: 'A5', PaperType: 'Glossy' },
        purchaseCost: 0.5,
        margin: 20
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Configuration set successfully');
  });

  test('should calculate sales price', async () => {
    await request(app)
      .post('/api/products')
      .send({ sku: 'BUSINESS_CARD' });
    await request(app)
      .post('/api/products/BUSINESS_CARD/properties')
      .send({ propertyName: 'Size', options: ['A5', 'A4'] });
    await request(app)
      .post('/api/products/BUSINESS_CARD/configurations')
      .send({
        propertyValues: { Size: 'A5', PaperType: 'Glossy' },
        purchaseCost: 0.5,
        margin: 20
      });
    const response = await request(app)
      .get('/api/products/BUSINESS_CARD/price')
      .send({
        propertyValues: { Size: 'A5', PaperType: 'Glossy' },
        copies: 100
      });
    expect(response.status).toBe(200);
    expect(response.body.salesPrice).toBe(60);
  });
});
