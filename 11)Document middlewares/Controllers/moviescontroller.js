const { fail } = require('assert');
const fs = require('fs');
const Movie = require('./../Models/movieModel');
let movies = JSON.parse(fs.readFileSync('movies.json'));
const ApiFeatures = require('./../Utils/Apifeatures');




exports.getAllmovies= async (req,res)=>{

// console.log(req.query);  logging the query string which is passed in our request

    try{    
        
  const features= new ApiFeatures(Movie.find(),req.query)
                                                         .filter()
                                                         .sort()
                                                         .limitfields()
                                                         .paginate();

let movies= await features.query; // this features.query is property
        
        //find({duration: +req.query.duration, ratings: +req.query.ratings}) can mention this way too
    // const movies= await Movie.find(req.query) ;    
    // same find with filter mentioned in query in mongodb commands(not ideal method for filer finding)
    
    // const movies= await Movie.find() ;                      Another way to find with filters as query
    //                          .where('duration')             using .where and .equals
    //                          .equals(req.query.duration)           (key)      (query value)
    //                          .where('ratings')
    //                          .equals(req.query.ratings);




    res.status(200).json({

status: 'Success',
length: movies.length,
data:{

    movies       //envelope
}

    });

}
catch(err){

res.status(404).json({

status:"fail",
message: err.message

})

}

}



//Midllware made to check a valid request during post(change)

// exports.Validatebody= (req,res,next)=>{

//     if(!req.body.name || !req.body["Date of release"]){

//      return   res.status(400).json({

//        status:'fail',
//        message:'Not a valid movie data'




//         });


//     }
// next();
// }

exports.getmoviebyid= async(req,res)=>{


try{

// const movie=Movie.find({_id:req.params.id});    
    const movie = await Movie.findById(req.params.id); // this also a method to find method


res.status(200).json({

    status: 'Success',
    length: movies.length,
    data:{
    
        movie       //envelope
    }
    
        });
    
}
    catch(err){
    
    res.status(404).json({
    
    status:"fail",
    message: err.message
    
    })
    
    }
    

}






exports.createmovie= async (req,res)=>{

  try{  
const movie = await Movie.create(req.body);

res.status(201).json({

status: 'success',
data:{

    movie
}

})

}
 /* we need not use save here this will directly save the document
in the db with movie object being passed in it as "req.body" this will return a promise which can either be
a resolved one(document will be saved in the db) or error 

As it takes time to resolve we use to wait for the promise to get resolved
                              |
                  await and async as shown above
if use await async then we need to use try catch instead of this catch

*/
 catch(err){

res.status(404).json({

    status:'fail',
    message:err.message

})

 }


   
}

exports.updatemovie= async(req,res)=>{

    try{
                                   //updates the document
const updatedmovie= await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
// new will make sure this method  will return the document
// runvalidators will make sure the input in body will run the through the validators(ex: unique in name)

res.status(200).json({

status:"success",
data:{

    movie:updatedmovie
}


});

    }


catch(err){

    res.status(404).json({

        status:'fail',
        message:err.message
    
    })


}
    
    }

    exports.deletemovie= async(req,res)=>{


try{
                  //deletes the movie
    await Movie.findByIdAndDelete(req.params.id);

    res.status(204).json({

status:"success",

data:null


    })

}

catch(err){

    res.status(404).json({

        status:'fail',
        message:err.message
    
    })


}


}

//change

exports.getmoviestats = async (req,res) =>{


try{

const stats= await Movie.aggregate([

// these are stages

{$match: {ratings:{$gte:7}}},  // now each movie doc will go throught this condition in aggregation pipeline
                              // and the satisfied documents are sent in result


{$group: {            // group stage works on all the documents returned by match stage if id is null
    
    _id:'$duration',         // grouping is done based on the duration field
avgRating: {$avg:'$ratings'},  // returns average rating in the collection
avgprice:{$avg:'$price'},      // returns average price in the collection
minprice:{$min:'$price'},      // returns min value of price in the collection
maxprice:{$max:'$price'},       // returns max value of price in the collection
pricetotal:{$sum:'$price'},      //returns sum all the prices in the collection
moviescount:{$sum:1}             // for each doc passed in the pipeline moviecount++ happens

}} ,                             
{$sort:{maxprice:1}},         // sorting is done on the data which goes through match and group

// {$match:{maxprice:{gte:10}}}


]);  // with this we can utilize the aggregrate feature of mongodb

res.status(200).json({

    status:"success",
    length:stats.length,
    data:{
    
        stats
    }
})

}
catch(err){

    res.status(404).json({

        status:'fail',
        message:err.message
    
    });


}


}

exports.getmoviesbygenre = async (req,res) => {

try{

    const genre= req.params.genre;

const movies= await Movie.aggregate([

{$unwind:'$genres'},  // check notes

{$group:{

    _id:'$genres',
    moviecount:{$sum:1},      //grouping data by genre noting 
movies: {$push: '$name'}      //noting all the movies which contain that particular genre
}},

{$addFields:{genre:"$_id"}}, // assinging id field poperty to a new field genre
{$project:{_id:0}},   // by setting any field to 0 all docs will be displayed excluding the field mentioned
                     //here as genre impact on the field is same as that of _id so we are removing _id
                     //if any fields are set to 1 all docs will be displayed with only the field set to
                     // 1 in the project

{$sort:{moviecount:-1}}, // if value is set to 1 then A.o if -1 D.O

// {$limit:6}  // displays as many docs as mentioned in the value

{$match:{genre:genre}}



])



    res.status(200).json({

        status:"success",
        length:movies.length,
        data:{
        
            movies
        }
    })

}

catch(err){

    res.status(404).json({

        status:'fail',
        message:err.message
    
    });


}

}