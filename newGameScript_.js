var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function() {
	mPosX = event.offsetX;
	mPosY = event.offsetY;
}, false);

canvas.addEventListener('click', function() {
	mClickX = event.offsetX;
	mClickY = event.offsetY;
}, false);

var imgID = {'grass', 'guy', 'happy', 'sad', 'pause', 'house', 'school', 'college', 'university', 'work'};

function loadImages(imgnum, callback) {
	eval("window." + imgID[imgnum] + " = new Image();");
	eval(imgID[imgnum] + ".src = 'img/" + imgID[imgnum] + ".png';");
	eval(imgID[imgnum] + ".onload = imageLoaded();");
	function imageLoaded() {
		if (imgnum < imgID.length)
			loadImages(imgnum++, callback);
		else
			callback();
	}
}

loadImages(0, function() {

/*
// Define Image Objects
var grass = new Image();
var guy = new Image();
var happy = new Image();
var sad = new Image();
var pause = new Image();
var house = new Image();
var school = new Image();
var college = new Image();
var university = new Image();
var work = new Image();

// Load Image Objects
grass.src = 'img/grass.png';
guy.src = 'img/guy.png';
happy.src = 'img/smile.png';
sad.src = 'img/frown.png';
pause.src = 'img/pause.png';
house.src = 'img/house.png';
school.src = 'img/school.png';
college.src = 'img/college.png';
university.src = 'img/university.png';
work.src = 'img/work.png';
*/

function initialize() {
	// Parameter variables
	window.prestate = 1;	// Previous screen ID
	window.state = 0;		// Current screen ID

	window.pPosX = 530;		// Initial player position
	window.pPosY = 300;		// Initial player position
	window.destX = 530;		// Player destination
	window.destY = 300;		// Player destination
	window.pSpeed = 300;	// Player speed (pixels per second)

	window.pLife = 0;		// Player initial LifePoints
	window.pMoney = 0;		// Player initial Money
	window.pAge = 14;		// Player initial Age
	window.pAgeRate = 60;	// Player Age Rate (seconds)
	window.pMood = true;	// Player initial Mood (true = happy, false = sad)
}

initialize();

function draw() {
	base();
	switch(state) {
		case 0:
		  drawPause();
		  break;
		case 1:
		  setInterval(drawMain,40);
		  break;
		case 2:
		  drawSchool;
		  break;
		case 3:
		  drawCollege();
		  break;
		case 4:
		  drawUniversity();
		  break;
	}
}

function mouseMove() {
	switch(state) {
		case 0:
		  movePause();
		  break;
		case 2:
		  moveSchool;
		  break;
		case 3:
		  moveCollege();
		  break;
		case 4:
		  moveUniversity();
		  break;
	}
}

function mouseClick() {
	switch(state) {
		case 0:
		  clickPause();
		  break;
		case 2:
		  clickSchool;
		  break;
		case 3:
		  clickCollege();
		  break;
		case 4:
		  clickUniversity();
		  break;
	}
}

function drawPause() {
	gameCanvas.style.cursor = 'default';
	shade();
	context.fillRect(250, 195, 400, 45);
	context.fillRect(250, 250, 400, 45);
	context.fillStyle = '#ffffff';
	context.font = '30px Basic Title Font';
	context.fillText('Play', 424, 228);
	context.fillText('Restart', 404, 283);
}
function drawMain() {
	age();
	pauseButton();
	// Move Player
	if (Math.abs(pPosX - destX) > pSpeed / 25 || Math.abs(pPosY - destY) > pSpeed / 25) {
		var xDistance = destX - pPosX;
		var yDistance = destY - pPosY;
		var move = pSpeed / 25 / (Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
		var xMove = xDistance * move;
		var yMove = yDistance * move;
		pPosX += xMove;
		pPosY += yMove;
	}
	// Draw Tips
	if (20 <= mPosX && mPosX <= 170 && 55 <= mPosY && mPosY <= 155) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX, mPosY, 150, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Go to High School', mPosX + 10, mPosY + 20);
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
	if (750 <= mPosX && mPosX <= 850 && 100 <= mPosY && mPosY <= 300) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX - 100, mPosY, 100, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Go to Work', mPosX -90, mPosY + 20);
	}
	// Handle Clicks
	if (0 <= mClickX && mClickX <= 900 && 35 <= mClickY && mClickY <= 500) {
		if (20 <= mClickX && mClickX <= 170 && 55 <= mClickY && mClickY <= 155) {
			destX = mClickX;
			destY = mClickY;
			if (20 <= pPosX && pPosX <= 170 && 55 <= pPosY && pPosY <= 155) {
				disp = 2;
				data();
				mClickX = '';
				mClickY = '';
			}
		}
		else if (20 <= mClickX && mClickX <= 170 && 175 <= mClickY && mClickY <= 275) {
			if (20 <= mClickX && mClickX <= 170 && 175 <= mClickY && mClickY <= 275) {
				destX = mClickX;
				destY = mClickY;
				if (20 <= pPosX && pPosX <= 170 && 175 <= pPosY && pPosY <= 275) {
					disp = 3;
					data();
					mClickX = '';
					mClickY = '';
				}
			}
		}
		else if (20 <= mClickX && mClickX <= 170 && 295 <= mClickY && mClickY <= 395) {
			if (20 <= mClickX && mClickX <= 170 && 295 <= mClickY && mClickY <= 395) {
				destX = mClickX;
				destY = mClickY;
				if (20 <= pPosX && pPosX <= 170 && 295 <= pPosY && pPosY <= 395) {
					disp = 4;
					data();
					mClickX = '';
					mClickY = '';
				}
			}
		}
		else if (750 <= mClickX && mClickX <= 850 && 100 <= mClickY && mClickY <= 300) {

		}
		else {
			destX = mClickX;
			destY = mClickY;
			mClickX = '';
			mClickY = '';
		}
	}
}
function drawSchool() {
	age();
	pauseButton();
	shade();
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	Data();
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390) {
		context.fillStyle = '#ffffff';
	}
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		disp = 1;
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
}
function drawCollege() {
	age();
	pauseButton();
	shade();
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	Data();
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390) {
		context.fillStyle = '#ffffff';
	}
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		disp = 1;
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
}
function drawUniversity() {
	age();
	pauseButton();
	shade();
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	Data();
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390) {
		context.fillStyle = '#ffffff';
	}
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		disp = 1;
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
}

// Visual Elements
function base() {
	// Draw field
	context.fillStyle = context.createPattern(grass, 'repeat');
	context.fillRect(0, 0, 900, 500);
	context.drawImage(house, 400, 200);
	context.drawImage(school, 20, 55);
	context.drawImage(college, 20, 175);
	context.drawImage(university, 20, 295);
	context.drawImage(work, 750, 100);
	// Draw player
	context.drawImage(guy, pPosX - 25, pPosY - 25);
	// Draw bar
	context.fillStyle = '#282828';
	context.fillRect(0,0,900,35);
	context.fillStyle = '#ffffff';
	context.font = '20px Basic Title Font';
	context.fillText('LifePoints= ' + pLife, 15, 24);
	context.fillText('Money= @' + pMoney, 315, 24);
	context.fillText('Age= ' + Math.floor(pAge), 615, 24);
	if (pMood)
		context.drawImage(happy, 820, 2);
	else
		context.drawImage(sad, 820, 2);
}
function pauseButton() {
	context.drawImage(pause, 860, 2);
	if (860 <= mPosX && mPosX <= 890 && 2 <= mPosY && mPosY <= 32)
		gameCanvas.style.cursor = 'pointer';
	else
		gameCanvas.style.cursor = 'default';
	if (860 <= mClickX && mClickX <= 890 && 2 <= mClickY && mClickY <= 32) {
		predisp = disp;
		disp = 0;
	}
}
function shade() {
	context.globalAlpha = 0.9;
	context.fillStyle = '#282828';
	context.fillRect(0, 35, 900, 465);
	context.globalAlpha = 1.0;
}
});