const mongoose = require("mongoose")

const mongodb = () => {
    let url = process.env.MONGODB_URL
    mongoose
        .connect(url)
        .then(() => {
            console.log("Connected to the database!");

        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}

module.exports = mongodb;