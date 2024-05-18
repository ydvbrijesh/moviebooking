const mongoose = require("mongoose")

const mongodb = () => {
    let url = "mongodb+srv://vishalrao026:Ey7NzXNWUL30TM86@cluster0.wgnpokg.mongodb.net/movies"
    mongoose
        .connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        .then(() => {
            console.log("Connected to the database!");

        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}

module.exports = mongodb;