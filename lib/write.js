//Import dependencies
var fs = require('fs');

//Function for save a cover object to a file
function CoverWrite(f, c)
{
  //Out file
  var out = '';

  //Read all the chromosomes
  for(var i = 0; i < c.length; i++)
  {
    //Get the line
    var line = c[i];

    //Add all the positions
    for(var j = 0; j < line.length; j++)
    {
      //ACheck for add a tab
      if(j > 0){ out = out + '\t'; }

      //Add the value
      out = out + line[j];
    }

    //End the line
    out = out + '\n';
  }

  //Save to a file
  fs.writeFileSync(f, out, 'utf8');
}

//Exports to node
module.exports = CoverWrite;
