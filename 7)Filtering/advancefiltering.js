/*
Using greater and less than


$gte- greater than or equal to Ex: duration: {$gte:90}
$lte- less than or equal to
$lt- less than
$gt- greater than


In the below example wherever we are mentioning gte or lte that will be replaced with $gte and $lte
using .replace(/\b()\b/g) and then be used 

using /b: such that only the lowercase or any mentioned form in the ( ) will only be replaced

using g: such that all occurances of the mentioned words will be replaced as directed
in the callback function


Ex:                                    >=               <=
localhost:3000/api/v1/movies/?duration[gte]=90&&ratings[lte]=4.5

req.query-                            gte:90            lte:4.5


plug the the following code with queryobj instead req.query in find method to implement finding of
greater than and less than cases

*/

let querystr= JSON.stringify(req.query);

querystr= querystr.replace(/\b(gte|gt|lte|lt)\b/g,(match) =>  `$${match}`);

let queryobj= JSON.parse(querystr);