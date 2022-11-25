const express = require("express");

const usersRoute = express.Router();

const { createUserValidator, loginValidator, updateUserValidator } = require("../middlewares/validators.middlewares");

const { createUser, login, updateUser, deleteUser } = require("../controllers/users.controller");

const { protectSession, protectUsersAccount } = require("../middlewares/auth.middlewares");

const { userExist } = require("../middlewares/users.middlewares");

usersRoute.post("/", createUserValidator, createUser);

usersRoute.post("/login", loginValidator, login);

usersRoute.use(protectSession);

usersRoute.patch("/:id", updateUserValidator, userExist, protectUsersAccount, updateUser);

usersRoute.delete("/:id", userExist, protectUsersAccount, deleteUser);



module.exports = { usersRoute };