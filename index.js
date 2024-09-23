const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/",(req,res) => {
    res.send("server is running succesfull !!")
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));