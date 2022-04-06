const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const post = require('./routes/post');
dotenv.config();


mongoose
    .connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connect to Mongoose server');
        app.use(express.json());  //Middleware
        app.use(express.static("public"));
        app.use('/api/user', post)
        app.listen(PORT, () => {
            console.log('listening on port ' + PORT);
        })
    })