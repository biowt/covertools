//Import dependencies
var bedJS = require('bedjs');

//Import utils
var findChr = require('./utils/find-chr.js');

//Function for split a cover object in regions defined by a bed file
function CoverSplit(c, b, f)
{
  //Check for open the bed file
  if(typeof b === 'string')
  {
    //Read the bed file
    b = bedJS.Read(b);
  }

  //Group the bed file
  var bed = bedJS.Group(b);

  //Output object
  var out = [];

  //Initialize the empty array
  var emp = EmptyCover(c.ncov);

  //Read all the regions in the bed file
  for(var i = 0; i < bed.length; i++)
  {
    //Get the region
    var reg = bed[i];

    //Initialize the output
    var obj = {chrs: [], ncov: c.ncov, values: [], name: reg.name};

    //Add the number of chromosomes
    obj.chrs.push({id: reg.chr, start: 0, end: 0});

    //Get the chromosome index
    var index = findChr(c, reg.chr);

    //Check if chromosome exists
    if(index > -1)
    {
      //Add the values
      obj.values = GenerateRegion(c, index, reg.start, reg.end, emp, f);
    }
    else
    {
      //Add a empty region
      obj.values = EmptyRegion(reg.start, reg.end, emp);
    }

    //Add the end chromosome position
    obj.chrs[0].end = obj.values.length - 1;

    //Add to the out
    out.push(obj);
  }

  //Return the split cover
  return out;
}

//Function for generate the empty cover
function EmptyCover(n)
{
  //Output
  var o = [];

  //Generate
  for(var i = 0; i < n; i++){ o.push(0); }

  //Return the array
  return o;
}

//Function for insert a empty region
function EmptyRegion(start, end, empty)
{
  //Initialize the output array
  var o = [];

  //From start to end
  for(var j = start; j <= end; j++)
  {
    //Insert the empty region
    o.push({pos: j, cover: empty});
  }

  //Return the out
  return o;
}

//Function for find the start position
function FindStartIndex(c, is, ie, start)
{
  //Check for array start
  if(start <= c[is].pos ){ return 0; }

  //Check for array end
  if(c[ie].pos <= start){ return c.length; }

  //Find the index in the array
  var first = is, last = ie, num = c.length, middle = 0;

  //Loop
  while( num > 1)
  {
    //Middle position
    middle = first + Math.floor((last - first)/2);

    //Check
    if(start === c[middle].pos)
    {
      //Return this index
      return middle;
    }
    if(start < c[middle].pos)
    {
      //Set the first as the middle
      last = middle;
    }
    else
    {
      //Set the last as the middle
      first = middle;
    }

    //Update the items left
    num = last - first;
  }

  //Find the index
  while(start > c[middle].pos && middle < ie){ middle = middle + 1; }

  //Return the index
  return middle;
}

//Function for generate the region
function GenerateRegion(c, i, start, end, empty, f)
{
  //Initialize the out
  var o = [];

  //Counters
  var j = FindStartIndex(c.values, c.chrs[i].start, c.chrs[i].end, start);
  var k = start;

  //Insert all
  while(j <= c.chrs[i].end && k <= end)
  {
    //Check
    if(c.values[j].pos == k)
    {
      //Insert the value
      o.push(c.values[j]);

      //Increment the j counter
      j = j + 1;
    }
    else if(f === true)
    {
      //Insert the null value
      o.push({pos: k, cover: empty});
    }

    //Increment the k
    k = k + 1;
  }

  //Insert the others null values
  while(k <= end && f === true)
  {
    //Insert the null value
    o.push({pos: k, cover: empty});

    //Increment the k
    k = k + 1;
  }

  //Return the out
  return o;
}

//Exports to node
module.exports = CoverSplit;
