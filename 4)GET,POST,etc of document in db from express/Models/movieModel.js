
const mongoose=require('mongoose');


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
    
module.exports=movie;


