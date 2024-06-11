import { Router } from 'express';
import {
    createProduct,
    addProductProperty,
    setProductConfiguration,
    calculateSalesPrice
} from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.post('/:sku/properties', addProductProperty);
router.post('/:sku/configurations', setProductConfiguration);
router.get('/:sku/price', calculateSalesPrice);

export default router;
