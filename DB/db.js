const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://chaturvedia435:lutsrBnYLKxOMrnq@cluster0.f0j5r.mongodb.net/`);
        console.log("Database connected successfully");
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = connectDb