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