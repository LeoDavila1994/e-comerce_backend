const { Users } = require("../models/users.models");

const { catchAsync } = require("../utils/catchAsync.util");

const { AppError } = require("../utils/appError.util");

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync( async (req, res, next) => {

    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new AppError("Invalid session", 403));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({
        where: {id: decode.id, status: "active"}
    });

    if(!user){
        return next(new AppError('The owner of the session is no longer active', 403));
    }

    req.sessionUser = user;

    next()

});

const protectUsersAccount = (req, res, next) => {
    const { sessionUser, user } = req;

    if (sessionUser.id !== user.id) {
        return next(new AppError('You are not the owner of this account', 403));
    }

    next();
};

const protectUserProduct = (req, res, next) => {
    const { sessionUser, product } = req;

    if(sessionUser.id !== product.userId){
        return next(new AppError("You are not the owner of this product", 403));
    }

    next()
}

module.exports = { protectSession, protectUsersAccount, protectUserProduct };