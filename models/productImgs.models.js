const { db, DataTypes } = require("../utils/dataBase.util");

const ProductImgs = db.define("productimgs", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    imgUrl: {
        allowNull: false,
        type: DataTypes.STRING
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        defaultValue: "active",
        type: DataTypes.STRING
    }
});

module.exports = { ProductImgs };

