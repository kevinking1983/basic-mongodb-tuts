/*

In "start" property of our package.json file if we assign it with nodemon server.js then on typing npm start the server will start

connection to server
We use mongoose.connect((con str),{

})

new mongoose.schema({

    (fields){Ex: "":[(properties of data)]} // properties of data examples are shown in code


})

//Creating a model out of our schema
mongoose.data('__(name for collection)__',(name of schema)) 

//create a document using our schema model (Ex: given in testvariable in the below code)

//Saving our document in the database (.save() method with 
callback functions(promise) then(logging for documents),catch(logging for errors) as shown below






*/
const mongoose=require('mongoose');
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