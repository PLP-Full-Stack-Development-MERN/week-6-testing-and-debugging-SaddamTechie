const mongoose = require('mongoose');
const  dotenv = require('dotenv');
dotenv.config();

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully")
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB;

