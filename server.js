const express = require('express');
const app = express();
const router = require('./src/routes/userRoute.js')
const connectToMongoDB= require('./src/config/db.js');
const dotenv= require('dotenv');

dotenv.config();


app.use(express.json());

app.use('/',router)

app.listen(8080,() =>{
    connectToMongoDB();
    console.log("Server is running...");
})