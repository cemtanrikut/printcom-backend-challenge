# PrintCom Backend Challenge

This repository contains the implementation for the PrintCom backend challenge. The project is written in TypeScript and demonstrates managing products, defining properties, configuring pricing, and calculating sales prices for a hypothetical printing company.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/your-username/printcom-backend-challenge.git
cd printcom-backend-challenge
npm install
```

## Usage

To start the server, use the following command:

```bash
npm run dev
```

## API Documentation

### Endpoints

POST /api/products

Create a new product.

#### Request Body:

```json
{
  "sku": "BUSINESS_CARD"
}
```

#### Response

```json
{
  "message": "Product created successfully"
}
```

POST /api/products/:sku/properties

Add a property to a product.

#### Request Body:

```json
{
  "propertyName": "Size",
  "options": ["A5", "A4"]
}
```

#### Response

```json
{
  "message": "Property added successfully"
}
```

POST /api/products/:sku/configurations

Set a configuration for a product.

#### Request Body

```json
{
  "propertyValues": { "Size": "A5", "PaperType": "Glossy" },
  "purchaseCost": 0.5,
  "margin": 20
}
```

#### Response

```json
{
  "message": "Configuration set successfully"
}
```

GET /api/products/:sku/price

Calculate the sales price for a product configuration and quantity.

#### Request Params:

```json
{
  "propertyValues": { "Size": "A5", "PaperType": "Glossy" },
  "copies": 100
}
```

#### Response

```json
{
  "salesPrice": 60
}
```

## Running Tests 

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```

### Example Tests

The tests are located in the tests/ directory and cover various functionalities of the REST API.

```typescript
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
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you would like to contribute to this project.

1. Fork the repository
2. Create your feature branch (git checkout -b feature/my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin feature/my-new-feature)
5. Create a new Pull Request

## Licence

[MIT](https://choosealicense.com/licenses/mit/)