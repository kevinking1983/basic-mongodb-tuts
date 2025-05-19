/*

//Sql 

data exits inside tables

In each table rows are present

//non sql(MongodB)

data exits inside collections 

In each collection documents are present

Stores in JSON data

// Features of MongoDB

Each document has field(key-value pairs)

Built-in Scalability making it easy to distribute data across multiple machines & generate a 
ton of data.

It has great flexability and it does not enforces a predefined schema(used in sql for organizing data)
in a collection

It is a performant datbase solution because of it's features like embedded data model,indexing,
sharding,flexible documents,etc

It can have embedded or nested documents upto 100 levels

Each element has object id which is automatically alloted even if we don't mention id


*/

/*
Commands


cls- clear 

show dbs- shows all databases which have atleast one document and one collection

db- currently set database(default:test)

db.dropDatabase() - Will drop the current database

show collections- shows all collection in our current database

use __(name of database)__ - to switch database
[if a database doesn't exist then it will be created and be switched to that]

db.__(collection name)__ - accessing a collection
[If that collection does not exist a new collection will be created and will be accessed]


                                                         [default value false]             
db.createCollection('__(name of collection)__',{capped:true,autoIndexId:True,size:79879,max:100})
- used to create a collection                  ------------[optional]---------------------------

[max size in bytes for the collection]: size:

[maximum no. of documents that can be created in the collection ]: max:

Capped collection - It is fixed size collection which automatically overwrites it old entries after
reaching it's maximum size

db.(__collection name__).drop() - Used to drop any collection



db.(__collection name__).inserOne({"___":___}) - Used to insert a document in a collection

[while inserting any key value pair we need not mention "" to the key]

_id -- It is assigned by mongodb automatically if we don't assign a value to it explicitly[manually]
       It is always unique for each object


db.(__collection name__).insertMany([{"___":___},{},{}]) - Used to insert multiple documents in a collection



db.(__collection name__).find({"__":__})- Shows all the documents inside the collection which
                                          contains our filte
If filter is not mentioned it will show all the documents inside the collection

db.(__collection name__).findOne({"__":__})- Shows 1st document inside the colleciton which
                                           contain our filter
If filter is not mentioned it will show the 1st document of the collection

db.(__collection name__).find({(filter)},{(custom output)})-Showed with example below

custom output Ex: {id:false,gender:0}
Will not show id,gender in filtered data

db.(__collection name__).find({(filter)},{(custom output)}).pretty- shows result in a formated way
 pretty is only used for find method


//Update documents
                                              (fields we want to update)
db.(__collection name__).updateOne({(filter)},{$set:{"__":__ , "__":__}}) - Updates the 1st
collection of the of the filter 

If a document does not a have key which we mention in $set then it adds that key value pair
into to the document which is being edited or updated

db.(__collection name__).updateMany({(filter)},{$set:{(edits)}})- Updates all the documents
which contain the filter

If a document which contains the filter  does not a have key which we mention in $set then
it adds that key value pair into to the document which is being edited or updated

//delete documents

1st way to delete[recomended]

db.(__collection name__).deleteOne({filter}) - Delete the 1st document of filtered data

If we pass an empty document or object in filter it will delete the 1st document of the collection
deleteOne({})--empty document passed

db.(__collection name__).deleteMany({filter}) - Deletes all the documents that match the filter

If we pass an empty document or object in filter it will delete all the doucuments in the collection
deleteMany({})--empty document passed

2nd way to delete(using remove)

db.(__collection name__).remove({filter},(true/false))

true-acts like deleteOne
false/nothing mentioned - acts like deleteMany

If we pass an empty document or object in filter it will delete all the doucuments in the collection
remove({})--empty document passed

typeof - shows the data type of a key

typeof db.demo.findOne.age

.stats() - gives the statistics of current database


//Cursor

It is a pointer to a list of documents

It returns us documents in batches

In the language we work the language drivers provide some drivers to work with cursors

1. toarray() method

This method will automatically request for the next batch of documents or next cursor

db.(__collection name__).find().toarray() - shows all the documents (internally: each bacth of documents(cursor) are requested automatically)

2. forEach() method

forEach(function(i){(updation statement and output)})

                                                      (key)        (accesing value of key through iterator)
db.(__collection name__).find().forEach(function(i){print{"__: "} + i._(key)_ }) - 

shows all documents with the key we mention(internally: acts like for loop whole document is iterated)


//BSON data


Format- [
    {


        (fields)

}
]

//
Each document consists of fields which has a key and a value

Ex: "name" : "John" (value is string)
    "age"  : 18     (value is int)

    value type bool,null,undefined also exist

//Data types(including above ones)    

typeof - shows the data type of a key

Ex: db.demo.insertOne({name:Ben,isAdmin:True,age:19,DOB: new date(),createdon:new Timestamp()})
                                                  |
                                                  =>stored as floating point number    
=> Numbers                                                  
int- stores a value upto 32 bit long

long- used to store long numbers(64 bit)

numberdecimal most precise decimal number type (better than double)
 
=>ObjectId

=>Date

ISODate("_-_-_")

Timestamp(___)

=>Arrays

We can use the array as a list when it is set as value to a field

Ex: country:[UK,India]

//
Generally we work and write with JSON but mongodB behind the scenes converts this data
into BSON using drivers

It supports additional datatypes like the automatic Objectid that is assigned


//
we can stop mongoDB services by stoping it in the services


//Embedded documents

when the value of field is assigned as a document that is known as nested or embedded documents

You can nest documents upto 100levels of nesting

The overall size of the document must not exceed 16MB

while using filter we need to access data of the field which has nested documents

Ex: findMany({"Subscription.type"="yearly"}) 
Subscription- field in which nested documents are present
type- field inside the nested document

//
To connect our virtual server(made in atlas) in our shell then type the below command in terminal

mongosh (paste our connection string)

that connection will be generated in MongoDB compass

mongodb+srv://admin:<password>@cluster0.t1mwk0w.mongodb.net/
JnpB0uOrm6QVNOjq


*/


