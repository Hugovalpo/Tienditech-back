require("dotenv").config();
 
const mongoose = require('mongoose');
 
const connectionString = process.env.CONNECTION_STRING;
 
mongoose.connect(connectionString, {connectTimeoutMS: 2000})
    .then(() => console.log(`connected to database`))
    .catch(error => console.error(error));