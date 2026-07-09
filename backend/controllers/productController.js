import product from '../models/product.js';

// create new product
export const createProduct = async (req, res) => {
  try {
    const product = await product.create(req.body);
    res.json({ message: 'Product created successfully', product });
  }
  catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
}

//   get all products

export const getProducts = async (req, res) => {
    try {
        const products = await product.find().sort({ createdAt: -1 });
        res.json({ message: 'Products fetched successfully', products });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
}

// update all products
export const updateProduct = async (req, res) => {
    try {
        const updated = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Product updated successfully', updated });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
}

// delete product
export const deleteProduct = async (req, res) => {
    try {   
        await product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'server error', error });
    }
} 