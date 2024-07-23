const express = require("express");
const dotenv = require("dotenv");
const connectToMongoDB = require("./db");

dotenv.config();

const app = express();
app.use(express.json());

connectToMongoDB();

app.get('/', (req, res) => {
    res.send(process.env.BACKEND_STATUS_TEXT);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
