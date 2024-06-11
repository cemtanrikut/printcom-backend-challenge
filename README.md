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

Here's an example of how to use the PrintCom class to manage products and calculate sales prices.

```typescript
import { PrintCom } from './src/PrintCom';

// Create an instance of PrintCom
const printCom = new PrintCom();

// Create a new product
printCom.createProduct('BUSINESS_CARD');

// Add properties to the product
printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
printCom.addProductProperty('BUSINESS_CARD', 'PaperType', ['Glossy', 'Matte']);

// Set product configuration
printCom.setProductConfiguration('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 0.5, 20);

// Calculate the sales price
const salesPrice = printCom.calculateSalesPrice('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 100);
console.log(`Sales Price: $${salesPrice.toFixed(2)}`);
```

## API Documentation

### PrintCom Class

Methods

- createProduct(sku: string): void

Creates a new product with the specified SKU.

- updateProductSKU(oldSku: string, newSku: string): void

Updates the SKU of an existing product.

- addProductProperty(sku: string, propertyName: string, options: string[]): void

Adds a property to a product.

- updateProductProperty(sku: string, propertyName: string, options: string[]): void

Updates a property of a product.

- removeProductProperty(sku: string, propertyName: string): void

Removes a property from a product.

- setProductConfiguration(sku: string, propertyValues: { [key: string]: string }, purchaseCost: number, margin: number): void

Sets the configuration for a product.

- calculateSalesPrice(sku: string, propertyValues: { [key: string]: string }, copies: number): number

Calculates the sales price for a product configuration based on the purchase cost, margin, and number of copies.

## Running Tests 

This project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```

### Example Tests

The tests are located in the tests/PrintCom.test.ts file and cover various functionalities of the PrintCom class.

```typescript
import { PrintCom } from '../src/PrintCom';

describe('PrintCom', () => {
  let printCom: PrintCom;

  beforeEach(() => {
    printCom = new PrintCom();
  });

  test('should create a product', () => {
    printCom.createProduct('BUSINESS_CARD');
    expect(printCom['products']['BUSINESS_CARD']).toBeDefined();
  });

  // Add more tests as needed...
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