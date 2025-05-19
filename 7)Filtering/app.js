

const express= require('express');
const fs=require('fs');
const morgan = require('morgan');

const moviesRouter= require('./Routes/moviesroutes'); // importing our router module which we created in moviesroutes




const app= express();

const logger= function(req,res,next){

    console.log('Custom middleware called');
    
    next();
    
    }
    
    //middlewares
    app.use(express.json()); 

    app.use(express.static('./public')); // static files middleware

    //using a environment variable here (changed)
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev')); // morgan function contains middleware functions so it also parameters(for different parameters format will change
}
    
    app.use(logger);         // but at all parameters provide information about our request)

    //Midlle ware example 
    app.use((req,res,next)=>{

    req.requestedAt= new Date().toISOString();      //toISOString() helps to convert into a string
    next();
})





app.use('/api/v1/movies',moviesRouter);  //In this middleware the router we created is used only for the path we mention


module.exports=app;