export type ProductOption = {
    name: string;
    value: string;
  };
  
  export type ProductProperty = {
    name: string;
    options: ProductOption[];
  };
  
  export type ProductConfiguration = {
    properties: { [key: string]: string };
    purchaseCost: number;
    margin: number;
  };
  
  export type Product = {
    sku: string;
    properties: ProductProperty[];
    configurations: ProductConfiguration[];
  };