import express from 'express';

import {

    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

//  create new product
router.post('/add', createProduct);

// get all products
router.get('/', getProducts);

// update product
router.put('/update/:id', updateProduct);

// delete product
router.delete('/delete/:id', deleteProduct);

export default router;