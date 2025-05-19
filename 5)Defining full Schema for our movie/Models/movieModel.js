// ["Date of Release"] use [] to access keys with spaces
//[String] - Means array of string



const mongoose=require('mongoose');


const movieschema= new mongoose.Schema({

    name: {
        
        type:String,
    
    required:[true,'Name is required field!'],//(validation) this property will make sure to save the document 
                                            // only if name is included in th model
    
    unique:true, // this property makes sure that the value set this field is not repeated (or)
                // No two movies will have the same name          
    
    trim: true //It will remove white spaces before and after the movie name(if they are present)
    
    },
    description: {
        type:String,
    require:[true,'Description is a required field'],
    
trim:true

    },
    duration:{ 
        type: Number,

        require:[true,'Description is a required field']
    },
    ratings:{
        
        type:Number,
        default:1.0     // this value will be set if no value is alloted to it in the model
    
    },

totalRating:{

    type:Number

},

["Date of Release"]:{

type:Number,
require:[true,'Description is a required field']

},

ReleaseDate:{

type:Date


},

CreatedAt:{

type:Date,

default:Date.now

},

genres:{

type:[String],
require:[true,'genres is a required field']


},
directors:{

type:[String],
require:[true,'Directors is a required field']

},

coverImage:{

type:String,

require:[true,'Cover image is a required field']

},
actors:{

type:[String],
require:[true,'actors is a required field']


},

price:{

type:Number,
require:[true,'Price is a required field']

}



    });
    
    //That movie will be saved as a collection with its name in plural form
    const movie=mongoose.model('Movie',movieschema);
    
module.exports=movie;


