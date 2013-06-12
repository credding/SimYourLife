var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var sceneNum = 0;		// Scene number
var pPosX = width/2;	// Initial player position
var pPosY = height/2;	// Initial player position
var destX = 0;
var destY = 0;
var pSpeed = 500;		// Player speed (pixels per second)

draw();

canvas.addEventListener('click', function() {
	destX = event.offsetX;
	destY = event.offsetY;
	movePlayer(destX,destY);
}, false);

function draw() {
//	drawScene();
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
		  var grass = new Image();
		  grass.src = "img/grass.png";
		  grass.onload = function() {
			  var pattern = context.createPattern(grass, 'repeat');
			  context.fillStyle = pattern;
			  context.fillRect(0,0,width,height);
		  }
	}
	console.log("Scene Drawn");
}

function drawPlayer() {
	var guy = new Image();
	guy.src = "img/guy.png";
	guy.onload = function() {
		context.drawImage(guy, pPosX - 25, pPosY - 25, 50, 50);
	}
}

function drawBar() {
	context.fillStyle = "#282828";
	context.fillRect(0,0,900,35);
	console.log("Bar Drawn");
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
			draw();
			movePlayer(destX,destY);
		}, 40);
	}
}
