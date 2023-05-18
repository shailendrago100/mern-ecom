const express = require('express');

const { addProduct, updateProduct, deleteProduct, getProduct, getProducts } = require('../controllers/product');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');

const router = express.Router();

// POST => /api/products
// router.post('/admin/add', addProduct);
router.route("/admin/add").post(addProduct);
router.route("/admin/delete/:id").delete(deleteProduct);
router.route("/admin/update/:id").put(updateProduct);


// PATCH => /api/products/:id
router.route("/admin/update/:id").put(updateProduct);

// DELETE => /api/products/:id
// router.delete('/:id', verifyTokenAndAdmin, deleteProduct);

// GET => /api/products/:id
router.get('/:id', getProduct);

// GET => /api/products
router.get('/', getProducts);
module.exports = router;