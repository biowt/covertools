//Finc chromosome in a array
function findChr(arr, chr)
{
  //Read all the chromosomes
  for(var i = 0; i < arr.chrs.length; i++)
  {
    //Check for chromosome and return the index if exists
    if(arr.chrs[i].id === chr){ return i; }
  }

  //Return -1
  return -1;
}

//Exports to node
module.exports = findChr;
