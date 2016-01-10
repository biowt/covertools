//Import dependencies
var covRead = require('../lib/read.js');
var covWrite = require('../lib/write.js');
var covMerge = require('../lib/merge.js');

//Read the test file
var ca = covRead('./examples/a.txt');
var cb = covRead('./examples/b.txt');
var cc = covRead('./examples/c.txt');

//Merge ca and cb
var m = covMerge(ca, cb);

//Merge m and cc
m = covMerge(m, cc);

//Save to a file
covWrite('./examples/merge.txt', m);
