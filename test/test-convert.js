//Import dependencies
var covConvert = require('../lib/convert.js');
var covWrite = require('../lib/write.js');

//Convert the mpileup test file
var c = covConvert('./examples/mpileup.txt');

//Save file
covWrite('./examples/cmpileup.txt', c);
