const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://namastedev:ZZr8Gp3E849WVczs@namastenode.8hq1f.mongodb.net/devTinder");
};

module.exports = connectDB;

    