"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySlug = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};
exports.getProducts = getProducts;
// Get a single product by slug
const getProductBySlug = async (req, res) => {
    try {
        const product = await Product_1.default.findOne({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
exports.getProductBySlug = getProductBySlug;
// Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product_1.default(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};
exports.createProduct = createProduct;
// Update a product by slug
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product_1.default.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};
exports.updateProduct = updateProduct;
// Delete a product by slug
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product_1.default.findOneAndDelete({ slug: req.params.slug });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
exports.deleteProduct = deleteProduct;
