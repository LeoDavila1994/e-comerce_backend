const { app } = require("./app");

const { db } = require("./utils/dataBase.util");

const { initialModels } = require("./models/initialModels");

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const startServer = async () => {
    try {
        await db.authenticate();

        initialModels();

        await db.sync();

        app.listen(4000, () => {
            console.log("Express app runing");
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();