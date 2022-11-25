const { Carts } = require("../models/carts.models");
const { ProductsInCart } = require("../models/productsInCart.models");
const { Products } = require("../models/products.models");

const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const activeCart = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    const cart = await Carts.findOne({ where: { userId: sessionUser.id, status: "active" } });

    if(!cart){

        const newCart = await Carts.create({ userId: sessionUser.id });

        req.cart = newCart;

        next()

    } else {

        req.cart = cart;

        next();
    }
});

const productExist = catchAsync(async (req, res, next) => {

    const { productId } = req.body;

    const product = await Products.findOne({ where: { id: productId, status: "active" } });

    if(!product){
        return next(new AppError(`The product with ID: ${ productId } dont exist or your status is inactive or sold out`), 404);
    }

    req.product = product;

    next();

});

const productExistInCart = catchAsync(async (req, res, next) => {

    const { cart, product } = req;

    const productInCart = await ProductsInCart.findOne({ where: { productId: product.id, cartId: cart.id } });

    if(productInCart && productInCart.status === "active"){
        return next(new AppError("This product exist in your cart now", 404));
    }

    req.productInCart = productInCart;

    next();

});

const stockAvailable = catchAsync(async (req, res, next) => {

    const { product } = req;
    const { quantity } = req.body;

    if(product.quantity < quantity){
        return next(new AppError(`The stock available for this product is to ${product.quantity} units`), 404);
    }

    next();

});

const findProductInCart = catchAsync(async (req, res, next) => {
    const { cart } = req;
    const { productId } = req.body;

    const product = await ProductsInCart.findOne({ where: { cartId: cart.id, productId, status: "active" } });

    if(!product){
        return next(new AppError("This product dont exist in your cart"));
    }

    req.product = product;

    next();

});

const stockAvailableToUpdate = catchAsync(async(req, res, next) => {
    const { product } = req;
    const { newQty } = req.body;

    const productInStock = await Products.findOne({ where: { id: product.productId, status: "active" } });

    if(productInStock.quantity < newQty){
        return next(new AppError(`The stock available for this product is to ${ productInStock.quantity } units`, 404))
    }

    next();
});

const productToDelete = catchAsync(async(req, res, next) => {
    const { productId } = req.params;
    const { cart } = req;

    const product = await ProductsInCart.findOne({ where: { cartId: cart.id, productId, status: "active" } });

    if(!product){
        return next(new AppError(`The product with ID: ${productId} dont exist in the cart or your status is inactive or removed`));
    };

    req.product = product;

    next();

});

const productsToPurhcase = catchAsync(async(req, res, next) => {
    const { cart } = req;

    const productsList = await ProductsInCart.findAll({ where: {cartId: cart.id, status: "active" } });

    if(!productsList[0]){
        return next(new AppError(`The cart with ID: ${cart.id}  is empty`, 400));
    }

    req.productsList = productsList;

    next();
});

const stockDiscountToProducts = catchAsync(async(req, res, next) => {
    const { productsList } = req;

    const totalsPromises = productsList.map(async prod => {

        const product = await Products.findOne({ where: { id: prod.productId, status: "active" } });

        let result = prod.quantity * product.price;

        const qty = product.quantity - prod.quantity;

        product.update({ quantity: qty });

        if(product.quantity === 0){
            product.update({ status: "sold out" });
        }

        return result;
    });

    const totals = await Promise.all(totalsPromises);

    let finalTotal = 0;

    for(let i = 0; i < totals.length; i++){
        finalTotal += totals[i];
    }

    req.finalTotal = finalTotal;

    next();

});

const removProductsPurchased = catchAsync(async (req, res, next) => {
    const { productsList } = req;

    productsList.map(async prod => {
        const product = await ProductsInCart.findOne({ where: { id: prod.id } });

        product.update({ status: "purchased" });
    });

    next();
});

module.exports = { activeCart, productExist, productExistInCart, stockAvailable, findProductInCart, stockAvailableToUpdate, productToDelete, productsToPurhcase, stockDiscountToProducts, removProductsPurchased };