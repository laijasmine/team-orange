var newSelectedItem = "";

function updateUI(inputMenuItemString, outputMenuItemString, selectedItem){
	var dropDown = document.getElementsByName('OutputDropdown')[0].options;
	newSelectedItem = selectedItem;
	var disabled = [];
	for (var i = 0; i < dropDown.length; i++){
		dropDown[i].disabled = false;
	}
	switch (inputMenuItemString){
		case "2":
		case "8":
		case "10":
		case "16":
		case "36":
			disabled.push('64'); //disable BASE64 only
			if (selectedItem === '64'){
				newSelectedItem = '36';
			}
			break;
		case "String":
			disabled = ['2','8', '10', '16'];
			if (disabled.indexOf(selectedItem) !== -1){
				newSelectedItem = '64';
			}
			break;
		default:
			break;
	}
	for (var j = 0; j < dropDown.length; j++){
		if (disabled.indexOf(dropDown[j].value) !== -1){
			dropDown[j].disabled = true;
		}
	}
	if (inputMenuItemString === "String" && outputMenuItemString === "32"){
		document.getElementById('RHSDivWarn').innerHTML = "Converting from string to base 32 is case insensitive!";
	} else {
		document.getElementById('RHSDivWarn').innerHTML = "";
	}
}

function getNewSelectedItem(){
	return newSelectedItem;
}


module.exports = {
	updateUI: updateUI,
	getNewSelectedItem: getNewSelectedItem
}
