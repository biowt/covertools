//Import dependencies
var covRead = require('./read.js');

//Function convert mpileup file to cover object
function CoverConvert(f)
{
  //Check the input file
  if(typeof f === 'undefined'){ throw new Error('You must provide an input mpileup file.'); }

  //Read and convert
  var c = covRead(f, true);

  //Return the converted cover
  return c;
}

//Exports to node
module.exports = CoverConvert;
