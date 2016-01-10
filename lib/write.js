//Import dependencies
var fs = require('fs');
var objectSort = require('objectsort');

//Function for save a cover object to a file
function CoverWrite(f, c)
{
  //Out file
  var out = '';

  //Sort the chromosomes array
  var ch = objectSort(c.chrs, 'id');

  //Read all the chromosomes
  for(var i = 0; i < ch.length; i++)
  {
    //Add all the positions
    for(var j = ch[i].start; j <= ch[i].end; j++)
    {
      //Add the chromosome
      out = out + ch[i].id + '\t';

      //Add the position
      out = out + c.values[j].pos;

      //Add the cover values
      for(var k = 0; k < c.ncov; k++)
      {
        //Add the tab
        out = out  + '\t';

        //Add the cover value
        out = out + c.values[j].cov[k];
      }

      //End the line
      out = out + '\n';
    }
  }

  //Save to a file
  fs.writeFileSync(f, out, 'utf8');
}

//Exports to node
module.exports = CoverWrite;
