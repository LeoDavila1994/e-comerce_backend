const { db, DataTypes } = require("../utils/dataBase.util");

const Products = db.define("products", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        defaultValue: "active",
        type: DataTypes.STRING
    }
});

module.exports = { Products };