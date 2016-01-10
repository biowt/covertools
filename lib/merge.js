//Import utils
var findChr = require('./utils/find-chr.js');

//Function for merge two cover objects
function CoverMerge(a, b)
{
  //Check for a object
  if(typeof a === 'undefined'){ throw new Error('No cover objects selected.'); }

  //Check for b object
  if(typeof b === 'undefined'){ throw new Error('No cover objects selected.'); }

  //Merged object
  var merge = {chrs: [], ncov: 0, values: []};

  //Change the number of covers
  merge.ncov = a.ncov + b.ncov;

  //Array with the completed chromosomes
  var done = [];

  //Read the a chromosomes
  for(var i = 0; i < a.chrs.length; i++)
  {
    //Get the index of the chromosome in b
    var j = findChr(b, a.chrs[i].id);

    //Check if chromosome exists in b file
    if(j > - 1)
    {
      //Merge the chromosome
      var mc = MergeChr(a, b, i, j);

      //Save the chromosome
      merge = AddChr(merge, mc, a.chrs[i].id);

      //Save the chromosome
      done.push(a.chrs[i].id);
    }
  }

  //Fix the different chromosomes in a
  for(var i = 0; i < a.chrs.length; i++)
  {
    //Check if we have readed the chromosome
    if(done.indexOf(a.chrs[i].id) > -1){ continue; }

    //Fix the chromosome
    var mc = CompleteChr(a, i, b.ncov, 'end');

    //Save the chromosome
    merge = AddChr(merge, mc, a.chrs[i].id);
  }

  //Fix the different chromosomes in b
  for(var i = 0; i < b.chrs.length; i++)
  {
    //Check if we have readed the chromosome
    if(done.indexOf(b.chrs[i].id) > -1){ continue; }

    //Fix the chromosome
    var mc = CompleteChr(b, i, a.ncov, 'start');

    //Save the chromosome
    merge = AddChr(merge, mc, b.chrs[i].id);
  }

  //Return the cover merged
  return merge;
}

//Function for merge one chromosome
function MergeChr(a, b, ai, bi)
{
  //Merged positions
  var pos = [];

  //Counters
  var i = a.chrs[ai].start, j = b.chrs[bi].start;

  //Merge both files
  while(i <= a.chrs[ai].end && j <= b.chrs[bi].end)
  {
    //Check if b.pos < a.pos
    if(b.values[j].pos < a.values[i].pos)
    {
      //Insert 0s to the first position
      for(var k = 0; k < a.ncov; k++){ b.values[j].cov.splice(0, 0, 0); }

      //Add the b object
      pos.push(b.values[j]);

      //Increment the b counter
      j = j + 1;
    }
    else if(a.values[i].pos < b.values[j].pos)
    {
      //Insert a 0 to the last position
      for(var k = 0; k < b.ncov; k++){ a.values[i].cov.push(0); }

      //Add the a object
      pos.push(a.values[i]);

      //Increment the a counter
      i = i + 1;
    }
    else if(a.values[i].pos === b.values[j].pos)
    {
      //Add the b values
      for(var k = 0; k < b.ncov; k++){ a.values[i].cov.push(b.values[j].cov[k]); }

      //Add the a object
      pos.push(a.values[i]);

      //Increment the counters
      i = i + 1;
      j = j + 1;
    }
  }

  //Finish the a file
  while(i <= a.chrs[ai].end)
  {
    //Insert a 0 to the last position
    for(var k = 0; k < b.ncov; k++){ a.values[i].cov.push(0); }

    //Add the a object
    pos.push(a.values[i]);

    //Increment the i
    i = i + 1;
  }

  //Finish the b file
  while(j <= b.chrs[bi].end)
  {
    //Insert 0s to the first position
    for(var k = 0; k < a.ncov; k++){ b.values[j].cov.splice(0, 0, 0); }

    //Add the b object
    pos.push(b.values[j]);

    //Increment the j
    j = j + 1;
  }

  //Return the merged chromosome
  return pos;
}

//Function for complete one chromosome
function CompleteChr(a, i, n, p)
{
  //New chromosome
  var pos = [];

  //Read all the positions of the chromosome
  for(var j = a.chrs[i].start; j <= a.chrs[i].end; j++)
  {
    //Insert
    for(var k = 0; k < n; k++)
    {
      //Check the position
      if(p === 'start')
      {
        //Insert at the start
        a.values[j].cov.splice(0, 0, 0);
      }
      else
      {
        //Insert at the end
        a.values[j].cov.push(0);
      }
    }

    //Insert to the new
    pos.push(a.values[j]);
  }

  //Return the completed chromosome
  return pos;
}

//Function for add the new chromosome values
function AddChr(m, n, chr)
{
  //Create the new chromosome
  m.chrs.push({id: chr, start: m.values.length, end: m.values.length + n.length - 1});

  //Concatenate the two arrays
  m.values = m.values.concat(n);

  //Return the new array
  return m;
}

//Exports to node
module.exports = CoverMerge;
