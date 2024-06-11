import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productRoutes);

export default app;