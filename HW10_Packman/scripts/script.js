window.onload = function(){

	var startButton = document.getElementById('start');
	var form = document.getElementById('form');

	startButton.onclick = function() {
		var rows = parseInt(document.getElementById('rows').value);
		var cols = parseInt(document.getElementById('cols').value);
		if (isNaN(rows * cols) ||  rows > 11 || cols > 11 || rows < 7 ||cols < 7) {
			alert('Please, enter a valid number in the rang 7-11');
			return false;
		}

		function Game() {
			this.init = function(rows,cols) {
				this.stageCanvas = document.createElement('canvas');
				this.unitsCanvas = document.createElement('canvas');
				this.stageCanvas.id = 'stage';
				this.unitsCanvas.id = 'units';
				document.body.appendChild(this.stageCanvas);
				document.body.appendChild(this.unitsCanvas);
				if (this.stageCanvas.getContext('2d')) {
					this.tileSize = 60;
					this.stageCanvas.setAttribute('height',this.tileSize * rows + 'px');
					this.stageCanvas.setAttribute('width',this.tileSize * cols + 'px');
					this.unitsCanvas.setAttribute('height',this.tileSize * rows + 'px');
					this.unitsCanvas.setAttribute('width',this.tileSize * cols + 'px');
					this.stageContext = this.stageCanvas.getContext('2d');
					this.unitsContext = this.unitsCanvas.getContext('2d');
					this.canvasWidth = this.stageCanvas.width;
					this.canvasHeight = this.stageCanvas.height;
					var grid = new Grid();
					grid.init(rows,cols);
					this.pacman = new Pacman(grid);
					this.pacman.init(0,0,this.tileSize,this.tileSize);
					this.pacman.draw();
				}
			}

			this.end = function() {
				delete this.pacman;
				delete grid;
				document.body.removeChild(game.unitsCanvas);
				document.body.removeChild(game.stageCanvas);
				form.removeChild(document.getElementById('timer'));
				form.removeChild(document.getElementById('score'));
			}
		}

		function Timer(timeLimit) {
			var limit = timeLimit;
			var initalValue = timeLimit;
			var timerElement = document.createElement('DIV');
			form.appendChild(timerElement);
			timerElement.setAttribute('id', 'timer');

			this.stopWatch = function() {
				limit-= 1000/60;
				var sec= Math.floor(limit / 1000);
				timerElement.innerHTML = "Timeleft: " + sec;
				if (sec== 0) {
					game.end();
				}
			}
			this.restartTime = function() {
				limit = initalValue;
			}
		}

		function Score() {
			var score = 0;
			var scoreElement = document.createElement('DIV');
			form.appendChild(scoreElement);
			scoreElement.id =  'score';
			this.update = function(gridContent) {
				score++;
				gridContent = 0;
				scoreElement.innerHTML = 'Score:' + score;
			}
		}

		function Drawable() {
			this.init = function(x,y,width,height) {
				this.xPos = x;
				this.yPos = y;
				this.width = width;
				this.height = height;
			}
			this.speed = 0;
		}

		function Grid() {
			var self = this;
			this.init = function() {
				this.matrix = generateGrid(rows, cols);
				for (var i = 0; i < this.matrix.length; i++) {
					game.stageContext.fillStyle = 'black';
					game.unitsContext.clearRect(0,0,game.canvasWidth,game.canvasHeight);
					var row = this.matrix[i];
					for (var j = 0; j < row.length; j++) {
						if (i!=0 &&  i!=this.matrix.length - 1&& j%2 != 0 ) {
							row[j] = 1;
							var coords = convertIndexToPosition(j,i,game.tileSize);
							game.stageContext.fillStyle = "orange";
							game.stageContext.fillRect(coords.xPos, coords.yPos,game.tileSize,game.tileSize);
						}
					}
				}
			}

			function generateResourceTo(matrix) {
				var maxRows = matrix.length;
				var maxCols = matrix[0].length;
				var row = Math.floor(Math.random() * maxRows);
				var col = Math.floor(Math.random() * maxCols);
				if (matrix[row][col] != 1) {
					matrix[row][col] = 2;
					var coords = convertIndexToPosition(col, row, game.tileSize);
					game.unitsContext.fillStyle = "white";
					game.unitsContext.fillRect(coords.xPos, coords.yPos, 10,10);
				}
			}
			setInterval(function(){generateResourceTo(self.matrix)},2000);
		}

		function Pacman(grid) {
			var rowIndex = 0;
			var colIndex = 0;
			var speed = 3;
			var score = new Score();
			this.timer = new Timer(9000);
			this.draw = function() {
				var xCenter = this.xPos + this.width/2;
				var yCenter = this.yPos + this.height/2;
				game.unitsContext.beginPath();
				game.unitsContext.fillStyle= 'yellow';
				game.unitsContext.arc(xCenter,yCenter,this.width/2,0.3,-0.3);
				game.unitsContext.lineTo(xCenter,yCenter);
				game.unitsContext.fill();
			}
			this.move = function() {
				var newX = this.xPos;
				var newY = this.yPos;
				var newIndeces = false;
				if (KEYS.moveLeft) {
					newX = Math.max(this.xPos - speed,0);
					newY = Math.round(this.yPos / this.height) * this.height;
					newIndeces = convertPositionToIndex(newX, newY, this.width,true)
				}
				if (KEYS.moveRight) {
					newX = Math.min(this.xPos + speed,game.canvasWidth - this.width );
					newY= Math.round(this.yPos / this.height) * this.height;
					newIndeces = convertPositionToIndex(newX, newY, this.width,false)
				}
				if (KEYS.moveTop) {
					newY = Math.max(this.yPos - speed,0);
					newX = Math.round(this.xPos / this.width) * this.width;
					newIndeces = convertPositionToIndex(newX, newY, this.height,true)
				}
				if (KEYS.moveBottom) {
					newY = Math.min(this.yPos + speed,game.canvasHeight - this.height);
					newX = Math.round(this.xPos / this.width) * this.width;
					newIndeces = convertPositionToIndex(newX, newY, this.height,false)
				}
				if (newIndeces && (rowIndex != newIndeces.row || colIndex != newIndeces.col)) {
					var matrixContent = grid.matrix[newIndeces.row][newIndeces.col];
					switch(matrixContent) {
						case 1: 
							game.unitsContext.clearRect(this.xPos , this.yPos,this.width, this.height);
							this.draw();
							return;
						case 2:
							grid.matrix[newIndeces.row][newIndeces.col] = 0;
							this.timer.restartTime();
							score.update();
							break;
					}
				}
				game.unitsContext.clearRect(this.xPos , this.yPos,this.width, this.height);
				this.xPos = newX;
				this.yPos = newY;
				this.draw();
			}
		}
		Pacman.prototype = new Drawable();

		function convertIndexToPosition(row, col, width) {
			var x = row * width ;
			var y = col * width ;
			return {xPos: x, yPos:y};
		}

		function convertPositionToIndex(x,y,width,toFloor) {
			var colIndex = toFloor ? Math.floor(x/width) : Math.ceil(x/width);
			var rowIndex = toFloor? Math.floor(y/width) : Math.ceil(y/width) ;
			return {row: rowIndex, col: colIndex}
		}

		function generateGrid(rows, cols) {
			var matrix= [];
			for (var i = 0; i < rows; i++) {
				matrix[i] = [];
				for (var j = 0; j < cols; j++) {
					matrix[i][j] = 0;
				}
			}
			return matrix;
		}


		var KEYS = {
			moveLeft : false,
			moveRight: false,
			moveTop: false,
			moveBottom: false,
			fire: false
		}

		function changeKeyStatus(keyCode, status) {
		switch (keyCode) {
			case 37:
				KEYS.moveLeft = status;
				break;
			case 39:
				KEYS.moveRight = status;
				break;
			case 38:
				KEYS.moveTop = status;
				break;
			case 40:
				KEYS.moveBottom = status;
				break;
			case 32:
				KEYS.fire = status;
				break;
			default:
				break;
		}
	}
		document.onkeydown = function(event) {
			changeKeyStatus(event.keyCode, true);
		}

		document.onkeyup = function(event) {
			changeKeyStatus(event.keyCode, false);
		}

		window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();

		function animloop(){
			if(game.pacman ){
			  requestAnimFrame(animloop);
			  game.pacman.move();
			  game.pacman.timer.stopWatch();
			}
		}

		var game = new Game();
		game.init(rows,cols);
		animloop();


	}
}