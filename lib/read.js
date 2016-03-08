//Import dependencies
var fs = require('fs');
var ObjectSort = require('objectsort');

//Function for read a cover file
function CoverRead(f)
{
  //Read the cover file
  var content = fs.readFileSync(f, 'utf8');

  //Replace the \r
  content = content.replace(/\r/g, '');

  //Split the file by line
  content = content.split('\n');

  //Out cover
  var out = [];

  //Read all the content
  for(var i = 0; i < content.length; i++)
  {
    //Check for empty line
    if(content[i] === '' || content[i] === ' '){ continue; }

    //Split the content by tabs
    var cv = content[i].split('\t');

    //Create a new object
    var obj = [];

    //Save the chromosome
    obj.push(cv[0]);

    //Save the position
    obj.push(parseInt(cv[1]));

    //Read all the coverages
    for(var j = 2; j < cv.length; j++)
    {
      //Add the number
      obj.push(Number(cv[j]));
    }

    //Save the new object
    out.push(obj);
  }

  //Sort by chromosome and position
  out = ObjectSort(out, [0, 1]);

  //Return
  return out;
}

//Exports to node
module.exports = CoverRead;
