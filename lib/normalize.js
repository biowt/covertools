//Number of decimals
var decimals = 2;

//Function for caltulate the normalized values
function CoverNormalize(c)
{
	//Count the number of covers
	var covers = c[0].length - 2;

	//Check the number
	if(covers <= 1){ return c; }

	//Mean coverage
	var mean = [];

	//Size for each cover
	var size = [];

	//Initialize all the vars
	for(var j = 0; j < covers; j++)
	{
		//Initialize the mean cover
		mean[j] = 0;

		//Initialize the size
		size[j] = c.length;
	}

	//Read all the values
	for(var i = 0; i < c.length; i++)
	{
		//Read all the covers
		for(var j = 0; j < covers; j++)
		{
			//Check for zero
			if(c[i][j + 2] == 0)
			{
				//Remove this value
				size[j] = size[j] - 1;
			}

			//Increment the mean
			mean[j] = mean[j] + c[i][j + 2];
		}
	}

	//For get the min mean value
	var min = mean[0]/size[0];

	//Calculate the mean
	for(var j = 0; j < covers; j++)
	{
		//Calculate the mean
		mean[j] = mean[j]/size[j];

		//Find the min value
		min = (mean[j] < min)? mean[j] : min;
	}

	//Calculate the increment values
	for(var j = 0; j < covers; j++)
	{
		mean[j] = min/mean[j];
	}

	//Update all the values
	for(var i = 0; i < c.length; i++)
	{
		//Read all the covers for this line
		for(var j = 0; j < covers; j++)
		{
			//Update the value
			c[i][j + 2] = c[i][j + 2]*mean[j];

			//Round
			c[i][j + 2] = c[i][j + 2].toFixed(decimals);
		}
	}

	//Return the new matrix
	return c;
}

//Exports to node
module.exports = CoverNormalize;
