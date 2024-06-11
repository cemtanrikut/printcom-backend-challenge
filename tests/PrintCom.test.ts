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

  test('should throw an error when creating a product with an existing SKU', () => {
    printCom.createProduct('BUSINESS_CARD');
    expect(() => printCom.createProduct('BUSINESS_CARD')).toThrowError(
      'Product with SKU BUSINESS_CARD already exists.'
    );
  });

  test('should update product SKU', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.updateProductSKU('BUSINESS_CARD', 'NEW_BUSINESS_CARD');
    expect(printCom['products']['NEW_BUSINESS_CARD']).toBeDefined();
    expect(printCom['products']['BUSINESS_CARD']).toBeUndefined();
  });

  test('should add product property', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
    expect(printCom['products']['BUSINESS_CARD'].properties).toHaveLength(1);
  });

  test('should update product property', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
    printCom.updateProductProperty('BUSINESS_CARD', 'Size', ['A6', 'A7']);
    expect(printCom['products']['BUSINESS_CARD'].properties[0].options).toEqual([
      { name: 'Size', value: 'A6' },
      { name: 'Size', value: 'A7' },
    ]);
  });

  test('should remove product property', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
    printCom.removeProductProperty('BUSINESS_CARD', 'Size');
    expect(printCom['products']['BUSINESS_CARD'].properties).toHaveLength(0);
  });

  test('should set product configuration', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
    printCom.addProductProperty('BUSINESS_CARD', 'PaperType', ['Glossy', 'Matte']);
    printCom.setProductConfiguration('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 0.5, 20);
    expect(printCom['products']['BUSINESS_CARD'].configurations).toHaveLength(1);
  });

  test('should calculate sales price correctly', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
    printCom.addProductProperty('BUSINESS_CARD', 'PaperType', ['Glossy', 'Matte']);
    printCom.setProductConfiguration('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 0.5, 20);
    const salesPrice = printCom.calculateSalesPrice('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 100);
    expect(salesPrice).toBe(60); // (0.5 * 100) * (1 + 20/100) = 50 * 1.2 = 60
  });

  test('should throw error for non-existent product SKU', () => {
    expect(() => printCom.calculateSalesPrice('NON_EXISTENT', { Size: 'A5', PaperType: 'Glossy' }, 100)).toThrowError(
      'Product with SKU NON_EXISTENT does not exist.'
    );
  });

  test('should throw error for non-existent configuration', () => {
    printCom.createProduct('BUSINESS_CARD');
    printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
    printCom.addProductProperty('BUSINESS_CARD', 'PaperType', ['Glossy', 'Matte']);
    expect(() => printCom.calculateSalesPrice('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 100)).toThrowError(
      'No configuration found for the given property values.'
    );
  });
});