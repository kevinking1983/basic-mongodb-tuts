const { fail } = require('assert');
const fs = require('fs');

let movies = JSON.parse(fs.readFileSync('movies.json'));

//(NOT WORKING)
// This a middleware for checking if the id is valid or not
// exports.checkId = (req,res,next,value)=>{

// console.log('Movie Id is '+ value);

// let movie=movies.find(eL=>eL.id == value*1); // el is the iterator to access all objects and conditon is also mentioned
    
//     if(!movie){
    
//         return res.status(404).json({
        
//         status:"fail",
//         message:"No Movie with ID '<id>' is found!"
        
//         })
    
//     }

// next();

// }




exports.getAllmovies= (req,res)=>{

    res.status(200).json({
    
        status:"success",     //JSON to Jsend JSON data
        requestedAt: req.requestedAt,
        count: movies.length,  //Mention this based on the type of content her no. of movie objects should be mentioned
        data: {
    
            movies: movies
        }
    
    });
}

//Midllware made to check a valid request during post(change)

exports.Validatebody= (req,res,next)=>{

    if(!req.body.name || !req.body["Date of release"]){

     return   res.status(400).json({

       status:'fail',
       message:'Not a valid movie data'




        });


    }
next();
}



exports.createmovie= (req,res)=>{

    // console.log(req.body);  // to send the body from the user to the server we need middleware
    
    const newId= movies[movies.length-1].id+1; //Id of new object
    
    const newMovie = Object.assign({id:newId},req.body);  //  Whatever data we entry in the body of our request that will stored in a variable
    
//     movies.push(newMovie);  // adding our new movie into the js object file using    __(JSON file)__.push
    
    fs.writeFile('movies.json', JSON.stringify(movies),(err)=>{
    
    res.status(201).json({
    
        status:"success",     
        count: movies.length,  
        data: {
    
            movies: newMovie
        }
    });
    
    });

}

exports.updatemovie= (req,res)=>{

    let id= req.params.id*1;  // .params stores the values of route parameters in a string
    
    let movietoupdate=movies.find(eL=>eL.id == id); // el is the iterator to access all objects and conditon is also mentioned
    
    if(!movietoupdate){
    
        return res.status(404).json({
        
        status:"fail",
        message:"No Movie with ID '<id>' is found!"
        
        })
    
    }
    let movieindex = movies.indexOf(movietoupdate);  // index of stores the index of the movie we want to edit(indexing:0,1,2,3,.... like array)
    
    Object.assign(movietoupdate,req.body);  /* Whatever edit we mention in the body of our request that will be changed 
                                                                 in our selected movie */
    
    movies[movieindex]=movietoupdate;
    
    fs.writeFile('movies.json',JSON.stringify(movies),(err)=>{
        
        res.status(200).json({
    
        status:"success",     //JSON to Jsend JSON data
        data: {
    
            movie: movietoupdate
        }
    });
    
    
    
    })
    
    
    }

    exports.deletemovie=(req,res)=>{

    let id= req.params.id*1;

    let movietodelete=movies.find(eL=>eL.id == id);

    if(!movietodelete){

        return res.status(404).json({
        
        status:"fail",
        message:"No Movie with ID '<id>' is there to delete"
        
        })
    
    }

    let movieindex = movies.indexOf(movietodelete);

    movies.splice(movieindex,1);

    fs.writeFile('movies.json',JSON.stringify(movies),(err)=>{
    
        res.status(200).json({
    
        status:"success",     //JSON to Jsend JSON data
        data: {
    
            movie: null
        }
    });
    
    
    
    })




}