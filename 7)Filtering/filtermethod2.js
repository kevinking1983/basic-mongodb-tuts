/*

This is the second method for using filtering because using .find({req.query}) we donot get a 
valid output if we enter a key in the query string which does not exist in our db collection
(for version before 6.0 of mongodb )

We plug this code into our controllers file inside our find() method or get request code


*/

const excludeFields= ['sort','page','limit',fields];

const queryobj={...req.query}; // A shallow copy will create the query as individual properties in 

excludeFields.forEach((el)=>{

    delete queryobj[el];    //any key which is a part of excludefields will be deleted for our query obj
})

console.log(queryobj);  // checking if our excluded fields our deleted or not in the queryobj