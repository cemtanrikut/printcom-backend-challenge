import { Request, Response } from 'express';
import productService from '../services/productService';

export const createProduct = (req: Request, res: Response): void => {
    const { sku } = req.body;
    try {
        productService.createProduct(sku);
        res.status(201).send({ message: 'Product created successfully' });
    } catch (error) {
        res.status(400).send({ error: 'Unknown error occurred' });
    }
};

export const addProductProperty = (req: Request, res: Response): void => {
    const { sku } = req.params;
    const { propertyName, options } = req.body;
    try {
      productService.addProductProperty(sku, propertyName, options);
      res.status(200).send({ message: 'Property added successfully' });
    } catch (error) {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
};

export const setProductConfiguration = (req: Request, res: Response): void => {
    const { sku } = req.params;
    const { propertyValues, purchaseCost, margin } = req.body;
    try {
      productService.setProductConfiguration(sku, propertyValues, purchaseCost, margin);
      res.status(200).send({ message: 'Configuration set successfully' });
    } catch (error) {
      res.status(400).send({ error: 'Unknown error occurred' });
    }
};

export const calculateSalesPrice = (req: Request, res: Response): void => {
    const { sku } = req.params;
    const { propertyValues, copies } = req.body;
    try {
        const salesPrice = productService.calculateSalesPrice(sku, propertyValues, copies);
        res.status(200).send({ salesPrice });
    } catch (error) {
        res.status(400).send({ error: 'Unknown error occurred' });
    }
};