/*
                                /sorting by a key Ex: sorting by price
__(arrayofjsonojects)__.sort(req.query.sort);

use '-'  before field name in query string to arrange in descending order



*/



let query=Movie.find(queryobj);

if(req.query.sort){           // applies sorting for only query strings which contain sort

const sortBy = req.query.sort.split(',').join(' ');

        // query = query.sort(req.query)    //sorting and assigning to query
    
        query = query.sort(sortBy);

    //movies.sort('releaseyear ratings') to seperate sort fields during sorting of more than one field
    // during sort

    }
else{

    query = query.sort('-createdAt');


}

    const movies = await query;

