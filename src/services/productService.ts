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

      // set product config
      setProductConfiguration(
        sku: string,
        propertyValues: { [key: string]: string },
        purchaseCost: number,
        margin: number
        ): void {
            const product = this.products[sku];
            if (!product) {
            throw new Error(`Product with SKU ${sku} does not exist.`);
        }
        product.configurations.push({ properties: propertyValues, purchaseCost, margin });
      }

      calculateSalesPrice(sku: string, propertyValues: { [key: string]: string }, copies: number): number {
        const product = this.products[sku];
        if (!product) {
            throw new Error(`Product with SKU ${sku} does not exist.`);
        }
        const config = product.configurations.find((conf) =>
        Object.entries(propertyValues).every(
            ([key, value]) => conf.properties[key] === value)
        );
        if (!config) {
            throw new Error(`No configuration found for the given property values.`);
        }
        const basePrice = config.purchaseCost * copies;
        const salesPrice = basePrice * (1 + config.margin / 100);
        return salesPrice;
      }
}

export default new ProductService();