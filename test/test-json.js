//Import dependencies
var covRead = require('../lib/read.js');
var covToJson = require('../lib/tojson.js');

//Read the test file
var ca = covRead('./examples/xa.txt');

//Show in console the matrix A
console.log('Matrix: ');
console.log(ca);

//Set the json
var jso = covToJson(ca);

//Show in console
console.log('Json object: ');
console.log(jso);
