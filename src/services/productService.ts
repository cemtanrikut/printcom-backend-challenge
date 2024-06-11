import { Product, ProductConfiguration, ProductProperty } from '../models/product';

export class ProductService {
    private products: { [sku: string]: Product } = {};

    // create product service
    createProduct(sku: string): void {
        if (this.products[sku]) {
          throw new Error(`Product with SKU ${sku} already exists.`);
        }
        this.products[sku] = {
          sku,
          properties: [],
          configurations: [],
        };
      }

      // add product prop service
      addProductProperty(sku: string, propertyName: string, options: string[]): void {
        const product = this.products[sku];
        if (!product) {
            throw new Error(`Product with SKU ${sku} does not exist.`);
        }            
        product.properties.push({
            name: propertyName,
            options: options.map((option) => ({ name: propertyName, value: option })),
        });
      }



}