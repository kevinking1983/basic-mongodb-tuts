class ApiFeatures{

constructor(query,queryStr){ // here query is Movie.find() and queryStr is req.query as passed in controllers

this.query = query;
this.queryStr= queryStr;

}

//notes for all the methods are in filtering folder


filter(){

    let querystring= JSON.stringify(this.queryStr);

    querystring= querystring.replace(/\b(gte|gt|lte|lt)\b/g,(match) =>  `$${match}`);
    
    const queryobj= JSON.parse(querystring); 
    
 this.query= this.query.find(queryobj);

 return this;
}

sort(){

    if(this.queryStr.sort){           // applies sorting for only query strings which contain sort

        const sortBy = this.queryStr.sort.split(',').join(' ');
        
                // query = query.sort(req.query)    //sorting and assigning to query
            
                this.query = this.query.sort(sortBy);
        
            //movies.sort('releaseyear ratings') to seperate sort fields during sorting of more than one field
            // during sort
            
        
            }
        else{
        
            this.query = this.query.sort('-createdAt');
        
        
        }


return this;


}

limitfields(){

    if(this.queryStr.fields){


        const fields= fields.replace(this.queryStr.fields).split(',').join(' '); // editing our query string to use in our code
        
        this.query = this.query.select(fields);
        //          query.select(name duration price ratings)  divided using space( )
        
        }

        else{


            this.query= this.query.select('-__v');


        }

        return this;


}

paginate(){


    const page=this.queryStr.page || 1;
    const limit= this.queryStr.limit || 10;
    
    let skip= (page-1)*limit;       //page-1 because in 1st page we want to skip 0 items
    
    this.query=this.query.skip(skip).limit(limit);
    
    
    
    // if(req.query.page){
    
    // const moviescount= await Movie.countDocuments();  // counts all the documents in the db
    
    // if(skip>=moviescount){
    
    
    // throw new Error("This page is not found!");
    
    
    // }
    // }



return this;

}


}

module.exports= ApiFeatures;