function processString(input){
	var regex = /[A-Z]{4} [0-9]{3}[A-Z]?.*[0-9].0/g;
	var regex2 = /[A-Z]{4} [0-9]{3}/g;
	var result = input.match(regex);
	if (!result){
		return [];
	}
	result = result.join(", ").match(regex2);
	// result = result.match(regex2);
	return result;
}


exports.processString = processString;