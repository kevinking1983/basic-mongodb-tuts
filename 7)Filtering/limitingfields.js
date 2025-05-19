/*

only displays fields we mention  ____.select([fields we want to mention])

if we mention '-' before any field name we it return all the fields expects the one's the dashes
behind them

mixture of dash fields and fields without dashes is not possible

select:false     this property inside a schema will exclude showing the details of the field in which
we mention this property Ex: used for passwords,etc

*/
let query=Movie.find(queryobj);

if(req.query.fields){


const fields= fields.replace(req.query.fields).split(',').join(' '); // editing our query string to use in our code

let query = query.select(fields);
//          query.select(name duration price ratings)  divided using space( )

}

else{


 query= query.select('-__v');



}


const movies = await query;