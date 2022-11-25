const { db, DataTypes } = require("../utils/dataBase.util");

const Carts = db.define("carts", {
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
    status: {
        allowNull: false,
        defaultValue: "active",
        type: DataTypes.STRING
    }
});

module.exports = { Carts };