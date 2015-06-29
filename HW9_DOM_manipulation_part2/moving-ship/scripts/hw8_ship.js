window.onload = function() {

var images = {
	background: 'url("assets/images/bg.png")',
	ship: 'url("assets/images/ship.png")'
}
var STAGE = document.getElementById('stage');
var stageWidth = STAGE.offsetWidth;
var stageHeight = STAGE.offsetHeight;
var leftBorder = STAGE.offsetLeft;
var rightBorder = STAGE.offsetLeft + stageWidth;
var topBorder = STAGE.offsetTop;
var bottomBorder = STAGE.offsetTop + stageHeight;


function Background(x,y,speed){
	var xPos = x;
	var yPos = y;
	var speed = speed;
	this.element = document.createElement('DIV');
	this.topElement = document.createElement('DIV');
	STAGE.appendChild(this.element);
	STAGE.appendChild(this.topElement);
	this.element.style.backgroundImage = images.background;
	this.topElement.style.backgroundImage = images.background;
	this.element.style.height = stageHeight + 'px';
	this.topElement.style.height = stageHeight + 'px';
	this.element.style.width = stageWidth + 'px';
	this.topElement.style.width = stageWidth + 'px';

	this.move = function() {
		yPos += speed;
		this.element.style.top =  yPos + 'px';
		this.topElement.style.top = yPos - stageHeight + 'px';
		if (yPos == stageHeight) {
			yPos = 0;
		}
	}
}

function Ship(speed) {
	var speed = speed;
	this.element = document.createElement('div');
	this.element.setAttribute('class', 'ship');
	STAGE.appendChild(this.element);
	this.element.style.backgroundImage = images.ship;

	this.init = function() {
		this.x = (stageWidth - this.element.offsetWidth)/2;
		this.y = stageHeight - this.element.offsetHeight;
		this.element.style.left = this.x + 'px';
		this.element.style.top = this.y + 'px';
	}

	this.move = function() {
		if (KEY_STATUS.moveLeft) {
			this.x = Math.max(this.x - speed,leftBorder);
		}
		if (KEY_STATUS.moveRight) {
			this.x = Math.min(this.x + speed,rightBorder - this.element.offsetWidth);
		}
		if (KEY_STATUS.moveTop) {
			this.y = Math.max(this.y - speed,topBorder);
		}
		if (KEY_STATUS.moveBottom) {
			this.y = Math.min(this.y + speed,bottomBorder - this.element.offsetHeight);
		}
		this.element.style.left = this.x + 'px';
		this.element.style.top = this.y + 'px';
	}

	var bullets = new bulletList(15);

	this.fire = function() {
		if (KEY_STATUS.fire) {
			bullets.getAtPosition(this.x + this.element.offsetWidth/2, this.y);
		}
	}
}

function bulletList(limit) {
	var allBullets = [];
	for (var i = 0; i < limit; i++){
		newBullet = document.createElement('DIV');
		newBullet.setAttribute('class','bullet');
		STAGE.appendChild(newBullet);
		allBullets.push(newBullet);
	}
	this.getAtPosition = function(x,y) {
		var bulletFired = allBullets[limit-1];
		bulletFired.className += ' fired';
		bulletFired.style.left = x + 'px';
		bulletFired.style.top = y + 'px';
		setTimeout(function(){resetClass(bulletFired)},2000);
		allBullets.unshift(allBullets.pop());
	}
	function resetClass(bullet) {
		bullet.className = 'bullet';
		bullet.setAttribute('style','');
	}
}

function animate(){
	background.move();
	ship.move();
	ship.fire();
}

var background = new Background(0,0,5);
var ship = new Ship(15);
ship.init();
var start = setInterval(animate,100);

}

KEY_STATUS = {
	moveLeft : false,
	moveRight: false,
	moveTop: false,
	moveBottom: false,
	fire: false
}

function changeKeyStatus(keyCode, status) {
	switch (keyCode) {
		case 37:
			KEY_STATUS.moveLeft = status;
			break;
		case 39:
			KEY_STATUS.moveRight = status;
			break;
		case 38:
			KEY_STATUS.moveTop = status;
			break;
		case 40:
			KEY_STATUS.moveBottom = status;
			break;
		case 32:
			KEY_STATUS.fire = status;
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