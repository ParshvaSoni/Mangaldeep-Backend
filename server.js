const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const app=express()

mongoose.connect(process.env.DATABASE_URL)
const db=mongoose.connection
db.on('error',(error)=>{console.error(error)})
db.once('open',()=>console.log("connected to DB")) // this runs when db is connected 

app.use(express.json()) // this is the middleware, middleware is a part of code which runs before passing data to server if data is posted in the request body, 


// the below code helps to remove CORS error... CORS errors comes when the API is hosted on different server
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // server sometimes request for OPTION method to check which methods are supported by this API, So we append the list of methods in the response header which we support
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}) // we return empty json becuase OPTION request is just to check which methods API supports
    }
    next();
})


const offerRouter=require('./routes/offer')
app.use('/offers',offerRouter)

app.listen(3000,()=>{console.log("server started at port")})