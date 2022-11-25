const express = require("express");

const app = express();

app.use(express.json());

const { usersRoute } = require("./routes/users.route");

const { productsRoute } = require("./routes/products.route");

const { cartRoute } = require("./routes/cart.route");

const { globalErrorHanddler } = require("./controllers/error.controller.js");

app.use("/api/v1/users", usersRoute);

app.use("/api/v1/products", productsRoute);

app.use("/api/v1/cart", cartRoute);

app.use(globalErrorHanddler);

app.all("*", (req, res) => {
    const { method, url } = req;

    res.status(404).json({
        status: "error",
        message: `${method}/${url} dont exist in our server`
    });
});

module.exports = { app };