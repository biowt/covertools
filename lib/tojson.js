//Function for contert a cover matrix to a json object
function CoverToJson(c)
{
	//Output json
	var out = {};

	//Read all the values
	for(var i = 0; i < c.length; i++)
	{
		//Get the chromosome
		var chr = c[i][0];

		//Check if chromosome exists
		if(typeof out[chr] === 'undefined')
		{
			//Create the new chromosome
			out[chr] = {};
		}

		//Get the position
		var pos = c[i][1];

		//Get the cover values
		var cover = c[i].slice(2);

		//Save
		out[chr][pos] = cover;
	}

	//Return the output json
	return out;
}

//Exports to node
module.exports = CoverToJson;
