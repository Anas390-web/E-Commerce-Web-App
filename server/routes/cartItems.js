import express from 'express'
import { createProduct, getProduct, deleteProduct } from '../controllers/cartItems.js';
const cartRouter = express.Router();

cartRouter.route('/').post(createProduct)
cartRouter.route('/:productId').get(getProduct).delete(deleteProduct)

export default cartRouter