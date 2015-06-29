window.onload = function() {
	var inputs = document.querySelectorAll('input.task1');
	var button = document.getElementById('form-button-task1');
	if(inputs.length && button) {
		button.onclick = function(event){checkInputs(inputs, event)};
	}
}

function checkInputs(inputList, event) {
	for (var i = 0; i < inputList.length; i++) {
		var isValid = inputList[i].value.length > 6 ? true : false;
		var errorMessage = inputList[i].parentElement.querySelector('.error-msg');
		if (isValid(inputList[i])) {
			inputList[i].value = inputList[i].value.toUpperCase();
		}else{
			event.preventDefault();
		}
		if (!isValid && !errorMessage) {
			appendErrorTo(inputList[i], "The length should be at least 6 chars");
		}
		if (isValid && errorMessage) {
			inputList[i].parentElement.removeChild(errorMessage);
		}
	}
}

function appendErrorTo(element, message) {
	var newElement = document.createElement('SPAN');
	newElement.setAttribute('class','error-msg');
	newElement.innerHTML = message;
	element.parentElement.appendChild(newElement);
}