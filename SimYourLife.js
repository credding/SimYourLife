function initialise() {
	var canvas=document.getElementById("gameCanvas");
	var context=canvas.getContext("2d");

	var width=canvas.width;
	var height=canvas.height;

	var sceneNum=0;
	var pPosX=width/2;
	var pPosY=height/2;

	canvas.addEventListener('mousedown',movePlayer(),false);

	draw();
}

function draw() {
	drawScene();
	drawPlayer();
}

function drawScene() {
	context.clearRect(0,0,width,height);
	context.fillStyle="#539c05";
	context.fillRect(0,0,width,height);
}

function drawPlayer() {
	var player_fill=context.createRadialGradient(pPosX,pPosY,0,pPosX,pPosY,10);
	player_fill.addColorStop(0,"#EDD6CA");
	player_fill.addColorStop(1,"#F5A77D");
	context.fillStyle=player_fill;
	context.beginPath();
	context.arc(pPosX,pPosY,10,0,2*Math.PI,true);
	context.closePath();
	context.fill();
	context.stroke();
}

function movePlayer(event) {

}