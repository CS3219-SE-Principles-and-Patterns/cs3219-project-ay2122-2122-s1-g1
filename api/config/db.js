// Export mongoose
const mongoose = require("mongoose");

//Assign MongoDB connection string to Uri and declare options settings
var uri = "mongodb+srv://cs3219user:7NIihwYv4ilcG5XR@cs3219group1.mnajh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// var uri = process.env.MONGODB_URL || "mongodb://localhost";

// Connect MongoDB Atlas using mongoose connect method
mongoose.connect(uri).then(() => {
    console.log("Database connection established!");
}, err  => {{
    console.log("Check that you are not using NUS Wifi. Error connecting Database instance due to:", err); 
}});