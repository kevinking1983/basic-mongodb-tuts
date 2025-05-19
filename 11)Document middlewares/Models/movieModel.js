// ["Date of Release"] use [] to access keys with spaces
//[String] - Means array of string


const fs= require('fs');
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

},

CreatedBy:String

}, {

toJSON: {virtuals:true},  // specifying that whenever there is json output all the virtual properties
                         // should be displayed

toObject:{virtuals:true}  // whenver ever output as objects even then virtuals must be displayed

    });

//Middlewares

//save method will be implemented whenever we call .save() or .create() from our express app

movieschema.pre('save',function(next){

this.CreatedBy='Kevin';
console.log(this); // this is point out to the document which is currently be processed

next();

})

movieschema.post('save',function(doc,next){

const content = `A new movie document with name ${doc.name} has been created by ${doc.CreatedBy}\n`
 
fs.writeFileSync('./log/log.txt',content,{flag:'a'},(err) => {  // flag: a means append(add to the end of data)

console.log(err.message);

})

next();
})

//Query middleware

movieschema.pre(/^find/, function(next){   // whenever there is any type find(Ex:findOne,findMany)
                                             // this will be implemented if only 'find' is mention it will
                                             //only be applicable for find() 

this.find({releaseDate:{$lte:Date.now()}});

this.startTime= Date.now()

next();

})

movieschema.post(/^find/, function(docs,next){

    this.find({releaseDate:{$lte:Date.now()}});  // showing movies movies which have released
                                                 // excluding which are yet to release

    this.endTime= Date.now()

    const content = `Query took ${this.endTime} milliseconds to fetch the documents\n`
 
    fs.writeFileSync('./log/log.txt',content,{flag:'a'},(err) => {  // flag: a means append(add to the end of data)
    
        console.log(err.message);

    })

next();

})

//Aggregate Midlleware

movieschema.pre('aggregate', function(next){

console.log(this.pipeline().unshift({$match:{ReleaseDate: {lte:new Date()}}})); 
                                       // logs/returns an array with all the stages of aggregation we mentioned
next();                                //using unshift we can add an element at the beginning of the array

})



//virual properties
    movieschema.virtual('durationInHours').get(function(){

        return this.duration/60;

    })
    
    
    
    //That movie will be saved as a collection with its name in plural form
    const movie=mongoose.model('Movie',movieschema);
    
module.exports=movie;


