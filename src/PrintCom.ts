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

    updateProductProperty(sku: string, propertyName: string, options: string[]): void {
        const product = this.products[sku];
        if (!product) {
          throw new Error(`Product with SKU ${sku} does not exist.`);
        }
        const property = product.properties.find((prop) => prop.name === propertyName);
        if (!property) {
          throw new Error(`Property ${propertyName} does not exist for product with SKU ${sku}.`);
        }
        property.options = options.map((option) => ({ name: propertyName, value: option }));
    }

    removeProductProperty(sku: string, propertyName: string): void {
        const product = this.products[sku];
        if (!product) {
          throw new Error(`Product with SKU ${sku} does not exist.`);
        }
        product.properties = product.properties.filter((prop) => prop.name !== propertyName);
    }

    // User Story 3: Configure Product Pricing
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

    // User Story 4: Calculate Sales Price
    calculateSalesPrice(sku: string, propertyValues: { [key: string]: string }, copies: number): number {
        const product = this.products[sku];
        if (!product) {
            throw new Error(`Product with SKU ${sku} does not exist.`);
        }
        const config = product.configurations.find((conf) =>
            Object.entries(propertyValues).every(
                ([key, value]) => conf.properties[key] === value
            )
        );
        if (!config) {
            throw new Error(`No configuration found for the given property values.`);
        }
        const basePrice = config.purchaseCost * copies;
        const salesPrice = basePrice * (1 + config.margin / 100);
        return salesPrice;
    }

}  