//Import dependencies
var covRead = require('../lib/read.js');
var covNormalize = require('../lib/normalize.js');

//Read the test file
var ca = covRead('./examples/normalize.txt');

//Normalize matrix
var norm = covNormalize(ca);

//Show in console
console.log('Normalized: ');
console.log(norm);
