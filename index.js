const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// imports
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
dotenv.config();

// Middleware
app.use(express.json());
// Route middleware
app.use('/api/user' , authRoutes);
app.use('/api/posts' , postsRoutes);

// Mongoose connect
mongoose.connect("mongodb://localhost:27017/nodejs-auth-example" , { useNewUrlParser: true } , (err) =>{
    if(!err){
        console.log("Connected with database")
    }
});

// Listening Server
app.listen(3000 , (err) =>{
    if(!err){
        console.log("Server os running on port 3000...")
    }else{
        console.log("server is down..")
    }
})