var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var sceneNum = 0;		// Scene number
var pPosX = width/2;	// Initial player position
var pPosY = height/2;	// Initial player position
var destX = 0;
var destY = 0;
var pSpeed = 500;		// Player speed (pixels per second)

var grass = new Image();
grass.src = 'img/grass.png';
var player = new Image();
player.src = 'img/guy.png';

canvas.addEventListener('click', function() {
	destX = event.offsetX;
	destY = event.offsetY;
	movePlayer(destX,destY);
}, false);

setInterval(draw,40);

function draw() {
	drawScene();
	drawPlayer();
	drawBar();
}

function drawScene() {
	// Draw a different scene based on sceneNum
	switch(sceneNum) {
		case 1:
		  break;
		case 2:
		  break;
		// Add cases as needed
		default:
		  var pattern = context.createPattern(grass, 'repeat');
		  context.fillStyle = pattern;
		  context.fillRect(0,0,width,height);
	}
}

function drawPlayer() {
	context.drawImage(player, pPosX - 25, pPosY - 25, 50, 50);
}

function drawBar() {
	context.fillStyle = '#282828';
	context.fillRect(0,0,width,35);
	context.fillStyle = '#ffffff';
	context.font='20px Basic Title Font';
	context.fillText('LifePoints:', 15, 24);
	context.fillText('Money: $', 315, 24);
}

function movePlayer(x,y) {
	if (Math.abs(pPosX - x) > pSpeed / 25 || Math.abs (pPosY - y ) > pSpeed / 25) {
		var xDistance = x - pPosX;
		var yDistance = y - pPosY;
		var move = pSpeed / 25 / (Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
		var xMove = xDistance * move;
		var yMove = yDistance * move;
		pPosX += xMove;
		pPosY += yMove;
		setTimeout(function() {
			movePlayer(destX,destY);
		}, 40);
	}
}