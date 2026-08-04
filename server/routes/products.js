import express from 'express'
import { getAllProducts, getFilteredOrAllProducts } from '../controllers/callbacks.js';

const router = express.Router();

// router.route('/').get(getAllProducts)
router.route('/').get(getFilteredOrAllProducts)

export default router