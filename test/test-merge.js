//Import dependencies
var covRead = require('../lib/read.js');
var covWrite = require('../lib/write.js');
var covMerge = require('../lib/merge.js');

//Read the test file
var ca = covRead('./examples/xa.txt');
var cb = covRead('./examples/xb.txt');
//var cc = covRead('./examples/c.txt');

//Show in console the matrix A
console.log('A matrix: ');
console.log(ca);

//Show in console the matrix B
console.log('B matrix: ');
console.log(cb);

//Merge ca and cb
var m = covMerge(ca, cb);

//Show in console
console.log('Merged matrix: ');
console.log(m);

//Merge m and cc
//m = covMerge(m, cc);

//Save to a file
//covWrite('./examples/xmerge2.txt', m);
