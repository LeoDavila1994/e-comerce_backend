const express = require("express");

const cartRoute = express.Router();


const { protectSession } = require("../middlewares/auth.middlewares");

const { addProductValidator, updateProductInCartValidator } = require("../middlewares/validators.middlewares");

const { activeCart, productExist, productExistInCart, stockAvailable, findProductInCart, stockAvailableToUpdate, productToDelete, productsToPurhcase, stockDiscountToProducts, removProductsPurchased } = require("../middlewares/cart.middlewares");

const { addProduct, updateProductInCart, deleteProductToCart, purchaseDone } = require("../controllers/cart.controller");

cartRoute.use(protectSession);

cartRoute.post("/add-product", addProductValidator, activeCart, productExist, productExistInCart, stockAvailable, addProduct);

cartRoute.patch("/update-cart", updateProductInCartValidator, activeCart, findProductInCart, stockAvailableToUpdate, updateProductInCart);

cartRoute.delete("/:productId", activeCart, productToDelete, deleteProductToCart);

cartRoute.post("/purchase", activeCart, productsToPurhcase, stockDiscountToProducts, removProductsPurchased, purchaseDone);

module.exports = { cartRoute };
