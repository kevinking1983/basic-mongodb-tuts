const express= require('express');
const fs = require('fs');
const moviescontroller=require('./../Controllers/moviescontroller')  // importin our controller module

const app= express();

let movies = JSON.parse(fs.readFileSync('movies.json'));




const Router= express.Router();  //Creating a router

Router.param('id',(req,res,next,value)=>{     //Param middleware   // value stores the id which is function of param

console.log('movie ID is '+ value);

next();


})



Router.route('/')
            
   .get(moviescontroller.getAllmovies)                                    // (change) Here the middlewares are chained in post request
   .post(moviescontroller.Validatebody,moviescontroller.createmovie)   // adding our middleware for checking request while posting

Router.route('/:id') 
                                                                   
        .patch(moviescontroller.updatemovie)    
        .delete(moviescontroller.deletemovie)


app.use('/api/v1/movies',Router);  //In this middleware the router we created is used only for the path we mention

module.exports= Router;