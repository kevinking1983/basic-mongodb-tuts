
const mongoose= require('mongoose');
const dotenv= require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/movieModel');



dotenv.config({path: './config.env'}); //accessing our environment variables

mongoose.connect(process.env.CON_STR,{           //connecting to server

    useNewUrlParser: true
    
    }).then((conn)=>{                        //It is a callback function               
                                                       
        //console.log(conn);  logging to show what conn object contains
        console.log("db connection successful");
    
    }).catch((error)=>{
    
        console.log('some error has occured');  //It is a callback function will learn more about this
                                                //in upcoming lectures
    
    })

//Reading movies.json file
    let movies = JSON.parse(fs.readFileSync('movies.json','utf-8'));


    const deletemovie= async(req,res)=>{


        try{
                          //deletes all the movies
            await Movie.deleteMany();
        
            console.log("Data successfully deleted");
        
        }
        
        catch(err){
        
              console.log(err.message);
        }
        
        process.exit();
        
        }

        const importmovies= async(req,res)=>{


            try{
                      //if want to create multiple docs at a time we need pass an arry in create() method
                await Movie.create(movies);
            
                console.log("Data successfully imported");
            
            }
            
            catch(err){
            
                  console.log(err.message);
            }
            
            process.exit();
            }

// console.log(process.argv); this will return an array of all paths of processes which we choose to do
//in the terminal Ex: node app.js (it will show directory of node.exe,app.js in an array)
                                                                   
if(process.argv[2]=='--import'){

    importmovies();
}
if(process.argv[2]=='--delete'){

deletemovie();

}



