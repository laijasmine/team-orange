export function processString(input){
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

export function processInProgressClasses(input){
	var regex = /[A-Z]{4} [0-9]{3}.+[^(W)]\n/g; //include in progress courses
	var total = input.match(regex);
	var completed = processString(input);
	return total.diff(completed);
}

export function calculateTotalCredit(input){
	var total = /[0-9]\.[0]/g;
	var result = input.match(total);
	if (!result){
		return 0;
	}
	var sum = result.reduce(getSum);
	return sum;
}

export function calculateTotalCreditArray(input){
	var total = /[0-9]\.[0]/g;
	var result = input.match(total);
	return result;
}

function getSum(total, num) {
  return +total + +num;
}

export function calculateScienceCredit(input){
	return 0;
}

export function calculateUpperLevelCredit(input){
	return 0;
}

export function calculateLowerLevelCredit(input){
	return 0;
}

// export {
// 	processString = processString,
// 	calculateTotalCredit = calculateTotalCredit;
// }