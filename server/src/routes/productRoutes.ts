import express from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

// Protected routes — admin only
router.post('/', protect, createProduct);
router.put('/:slug', protect, updateProduct);
router.delete('/:slug', protect, deleteProduct);

export default router;
