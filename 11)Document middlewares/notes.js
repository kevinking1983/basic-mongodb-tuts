/*

//Mongoose middlewares

In mongoose middleware can be used befor and after saving of data in db which is called 
pre and post hook

we use .pre or .post method for middlewares

In our tuts we are write middleware functions for any specific method which is being implemented

// this is point out to the document which is currently be processed



//Virtual Properties

This data fields/properties will not be saved in the database but will be shown in the display

Our .get() method wil always make sure that our virtual property will be displayed

We con use virtual properties as filter/any other property of normal in .find() or any such methods

//Aggregation Pipeline
Motive is to create a pipeline through which all documents in the collection go through and get processed
step by step in order to transform them into a aggregated result

For this we are creating a new route and a new route handler function for it.

$unwind - In this stage in the array a document is multiplied into as many copies as no. of elements
in the genre field with each copy of if it containing the same data except differing in the genre.




*/