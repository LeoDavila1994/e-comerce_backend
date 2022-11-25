const { Categories } = require("../models/categories.models");
const { Products } = require("../models/products.models");

const { catchAsync } = require("../utils/catchAsync.util");

const { AppError } = require("../utils/appError.util");

const categoryExist = catchAsync(async (req, res, next) => {
    const { name } = req.body;

    const category = await Categories.findOne({ where: { name } });

    if(category){
        return next(new AppError("The category with this name exist!", 404))
    }

    next();

});

const categoryExistById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const category = await Categories.findOne({ where: { id } });

    if(!category){
        return next(new AppError(`The category with ID: ${id} dont exist or your status is inactive`))
    }

    req.category = category;

    next()

});

const categoryExistToCreateProduct = catchAsync(async (req, res, next) =>{
    const { categoryId } = req.body;

    const category = await Categories.findOne({ where: { id: categoryId } });

    if(!category){
        return next(new AppError(`The category with ID: ${categoryId} dont exist! if you want to add a product in this category first create te category`))
    }

    next();

});

const productExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Products.findOne({ where: {status: "active", id} });

    if(!product){
        return next(new AppError(`The product with ID: ${id} dont exist or your status is inactive`))
    }

    req.product = product;

    next()

});

module.exports = { categoryExist, categoryExistById, categoryExistToCreateProduct, productExist };