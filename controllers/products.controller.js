const { Categories } = require("../models/categories.models");
const { Products } = require("../models/products.models");
const { ProductImgs } = require("../models/productImgs.models");

const { catchAsync } = require("../utils/catchAsync.util");

const { uploadProductImgs, getAllProductImgs } = require("../utils/firebase.util");

const createCategory = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const category = await Categories.create({ name });

    res.status(200).json({
        status: "success",
        data: { category }
    });

});

const getAllCategories = catchAsync(async (req, res, next) => {
    const allCategories = await Categories.findAll({ where: { status: "active" } });

    res.status(200).json({
        status: "success",
        data: { allCategories }
    });

});

const updateCategory = (req, res, next) =>{
    const { category } = req;
    const { name } = req.body;

    category.update({ name });

    res.status(200).json({
        status: "success",
        data: { category }
    });
};

const createProduct = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const { title, description, quantity, price, categoryId } = req.body;

    const product = await Products.create({ title, description, quantity, price, categoryId, userId: sessionUser.id });

    await uploadProductImgs(req.files, product.id);

    res.status(200).json({
        status: "success",
        data: { product }
    });
});

const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Products.findAll({ where: { status: "active" }, include: [{ model: ProductImgs, required: false }]});

    const result = await getAllProductImgs(products);

    res.status(200).json({
        status: "success",
        data: { products: result }
    });

});

const getProductById = (req, res, next) => {

    const { product } = req;

    res.status(200).json({
        status: "success",
        data: { product }
    });
};

const updateProduct = catchAsync(async (req, res, next) => {
    const { product } = req;
    const { title, description, quantity, price } = req.body;

    product.update({title, description, quantity, price});

    res.status(200).json({
        status: "success",
        data: { product }
    });

});

const deleteProduct = (req, res, next) => {
    const { product } = req;

    product.update({ status: "inactive"});

    res.status(204).json({
        status: "success"
    });
};

module.exports = { createCategory, getAllCategories, updateCategory, createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };