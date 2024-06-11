type ProductOption = {
    name: string;
    value: string;
  };
  
  type ProductProperty = {
    name: string;
    options: ProductOption[];
  };
  
  type ProductConfiguration = {
    properties: { [key: string]: string };
    purchaseCost: number;
    margin: number;
  };
  
  type Product = {
    sku: string;
    properties: ProductProperty[];
    configurations: ProductConfiguration[];
  };


class PrintCom {
    private products: { [sku: string]: Product } = {}; // In-memory data store for products
  
    // User Story 1: Manage Products
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

    updateProductSKU(oldSku: string, newSku: string): void {
        if (!this.products[oldSku]) {
          throw new Error(`Product with SKU ${oldSku} does not exist.`);
        }
        if (this.products[newSku]) {
          throw new Error(`Product with SKU ${newSku} already exists.`);
        }
        this.products[newSku] = { ...this.products[oldSku], sku: newSku };
        delete this.products[oldSku];
      }

    // User Story 2: Define Product Properties
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