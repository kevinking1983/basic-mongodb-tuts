/*

This feature is used when a route handler recieves many requests 

Here we are displaying the top 5 objects by rating for our illustration

*/

// this is middleware function which can mentioned in controllers section

exports.gethighestrated = (req,res,next) =>{

req.query.limit=5;  // top 5  // using limiting fields

req.query.sort= '-ratings';  // descending order by ratings

next();

}


// creating a route for this request

router.route('/highest-rated').get(moviescontroller.gethighestrated,moviescontroller.getAllmovies)