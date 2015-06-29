
window.onload = function(){
	var selectionSubmit = document.getElementById('submitInput');
	var tableBody = document.getElementById('formBody');
	counter = 1;
	var input='';
	var label='';
	selectionSubmit.onclick = function(){
		input = document.getElementById('inputSelect').value;
		label = document.getElementById('labelText').value;
		var row = document.createElement("TR");
		formBody.appendChild(row);
		row.innerHTML = generateInput(input, label);
		return false;
	}

	function generateInput(inputType, label){
		return '<td><label for="'+ counter +'" >'+ label + '</label> </td><td><input id="'+ counter + '" type="'+inputType + '">';
		counter++;
	}

}
