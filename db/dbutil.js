require('dotenv').config();
const mongoose = require('mongoose');


const URI = process.env.MONGODB_URI;

const dbConnect = async () => {

    try{
   await mongoose.connect(URI);
   console.log('connect to db');
    }catch(err){
        console.log('not connected ',err);
        process.exit(0);
    }
}

module.exports = dbConnect;