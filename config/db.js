require('dotenv').config();
const mongoose = require('mongoose');

function connectDB() {
    // Database connection 🥳
    // console.log(process.env.MONGO_CONNECTION_URL)
    // mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connect(process.env.MONGO_CONNECTION_URL);

    const connection = mongoose.connection;

    connection.on("error", console.error.bind(console, "connection error: "));
    connection.once("open", function() {
        console.log("Connected successfully sadfsd");
    });
}

// mIAY0a6u1ByJsWWZ

module.exports = connectDB;