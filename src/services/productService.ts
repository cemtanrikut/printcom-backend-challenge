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
}