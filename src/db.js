const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB ...");
    } catch (err) {
        console.log("Could not connect to MongoDB");
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectToMongoDB;
