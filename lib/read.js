//Import dependencies
var fs = require('fs');

//Function for read a cover file
function CoverRead(f, mpileup)
{
  //Mpileup file input
  var mp = false;

  //Check for mpileup file
  if(typeof mpileup !== 'undefined')
  {
    //Save
    mp = mpileup;
  }

  //Read the cover file
  var content = fs.readFileSync(f, 'utf8');

  //Replace the \r
  content = content.replace(/\r/g, '');

  //Split the file by line
  content = content.split('\n');

  //Out cover
  var out = {chrs: [], ncov: 0, values: []};

  //Counter
  var count = 0;

  //Chromosome
  var chrnow = '', chrindex = -1;

  //Read all the content
  for(var i = 0; i < content.length; i++)
  {
    //Check for empty line
    if(content[i] === '' || content[i] === ' '){ continue; }

    //Split the content by tabs
    var cv = content[i].split('\t');

    //Check for save the coverage
    if(out.ncov == 0)
    {
      //Initialize the number of covers
      out.ncov = cv.length - 2;
    }

    //Create a new object
    var obj = {};

    //Check if chromosome exists
    if(chrnow !== cv[0])
    {
      //Create the new chromosome
      out.chrs.push({id: cv[0], start: count, end: count });

      //Save the chromosome id
      chrnow = cv[0];

      //Save the chromosome index
      chrindex = out.chrs.length - 1;
    }

    //Save the position
    obj.pos = parseInt(cv[1]);

    //Initialize the coverage array
    obj.cover = [];

    //Check for mpileup file
    if(mp === false)
    {
      //Read all the coverages
      for(var j = 2; j < cv.length; j++){ obj.cover.push(parseInt(cv[j])); }
    }
    else
    {
      //Read only the 3 position
      obj.cover.push(parseInt(cv[3]));
    }

    //Save the new object
    out.values.push(obj);

    //Change the end index
    out.chrs[chrindex].end = count;

    //Increment the counter
    count = count + 1;
  }

  //Change the number of covers
  if(mp === true)
  {
    //Set as 1
    out.ncov = 1;
  }

  //Return
  return out;
}

//Exports to node
module.exports = CoverRead;
