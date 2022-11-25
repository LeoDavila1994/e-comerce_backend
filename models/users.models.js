const { db, DataTypes } = require("../utils/dataBase.util");

const Users = db.define("users", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userName: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    role: {
        allowNull:false,
        defaultValue: "normal",
        type: DataTypes.STRING
    },
    status: {
        defaultValue: 'active',
        allowNull: false,
        type: DataTypes.STRING,
    }
});

module.exports = { Users };