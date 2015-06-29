
window.onload = function(){
	var result = document.getElementById('result');
	var cells = document.getElementsByTagName('td');
	var counter = 1;
	var cellStatus = [];
	generateTable();

	for (var i = 0; i < cells.length; i++) {
		cells[i].onclick = function(){
			counter++;
			
			counter % 2 === 0 ? put('X', parseInt(this.id)) : put('O', parseInt(this.id));
			if(
				cellStatus[0] != undefined== cellStatus[1] == cellStatus[2] ||
				cellStatus[3] != undefined== cellStatus[4] == cellStatus[5] ||
				cellStatus[6] != undefined== cellStatus[7] == cellStatus[8] ||
				cellStatus[0] != undefined== cellStatus[3] == cellStatus[6] ||
				cellStatus[1] != undefined== cellStatus[4] == cellStatus[7] ||
				cellStatus[2] != undefined== cellStatus[5] == cellStatus[8] ||
				cellStatus[0] != undefined== cellStatus[4] == cellStatus[8] ||
				cellStatus[2] != undefined== cellStatus[4] == cellStatus[6]
			) {
				alert("done");
				clearX();
			}


		}
	}

		function generateTable(){
			var tableString = '<table style="border:1px solid black; border-collapse:collapse">';
			var tdCounter = 0;
			for (var i= 0; i < 3; i++) {
				tableString += "<tr>";
				for (var j = 0; j <3; j++){
					tableString += "<td id='" + tdCounter + "' style = 'border:1px solid black; width:40px; height:40px;'>";
					tdCounter++;
				}
				tableString += '</tr>';
			}
			tableString += '</table>';
			result.innerHTML = tableString;

		}

		function put(sign, position){
			position == undefined ? Math.ceil(Math.random() * 9 - 1) : position;
			cells[position].innerHTML = sign;
			cellStatus[position] = sign;
		}

		function clearX(){
			for(var i = 0; i < cells.length; i++) {
				cells[i].innerHTML = "";
			}
		}

		function putAndClearX(){
			clearX();
			put('x');
		}

		// var start = setInterval(function(){putAndClearX()},2000);

}
