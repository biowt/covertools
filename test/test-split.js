//Import dependencies
var covRead = require('../lib/read.js');
var covSplit = require('../lib/split.js');

//Read the test file
var content = covRead('./examples/xa.txt');

//Show in console the content
console.log(content);

//Split by region
var sp = covSplit(content, './examples/test.bed', true);

//Show in console
console.log(sp[0]);
