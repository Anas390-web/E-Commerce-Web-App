import express from 'express'
import { createAndUpdateProduct, getUserCart, deleteProduct, clearUserCart } from '../controllers/cartItems.js';
const cartRouter = express.Router();

cartRouter.route('/').get(getUserCart).delete(clearUserCart)
cartRouter.route('/:productId').post(createAndUpdateProduct)
cartRouter.route('/:productId').delete(deleteProduct)

export default cartRouter