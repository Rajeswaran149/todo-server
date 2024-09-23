const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connected');
    
})
.catch(err => console.error(err));


app.use('/api/tasks', taskRoutes);
app.use("/",(req,res) => {
    res.send("server is running succesfull !!")
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));