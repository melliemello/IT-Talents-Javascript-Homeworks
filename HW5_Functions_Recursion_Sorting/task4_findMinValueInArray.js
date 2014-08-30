
function findMinValue(array) {
	var min = array[0];
	for (var i = 1; i <= array.length - 1; i++) {
		if ( min > array[i]) {
			min = array[i];
		}					
	}
	return min;
}
			