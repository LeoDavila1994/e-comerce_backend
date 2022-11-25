const { Users } = require("./users.models");
const { Orders } = require("./orders.models");
const { Products } = require("./products.models");
const { Carts } = require("./carts.models");
const { Categories } = require("./categories.models");
const { ProductsInCart } = require("./productsInCart.models");
const { ProductImgs } = require("./productImgs.models");

const initialModels = () => {

    Users.hasMany(Products, { foreignKey: "userId" });
    Products.belongsTo(Users);

    Users.hasMany(Orders, { foreignKey: "userId" });
    Orders.belongsTo(Users);

    Users.hasOne(Carts, { foreignKey: "userId" });
    Carts.belongsTo(Users);

    Carts.hasOne(Orders, { foreignKey: "cartId" });
    Orders.belongsTo(Carts);

    Carts.hasMany(ProductsInCart, { foreignKey: "cartId" });
    ProductsInCart.belongsTo(Carts);

    Products.hasMany(ProductImgs, { foreignKey: "productId" });
    ProductImgs.belongsTo(Products);

    Categories.hasOne(Products, { foreignKey: "categoryId" });
    Products.belongsTo(Categories);

    Products.hasOne(ProductsInCart, { foreignKey: "productId" });
    ProductsInCart.belongsTo(Products);

};

module.exports = { initialModels };