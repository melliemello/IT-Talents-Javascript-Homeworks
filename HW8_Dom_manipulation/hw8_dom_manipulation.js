window.onload = function() {
	var removeButton = document.getElementById('remove-div-btn');
	var changeColorBtn = document.getElementById('change-color-btn');
	var elements = document.querySelectorAll('div');
	removeButton.addEventListener('click', function(){
		var position = parseInt(document.getElementById('removed-index').value);
		if (elementFound(elements[position])) {
			removeElement(elements[position]);
		}else{
			document.write('You have entered invalid position');
		}
	});

	changeColorBtn.addEventListener('click', function() {
		var position = parseInt(document.getElementById('changed-color-index').value);
		if (elementFound(elements[position])) {
			addClassTo(elements[position], 'changed-color');
		}else{
			document.write('You have entered invalid position');
		}
	})
}

function removeElement(element) {
	if (!element.parentElement || !element.parentElement.removeChild(element)) {
		document.write('The element was not found');
	};
}

function elementFound(element) {
	if (!element){
		return false;
	}else{
		return true;
	}
}

function addClassTo(element , style) {
	element.setAttribute('class', style);
}