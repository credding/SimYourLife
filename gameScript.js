var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

// Parameter Variables
var mPosX;			// Current Mouse Position
var mPosY;			// Current Mouse Position

var pattern;		// Current fill pattern

var pPosX = 450;	// Initial player position
var pPosY = 250;	// Initial player position
var destX = 450;	// Player destination
var destY = 250;	// Player destination
var pSpeed = 300;	// Player speed (pixels per second)

var pLife = 0;		// Player initial LifePoints
var pMoney = 0;		// Player initial Money
var pAge = 16;		// Player initial Age
var pMood = true;	// Player initial Mood (true = happy, false = sad)

// Load Image objects here
var grass = new Image();
grass.src = 'img/grass.png';
var player = new Image();
player.src = 'img/guy.png';
var happy = new Image();
happy.src = 'img/smile.png';
var sad = new Image();
sad.src = 'img/frown.png';
var school = new Image();
school.src = 'img/school.png';
var college = new Image();
college.src = 'img/college.png';
var university = new Image();
university.src = 'img/university.png';

canvas.addEventListener('click', function() {
	destX = event.offsetX;
	destY = event.offsetY;
}, false);

canvas.addEventListener('mousemove', function() {
	mPosX = event.offsetX;
	mPosY = event.offsetY;
});

setInterval(draw,40);
setInterval(age,60000);

function draw() {
	drawScene();
	drawPlayer();
	drawBar();
	drawTip();
}

function age() {
	pAge++;
}

function drawScene() {
	pattern = context.createPattern(grass, 'repeat');
	context.fillStyle = pattern;
	context.fillRect(0,0,900,500);
	context.drawImage(school,20,55);
	context.drawImage(college,20,175);
	context.drawImage(university,20,295);
}

function drawPlayer() {
	if (Math.abs(pPosX - destX) > pSpeed / 25 || Math.abs (pPosY - destY) > pSpeed / 25) {
		var xDistance = destX - pPosX;
		var yDistance = destY - pPosY;
		var move = pSpeed / 25 / (Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
		var xMove = xDistance * move;
		var yMove = yDistance * move;
		pPosX += xMove;
		pPosY += yMove;
	}
	context.drawImage(player, pPosX - 25, pPosY - 25);
}

function drawBar() {
	context.fillStyle = '#282828';
	context.fillRect(0,0,900,35);
	context.fillStyle = '#ffffff';
	context.font = '20px Basic Title Font';
	context.fillText('LifePoints= ' + pLife, 15, 24);
	context.fillText('Money= @' + pMoney, 315, 24);
	context.fillText('Age= ' + pAge, 615, 24);
	if (pMood)
		context.drawImage(happy, 860, 2, 30, 30);
	else
		context.drawImage(sad, 860, 2, 30, 30);
}

function drawTip() {
	if (20 <= mPosX && mPosX <= 170 && 55 <= mPosY && mPosY <= 155) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX, mPosY, 110, 30);
		context.fillStyle = '#ffffff';
		context.font = 'normal normal normal 15px Noto Sans';
		context.fillText('Go to School', mPosX + 10, mPosY + 20);
	}
	if (20 <= mPosX && mPosX <= 170 && 175 <= mPosY && mPosY <= 275) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX, mPosY, 200, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Go to Community College', mPosX + 10, mPosY + 20);
	}
	if (20 <= mPosX && mPosX <= 170 && 295 <= mPosY && mPosY <= 395) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX, mPosY, 135, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Go to University', mPosX + 10, mPosY + 20);
	}
}