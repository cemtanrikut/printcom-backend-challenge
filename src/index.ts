import { PrintCom } from './PrintCom';

// Example Usage
const printCom = new PrintCom();
printCom.createProduct('BUSINESS_CARD');
printCom.addProductProperty('BUSINESS_CARD', 'Size', ['A5', 'A4']);
printCom.addProductProperty('BUSINESS_CARD', 'PaperType', ['Glossy', 'Matte']);
printCom.setProductConfiguration('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 0.5, 20);
const salesPrice = printCom.calculateSalesPrice('BUSINESS_CARD', { Size: 'A5', PaperType: 'Glossy' }, 100);
console.log(`Sales Price: $${salesPrice.toFixed(2)}`);