const express = require("express");

const productsRoute = express.Router();

const { protectSession, protectUserProduct } = require("../middlewares/auth.middlewares");

const { categoryExist, categoryExistById, productExist, categoryExistToCreateProduct } = require("../middlewares/products.middleware");

const { createCategory, getAllCategories, updateCategory, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/products.controller");

const { createProductValidator, productUpdateValidator } = require("../middlewares/validators.middlewares");

const { upload } = require("../utils/multer.utils");

productsRoute.get("/categories", getAllCategories);

productsRoute.get("/", getAllProducts);

productsRoute.get("/:id", productExist, getProductById);

productsRoute.use(protectSession);

productsRoute.post("/categories",categoryExist, createCategory);

productsRoute.patch("/categories/:id", categoryExistById, updateCategory);

productsRoute.post("/",  upload.array("productImgs", 3), categoryExistToCreateProduct, createProduct);

productsRoute.patch("/:id", productUpdateValidator, productExist, protectUserProduct, updateProduct);

productsRoute.delete("/:id", productExist, protectUserProduct, deleteProduct);

module.exports = { productsRoute };