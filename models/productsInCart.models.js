const { db, DataTypes } = require("../utils/dataBase.util");

const ProductsInCart = db.define("productsincart", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    cartId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        defaultValue: "active",
        type: DataTypes.STRING
    }
});

module.exports = { ProductsInCart };