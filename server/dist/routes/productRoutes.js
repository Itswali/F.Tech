"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.get('/', productController_1.getProducts);
router.get('/:slug', productController_1.getProductBySlug);
// Protected routes — admin only
router.post('/', authMiddleware_1.protect, productController_1.createProduct);
router.put('/:slug', authMiddleware_1.protect, productController_1.updateProduct);
router.delete('/:slug', authMiddleware_1.protect, productController_1.deleteProduct);
exports.default = router;
