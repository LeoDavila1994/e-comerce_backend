const { db, DataTypes } = require("../utils/dataBase.util");

const Categories = db.define("categories", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        defaultValue: "active",
        type: DataTypes.STRING
    }
});

module.exports = { Categories };