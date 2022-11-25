const { body, validationResult } = require("express-validator");

const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(err => {
            return err.msg
        });

        const message = errorMessages.join(". ");

        return next(new AppError(message, 400))
    }

    next();
};

const createUserValidator = [
    body('userName')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be a least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be a least 8 characters'),
    checkValidations,
];

const loginValidator = [
    body('email').isEmail().withMessage('Must provide a valid email'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isLength({ min: 8 })
        .withMessage('Password must be a least 8 characters'),
    checkValidations,
];

const updateUserValidator = [
    body('userName')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isLength({ min: 3 })
        .withMessage('Name must be a least 3 characters'),
    body('email').isEmail().withMessage('Must provide a valid email'),
    checkValidations
];

const createProductValidator = [
    body("title")
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("description")
        .isString()
        .withMessage("Description must be a string")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    body("quantity")
        .isInt()
        .withMessage("Quantity most be a integer number"),
    body("price")
        .isDecimal()
        .withMessage("Price must be a number"),
    body("categoryId")
        .isInt()
        .withMessage("The category ID most be a integer number"),
    checkValidations
];

const productUpdateValidator = [
    body("title")
        .isString()
        .withMessage("Title must be a string")
        .notEmpty()
        .withMessage("Title cannot be empty"),
    body("description")
        .isString()
        .withMessage("Description must be a string")
        .notEmpty()
        .withMessage("Description cannot be empty"),
    body("quantity")
        .isInt()
        .withMessage("Quantity most be a integer number"),
    body("price")
        .isDecimal()
        .withMessage("Price must be a number"),
    checkValidations
];

const addProductValidator = [
    body("productId")
        .isInt()
        .withMessage("Product ID most be a integer number"),
    body("quantity")
        .isInt()
        .withMessage("Quantity most be a integer number"),
    checkValidations
];

const updateProductInCartValidator = [
    body("productId")
        .isInt()
        .withMessage("Product ID most be a integer number"),
    body("newQty")
        .isInt()
        .withMessage("Quantity most be a integer number"),
    checkValidations
];

module.exports = { createUserValidator, loginValidator, updateUserValidator, createProductValidator, productUpdateValidator, addProductValidator, updateProductInCartValidator };