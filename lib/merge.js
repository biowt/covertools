//Function for merge two cover objects
function CoverMerge(a, b)
{
  //Check for a object
  if(typeof a === 'undefined'){ throw new Error('No cover objects selected.'); }

  //Check for b object
  if(typeof b === 'undefined'){ throw new Error('No cover objects selected.'); }

  //Get the cover num
  var coverA = a[0].length - 2;
  var coverB = b[0].length - 2;

  //Number of output covers
  var cover = coverA + coverB;

  //Merge cover
  var merge = [];

  //Indexes
  var indexA = 0;
  var indexB = 0;

  //For get the actual chromosome
  var chr = a[0][0];

  //Read the full cover
  while(indexA < a.length && indexB < b.length)
  {
    //Reset the status
    var status = 0;

    //Check if chromosome is different
    if(a[indexA][0] !== b[indexB][0])
    {
      //Check if que difference is numeric
  		var numeric = !isNaN(+a[indexA][0] - +b[indexB][0]);

  		//Get the values
  		var va = (numeric === true) ? +a[indexA][0] : a[indexA][0].toLowerCase();
  		var vb = (numeric === true) ? +b[indexB][0] : b[indexB][0].toLowerCase();

      //Find the min chromosome
      if(va < vb)
      {
        //Set status as 1
        status = 1;
      }
      else
      {
        //Set status as 2
        status = 2;
      }
    }
    else
    {
      //Check if positions are the same
      if(a[indexA][1] == b[indexB][1]){ status = 0; }

      //Else, if A position is lower than B position
      else if(a[indexA][1] < b[indexB][1]) { status = 1; }

      //Else
      else { status = 2; }
    }

    //Check the status
    if(status == 0)
    {
      //Add the b values
      for(var k = 0; k < coverB; k++)
      {
        //Insert at the end of the A array
        a[indexA].push(b[indexB][k + 2]);
      }

      //Add the a object
      merge.push(a[indexA]);

      //Increment both counters
      indexA = indexA + 1;
      indexB = indexB + 1;
    }
    else if(status == 1)
    {
      //Insert 0s to A array
      for(var k = 0; k < coverB; k++)
      {
        //Add a zero at the end of the array
        a[indexA].push(0);
      }

      //Add the a object
      merge.push(a[indexA]);

      //Increment the a counter
      indexA = indexA + 1;
    }
    else
    {
      //Insert 0s to B array
      for(var k = 0; k < coverA; k++)
      {
        //Add a zero at the position 2
        b[indexB].splice(2, 0, 0);
      }

      //Add the b object
      merge.push(b[indexB]);

      //Increment the b counter
      indexB = indexB + 1;
    }
  }

  //Add the A values
  while(indexA < a.length)
  {
    //Insert 0s to A array
    for(var k = 0; k < coverB; k++)
    {
      //Add a zero at the end of the array
      a[indexA].push(0);
    }

    //Add the a object
    merge.push(a[indexA]);

    //Increment the A index
    indexA = indexA + 1;
  }

  //Add the B values
  while(indexB < b.length)
  {
    //Insert 0s to B array
    for(var k = 0; k < coverA; k++)
    {
      //Add a zero at the position 2
      b[indexB].splice(2, 0, 0);
    }

    //Add the b object
    merge.push(b[indexB]);

    //Increment the b counter
    indexB = indexB + 1;
  }

  //Return the new array
  return merge;
}

//Exports to node
module.exports = CoverMerge;
