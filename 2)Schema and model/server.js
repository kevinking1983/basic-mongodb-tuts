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

const mongoose=require('mongoose');  //exporting our mongoose drivers to use

const dotenv = require('dotenv');
dotenv.config({path: './config.env'}); //accessing our environment variables

const app = require('./app'); 

const movieschema= new mongoose.Schema({

name: {
    
    type:String,

required:[true,'Name is required field!'],//(validation) this property will make sure to save the document 
                                        // only if name is included in th model

unique:true // this property makes sure that the value set this field is not repeated (or)
            // No two movies will have the same name          
},
description: String,
duration:Number,
ratings:{
    
    type:Number,
    default:1.0     // this value will be set if no value is alloted to it in the model

}
});

//That movie will be saved as a collection with its name in plural form
const movie=mongoose.model('Movie',movieschema);

//document we created using schema model
// We can keep on editing the testmovie with new value and save them one by one
const testmovie= new movie({    

name: "MVP",
description:"Story of a gamer",
duration: 140,
ratings:4.8

});

//We use save method with some callback funcitons to save our document in our collection
testmovie.save().then(doc => {

console.log(doc);

})
.catch(err=>{

console.log("error has occured:" + err);

});


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