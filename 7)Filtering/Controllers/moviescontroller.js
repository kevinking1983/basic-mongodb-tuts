const { fail } = require('assert');
const fs = require('fs');
const Movie = require('./../Models/movieModel');
let movies = JSON.parse(fs.readFileSync('movies.json'));



exports.getAllmovies= async (req,res)=>{

// console.log(req.query);  logging the query string which is passed in our request

    try{            //find({duration: +req.query.duration, ratings: +req.query.ratings}) can mention this way too
    const movies= await Movie.find(req.query) ;    
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