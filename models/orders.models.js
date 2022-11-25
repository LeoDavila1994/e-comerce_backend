const { db, DataTypes } = require("../utils/dataBase.util");

const Orders = db.define("orders", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    cartId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    totalPrice: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2)
    },
    status: {
        allowNull:false,
        defaultValue: "active",
        type: DataTypes.STRING
    }
});

module.exports = { Orders };