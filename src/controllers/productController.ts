import { Request, Response } from 'express';
import productService from '../services/productService';

export const createProduct = (req: Request, res: Response): void => {
  const { sku } = req.body;
  try {
    productService.createProduct(sku);
    res.status(201).send({ message: 'Product created successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export const addProductProperty = (req: Request, res: Response): void => {
    const { sku } = req.params;
    const { propertyName, options } = req.body;
    try {
      productService.addProductProperty(sku, propertyName, options);
      res.status(200).send({ message: 'Property added successfully' });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };