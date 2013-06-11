var c=document.getElementById("sylGame");
var ctx=c.getContext("2d");

var sceneNum=0;
var pPosX=400;
var pPosY=200;

setInterval(draw(),40)

canvas.addEventListener('click',function() {},false);

function draw() {
	ctx.clearRect(0,0,800,400);
	drawScene();
	drawPlayer();
}

function drawScene() {
	if (sceneNum==0) {
		ctx.fillStyle="#69B32D";
		ctx.fillRect(0,0,800,400);
	}
}

function drawPlayer() {
	var player_fill=ctx.createRadialGradient(pPosX,pPosY,0,pPosX,pPosY,10);
	player_fill.addColorStop(0,"#EDD6CA");
	player_fill.addColorStop(1,"#F5A77D");
	ctx.fillStyle=player_fill;
	ctx.beginPath();
	ctx.arc(pPosX,pPosY,10,0,2*Math.PI,true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

