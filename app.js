const express = require('express');
const dbConnect = require('./db/dbutil');
const router = require('./router/auth-router');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error-middleware');
const app = express();


// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/auth',router);
app.use(errorMiddleware);
// server started 
dbConnect().then(()=>{

    app.listen(3001,()=>{
        console.log('server started at port 3001');
    })
});