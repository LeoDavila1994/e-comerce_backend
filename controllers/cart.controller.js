const { ProductsInCart } = require("../models/productsInCart.models");
const { Orders } = require("../models/orders.models");

const { catchAsync } = require("../utils/catchAsync.util");

const addProduct = catchAsync(async (req, res, next) => {
    const { productInCart, cart } = req;
    const { productId, quantity } = req.body;

    let product;

    if(productInCart && productInCart.status === "removed"){
        product = await productInCart.update({ status: "active", quantity });
    } else if(!productInCart){
        product = await ProductsInCart.create({ productId, cartId: cart.id, quantity });
    }

    res.status(200).json({
        status: "success",
        data: { product }
    });

});

const updateProductInCart = (req, res, next) => {
    const { product } = req;
    const { newQty } = req.body;

    if(newQty === 0){
        product.update({ quantity: newQty, status: "removed" });

        res.status(200).json({
            status: "success",
            data:{ product }
        });
    } else {
        product.update({ quantity: newQty });

        res.status(200).json({
            status: "success",
            data: { product }
        });
    }
};

const deleteProductToCart = (req, res, next) =>{
    const { product } = req;

    product.update({ quantity: 0, status: "removed" });

    res.status(200).json({
        status: "success",
        data: { product }
    });
}

const purchaseDone = catchAsync(async (req, res, next) => {
    const { cart, finalTotal } = req;

    total = Number(finalTotal);

    const order = await Orders.create({ cartId: cart.id, userId: cart.userId, totalPrice: total });

    cart.update({ status: "purchase" });

    res.status(200).json({
        status: "success",
        data: { cart },
        order: { order }
    });
});

module.exports = { addProduct, updateProductInCart, deleteProductToCart, purchaseDone };