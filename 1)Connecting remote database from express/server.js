/*

In "start" property of our package.json file if we assign it with nodemon server.js then on typing npm start the server will start

connection to server
We use mongoose.connect((con str),{

})

*/

const mongoose=require('mongoose');  //exporting our mongoose drivers to use

const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); //accessing our environment variables

const app = require('./app'); 

mongoose.connect(process.env.CON_STR,{           //connecting to server

useNewUrlParser: true

}).then((conn)=>{                        //It is a callback function               
                                                   
    //console.log(conn);  logging to show what conn object contains
    console.log("db connection successful");

}).catch((error)=>{

    console.log('some error has occured');  //It is a callback function will learn more about this
                                            //in upcoming lectures

})


const port = process.env.PORT || 3000;

console.log(process.env);

app.listen(port,()=>{


    console.log('Server has started');
})