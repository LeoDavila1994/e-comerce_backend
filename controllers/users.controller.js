const { Users } = require("../models/users.models");

const { catchAsync } = require("../utils/catchAsync.util");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const { AppError } = require("../utils/appError.util");

const createUser = catchAsync(async (req, res, next) => {

        const { userName, email, password } = req.body;

        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            userName,
            email,
            password: hashedPassword
        });

        newUser.password = undefined;

        res.status(200).json({
            status: "success",
            data: {
                newUser
            }
        });
    });

    const login = catchAsync( async (req, res, next) => {
        const { email, password } = req.body;

        const user = await Users.findOne({
            where: { email, status: "active" }
        });

        if(!user || !(await bcrypt.compare(password, user.password))){
            return next(new AppError("Invalid credentials", 400));
        }

        user.password = undefined;

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "365d"});

        res.status(200).json({
            status: "success",
            data: {
                user,
                token
            }
        });

    });

    const updateUser = catchAsync(async (req, res, next) => {
        const { userName, email } = req.body;

        const { user } = req;

        await user.update({userName, email});

        res.status(200).json({
            status: "success",
            data: { user }
        });

    });

    const deleteUser = catchAsync(async (req, res, next) => {
        const { sessionUser } = req;

        await sessionUser.update({ status: "inactive" });

        res.status(204).json({
            status: "success"
        });
    });


module.exports = { createUser, login, updateUser, deleteUser };

