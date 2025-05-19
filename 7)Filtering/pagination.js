/*
A page will contain a certain amount of data(movies) and the user can choose a page of his choice to 
view the data of that page

Meaning of query.skip(page).limit(limit)

In every page we want to skip limit*page no. of items 

=> logic for throwing error if skip>=moviescount



*/


const page=req.query.page || 1;
const limit= req.query.limit || 10;

skip= (page-1)*limit;       //page-1 because in 1st page we want to skip 0 items

query=query.skip(skip).limit(limit);



if(req.query.page){

const moviescount= await Movie.countDocuments();  // counts all the documents in the db

if(skip>=moviescount){


throw new Error("This page is not found!");


}
}