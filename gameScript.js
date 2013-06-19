var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(event) {
	mPosX = event.offsetX;
	mPosY = event.offsetY;
}, false);

canvas.addEventListener('click', function(event) {
	mClickX = event.offsetX;
	mClickY = event.offsetY;
}, false);

function getParam(sname) {
	var params = location.search.substr(location.search.indexOf("?")+1);
	var sval = "";
	params = params.split("&");
	// split param and value into individual pieces
	for (var i=0; i<params.length; i++) {
		temp = params[i].split("=");
		if ( [temp[0]] == sname ) { sval = temp[1]; }
	}
	return sval;
}
if (getParam('cheat') == 'true') {
	window.addEventListener('keydown', function(event) {
		switch(event.keyCode) {
			case 76:
			  pLife += 100;
			  break;
			case 77:
			  pMoney += 1000;
			  break;
			case 65:
			  pAge++;
			  break;
		}
	}, false);
}

// Define Image Objects
var grass = new Image();
var tile = new Image();
var guy = new Image();
var happy = new Image();
var sad = new Image();
var pause = new Image();
var house = new Image();
var school = new Image();
var college = new Image();
var university = new Image();
var work = new Image();
var mcronalds = new Image();
var retail = new Image();
var ispy = new Image();
var engineer = new Image();

// Load Image Objects
grass.src = 'img/grass.png';
tile.src = 'img/tile.png';
guy.src = 'img/guy.png';
//happy.src = 'img/smile.png';
//sad.src = 'img/frown.png';
pause.src = 'img/pause.png';
house.src = 'img/house.new.png';
school.src = 'img/school.new.png';
college.src = 'img/college.new.png';
university.src = 'img/university.new.png';
work.src = 'img/work.new.png';
mcronalds.src = 'img/mcronalds.png';
retail.src = 'img/salesperson.png';
ispy.src = 'img/ispy.png';
engineer.src = 'img/engineer.png';

// Mouse & Keyboard variables
var mPosX;			// Current Mouse Position
var mPosY;			// Current Mouse Position
var mClickX;		// Mouse Click Position
var mClickY; 		// Mouse Click Position

function initialize() {
	// Parameter variables
	window.state = 0;			// Current game state
	window.prestate = 1;		// Previous game state
	window.sceneNum = 0;		// Scene to draw

	window.pPosX = 530;			// Initial player position
	window.pPosY = 300;			// Initial player position
	window.destX = 530;			// Player destination
	window.destY = 300;			// Player destination
	window.pSpeed = 300;		// Player speed (pixels per second)

	window.attSchool = 0;
	window.attCollege = 0;
	window.attUniversity = 0;
	window.gotEngineering = false;

	window.pLife = 0;			// Player initial LifePoints
	window.pMoney = 0;			// Player initial Money
	window.pAge = 14;			// Player initial Age
	window.pAgeRate = 60;		// Player Age Rate (seconds)
	window.pMood = true;		// Player initial Mood (true = happy, false = sad)
}

initialize();

setInterval(tick,40);

function tick() {
	switch(state) {
		case 0:
		  bar();
		  scene();
		  shade();
		  drawPause();
		  break;
		case 1:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  drawMain();
		  break;
		case 2:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  shade();
		  drawSchool();
		  break;
		case 3:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  shade();
		  drawCollege();
		  break;
		case 4:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  shade();
		  drawUniversity();
		  break;
		case 5:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  drawWork();
		  break;
		case 6:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  shade();
		  drawMcRonalds();
		  break;
		case 7:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  shade();
		  drawRetail();
		  break;
		case 8:
		  bar();
		  age();
		  pauseButton();
		  scene();
		  shade();
		  drawEngineering();
		  break;
		case 9:
		  bar();
		  scene();
		  shade();
		  drawGameOver();
	}
}

// Screens
function drawPause() {
	gameCanvas.style.cursor = 'default';
	context.fillStyle = '#539c05';
	if (250 <= mPosX && mPosX <= 650 && 195 <= mPosY && mPosY <= 240)
		context.fillStyle = '#bdbdbd';
	context.fillRect(250, 195, 400, 45);
	context.fillStyle = '#539c05';
	if (250 <= mPosX && mPosX <= 650 && 250 <= mPosY && mPosY <= 295)
		context.fillStyle = '#bdbdbd';
	context.fillRect(250, 250, 400, 45);
	context.fillStyle = '#ffffff';
	context.font = '30px Basic Title Font';
	context.fillText('Play', 424, 228);
	context.fillText('Restart', 404, 283);
	if (250 <= mClickX && mClickX <= 650 && 195 <= mClickY && mClickY <= 240) {
		state = prestate;
		mClickX = '';
		mClickY = '';
	}
	if (250 <= mClickX && mClickX <= 650 && 250 <= mClickY && mClickY <= 295) {
		initialize();
		state = prestate;
		mClickX = '';
		mClickY = '';
	}
	context.font = '15px Noto Sans';
	context.fillText('Accumulate as much money and LifePoints as you can before you turn 30.', 200, 180);
}

function drawMain() {
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
				startSchool();
				state = 2;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (20 <= mClickX && mClickX <= 170 && 175 <= mClickY && mClickY <= 275) {
			destX = mClickX;
			destY = mClickY;
			if (20 <= pPosX && pPosX <= 170 && 175 <= pPosY && pPosY <= 275) {
				startCollege();
				state = 3;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (20 <= mClickX && mClickX <= 170 && 295 <= mClickY && mClickY <= 395) {
			destX = mClickX;
			destY = mClickY;
			if (20 <= pPosX && pPosX <= 170 && 295 <= pPosY && pPosY <= 395) {
				startUniversity();
				state = 4;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (750 <= mClickX && mClickX <= 850 && 100 <= mClickY && mClickY <= 300) {
			destX = mClickX;
			destY = mClickY;
			if (750 <= pPosX && pPosX <= 850 && 100 <= pPosY && pPosY <= 300) {
				state = 5;
				sceneNum = 1;
				destX = 530;
				destY = 300;
				mClickX = '';
				mClickY = '';
			}
		}
		else {
			destX = mClickX;
			destY = mClickY;
			mClickX = '';
			mClickY = '';
		}
	}
}

School = new Object();

function startSchool() {
	if (Math.floor(pAge) > 20)
		School.canGo = false;
	else {
		School.canGo = true;
	}
	School.numDone = 0;
	School.numCorrect = 0;

	num1 = new Array();
	num2 = new Array();
	opt0 = new Array();
	opt1 = new Array();
	opt2 = new Array();
	opt3 = new Array();
	School.ansPos = new Array();

	School.prob = function() {
		context.fillStyle = '#ffffff';
		context.font = '30px Noto Sans';
		context.fillText(num1[School.numDone] + ' + ' + num2[School.numDone] + ' =', 220, 175);
		if (240 <= mPosX && mPosX <= 390 && 190 <= mPosY && mPosY <= 220)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('a. ' + opt0[School.numDone], 240, 220);
		if (240 <= mPosX && mPosX <= 390 && 230 <= mPosY && mPosY <= 260)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('b. ' + opt1[School.numDone], 240, 260);
		if (240 <= mPosX && mPosX <= 390 && 270 <= mPosY && mPosY <= 300)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('c. ' + opt2[School.numDone], 240, 300);
		if (240 <= mPosX && mPosX <= 390 && 310 <= mPosY && mPosY <= 340)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('d. ' + opt3[School.numDone], 240, 340);
		if (240 <= mClickX && mClickX <= 390 && 190 <= mClickY && mClickY <= 220) {
			if (School.ansPos[School.numDone] == 0)
				School.numCorrect++;
			School.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 230 <= mClickY && mClickY <= 260) {
			if (School.ansPos[School.numDone] == 1)
				School.numCorrect++;
			School.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 270 <= mClickY && mClickY <= 300) {
			if (School.ansPos[School.numDone] == 2)
				School.numCorrect++;
			School.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 310 <= mClickY && mClickY <= 340) {
			if (School.ansPos[School.numDone] == 3)
				School.numCorrect++;
			School.numDone++;
			mClickX = '';
			mClickY = '';
		}
	}

	for (var i = 0; i < 10; i++) {
		num1[i] = Math.floor(Math.random() * 10);
		num2[i] = Math.floor(Math.random() * 10);
		ans = num1[i] + num2[i];
		if (Math.random() < .5)
			ans1 = ans - (Math.floor(Math.random() * 3) + 1);
		else
			ans1 = ans + (Math.floor(Math.random() * 3) + 1);
		if (Math.random() < .5)
			ans2 = ans - (Math.floor(Math.random() * 3) + 4);
		else
			ans2 = ans + (Math.floor(Math.random() * 3) + 4);
		if (Math.random() < .5)
			ans3 = ans - (Math.floor(Math.random() * 3) + 7);
		else
			ans3 = ans + (Math.floor(Math.random() * 3) + 7);
		School.ansPos[i] = Math.floor(Math.random() * 4)
		switch (School.ansPos[i]) {
			case 0:
			  opt0[i] = ans;
			  opt1[i] = ans1;
			  opt2[i] = ans2;
			  opt3[i] = ans3;
			  break;
			case 1:
			  opt0[i] = ans1;
			  opt1[i] = ans;
			  opt2[i] = ans2;
			  opt3[i] = ans3;
			  break;
			case 2:
			  opt0[i] = ans1;
			  opt1[i] = ans2;
			  opt2[i] = ans;
			  opt3[i] = ans3;
			  break;
			case 3:
			  opt0[i] = ans1;
			  opt1[i] = ans2;
			  opt2[i] = ans3;
			  opt3[i] = ans;
			  break;
		}
	}
}

function drawSchool() {
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390)
		context.fillStyle = '#ffffff';
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		state = 1;
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
	context.fillStyle = '#ffffff';
	context.font = '15px Noto Sans';
	if (School.canGo == false)
		context.fillText('Sorry, you are too old to go to High School.', 220, 135);
	else {
		context.fillText('Complete 10 problems to receive up to 700 LifePoints.', 220, 135);
		context.fillText('Correct: ' + School.numCorrect + ' / ' + School.numDone, 580, 338);
		if (School.numDone < 10)
			School.prob();
		else {
			pLife += 700 * (School.numCorrect / 10);
			attSchool++;
			state = 1;
			destX = 530;
			destY = 300;
		}
	}
}

College = new Object();

function startCollege() {
	if (pLife < 2100 || pMoney < 1000)
		College.canGo = false;
	else {
		College.canGo = true;
	}
	College.numDone = 0;
	College.numCorrect = 0;

	num1 = new Array();
	num2 = new Array();
	opt0 = new Array();
	opt1 = new Array();
	opt2 = new Array();
	opt3 = new Array();
	College.ansPos = new Array();

	College.prob = function() {
		context.fillStyle = '#ffffff';
		context.font = '30px Noto Sans';
		context.fillText(num1[College.numDone] + ' x ' + num2[College.numDone] + ' =', 220, 175);
		if (240 <= mPosX && mPosX <= 390 && 190 <= mPosY && mPosY <= 220)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('a. ' + opt0[College.numDone], 240, 220);
		if (240 <= mPosX && mPosX <= 390 && 230 <= mPosY && mPosY <= 260)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('b. ' + opt1[College.numDone], 240, 260);
		if (240 <= mPosX && mPosX <= 390 && 270 <= mPosY && mPosY <= 300)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('c. ' + opt2[College.numDone], 240, 300);
		if (240 <= mPosX && mPosX <= 390 && 310 <= mPosY && mPosY <= 340)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('d. ' + opt3[College.numDone], 240, 340);
		if (240 <= mClickX && mClickX <= 390 && 190 <= mClickY && mClickY <= 220) {
			if (College.ansPos[College.numDone] == 0)
				College.numCorrect++;
			College.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 230 <= mClickY && mClickY <= 260) {
			if (College.ansPos[College.numDone] == 1)
				College.numCorrect++;
			College.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 270 <= mClickY && mClickY <= 300) {
			if (College.ansPos[College.numDone] == 2)
				College.numCorrect++;
			College.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 310 <= mClickY && mClickY <= 340) {
			if (College.ansPos[College.numDone] == 3)
				College.numCorrect++;
			College.numDone++;
			mClickX = '';
			mClickY = '';
		}
	}

	for (var i = 0; i < 10; i++) {
		num1[i] = Math.floor(Math.random() * 10);
		num2[i] = Math.floor(Math.random() * 10);
		ans = num1[i] * num2[i];
		if (Math.random() < .5)
			ans1 = ans - (Math.floor(Math.random() * 3) + 1);
		else
			ans1 = ans + (Math.floor(Math.random() * 3) + 1);
		if (Math.random() < .5)
			ans2 = ans - (Math.floor(Math.random() * 3) + 4);
		else
			ans2 = ans + (Math.floor(Math.random() * 3) + 4);
		if (Math.random() < .5)
			ans3 = ans - (Math.floor(Math.random() * 3) + 7);
		else
			ans3 = ans + (Math.floor(Math.random() * 3) + 7);
		College.ansPos[i] = Math.floor(Math.random() * 4)
		switch (College.ansPos[i]) {
			case 0:
			  opt0[i] = ans;
			  opt1[i] = ans1;
			  opt2[i] = ans2;
			  opt3[i] = ans3;
			  break;
			case 1:
			  opt0[i] = ans1;
			  opt1[i] = ans;
			  opt2[i] = ans2;
			  opt3[i] = ans3;
			  break;
			case 2:
			  opt0[i] = ans1;
			  opt1[i] = ans2;
			  opt2[i] = ans;
			  opt3[i] = ans3;
			  break;
			case 3:
			  opt0[i] = ans1;
			  opt1[i] = ans2;
			  opt2[i] = ans3;
			  opt3[i] = ans;
			  break;
		}
	}
}

function drawCollege() {
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390)
		context.fillStyle = '#ffffff';
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		state = 1;
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
	context.fillStyle = '#ffffff';
	context.font = '15px Noto Sans';
	if (College.canGo == false) {
		context.fillText('Sorry, you cannot go to community college.', 220, 135);
		context.fillText('You must have 2100 LifePoints and $1000.', 220, 160);
	}
	else {
		context.fillText('Complete 10 problems to receive up to 1400 LifePoints.', 220, 135);
		context.fillText('(Costs $1000)', 580, 313)
		context.fillText('Correct: ' + College.numCorrect + ' / ' + College.numDone, 580, 338);
		if (College.numDone < 10)
			College.prob();
		else {
			pLife += 1400 * (College.numCorrect / 10);
			pMoney -= 1000;
			attCollege++;
			state = 1;
			destX = 530;
			destY = 300;
		}
	}
}

University = new Object();

function startUniversity() {
	if (pLife < 3500 || pMoney < 15000)
		University.canGo = false;
	else {
		University.canGo = true;
	}
	University.numDone = 0;
	University.numCorrect = 0;

	num1 = new Array();
	num2 = new Array();
	num3 = new Array();
	ansType = new Array();
	opt0 = new Array();
	opt1 = new Array();
	opt2 = new Array();
	opt3 = new Array();
	University.ansPos = new Array();

	University.prob = function() {
		context.fillStyle = '#ffffff';
		context.font = '30px Noto Sans';
		if (ansType[University.numDone] < .5)
			context.fillText(num1[University.numDone] + ' + ' + num2[University.numDone] + ' x ' + num3[University.numDone] + ' =', 220, 175);
		else
			context.fillText(num1[University.numDone] + ' x ' + num2[University.numDone] + ' + ' + num3[University.numDone] + ' =', 220, 175);
		if (240 <= mPosX && mPosX <= 390 && 190 <= mPosY && mPosY <= 220)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('a. ' + opt0[University.numDone], 240, 220);
		if (240 <= mPosX && mPosX <= 390 && 230 <= mPosY && mPosY <= 260)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('b. ' + opt1[University.numDone], 240, 260);
		if (240 <= mPosX && mPosX <= 390 && 270 <= mPosY && mPosY <= 300)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('c. ' + opt2[University.numDone], 240, 300);
		if (240 <= mPosX && mPosX <= 390 && 310 <= mPosY && mPosY <= 340)
			context.fillStyle = '#ffffff';
		else
			context.fillStyle = '#bdbdbd';
		context.fillText('d. ' + opt3[University.numDone], 240, 340);
		if (240 <= mClickX && mClickX <= 390 && 190 <= mClickY && mClickY <= 220) {
			if (University.ansPos[University.numDone] == 0)
				University.numCorrect++;
			University.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 230 <= mClickY && mClickY <= 260) {
			if (University.ansPos[University.numDone] == 1)
				University.numCorrect++;
			University.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 270 <= mClickY && mClickY <= 300) {
			if (University.ansPos[University.numDone] == 2)
				University.numCorrect++;
			University.numDone++;
			mClickX = '';
			mClickY = '';
		}
		if (240 <= mClickX && mClickX <= 390 && 310 <= mClickY && mClickY <= 340) {
			if (University.ansPos[University.numDone] == 3)
				University.numCorrect++;
			University.numDone++;
			mClickX = '';
			mClickY = '';
		}
	}

	for (var i = 0; i < 10; i++) {
		num1[i] = Math.floor(Math.random() * 10);
		num2[i] = Math.floor(Math.random() * 10);
		num3[i] = Math.floor(Math.random() * 10);
		ansType[i] = Math.random();
		if (ansType[i] < .5)
			ans = num1[i] + (num2[i] * num3[i]);
		else
			ans = (num1[i] * num2[i]) + num3[i];
		if (Math.random() < .5)
			ans1 = ans - (Math.floor(Math.random() * 3) + 1);
		else
			ans1 = ans + (Math.floor(Math.random() * 3) + 1);
		if (Math.random() < .5)
			ans2 = ans - (Math.floor(Math.random() * 3) + 4);
		else
			ans2 = ans + (Math.floor(Math.random() * 3) + 4);
		if (Math.random() < .5)
			ans3 = ans - (Math.floor(Math.random() * 3) + 7);
		else
			ans3 = ans + (Math.floor(Math.random() * 3) + 7);
		University.ansPos[i] = Math.floor(Math.random() * 4)
		switch (University.ansPos[i]) {
			case 0:
			  opt0[i] = ans;
			  opt1[i] = ans1;
			  opt2[i] = ans2;
			  opt3[i] = ans3;
			  break;
			case 1:
			  opt0[i] = ans1;
			  opt1[i] = ans;
			  opt2[i] = ans2;
			  opt3[i] = ans3;
			  break;
			case 2:
			  opt0[i] = ans1;
			  opt1[i] = ans2;
			  opt2[i] = ans;
			  opt3[i] = ans3;
			  break;
			case 3:
			  opt0[i] = ans1;
			  opt1[i] = ans2;
			  opt2[i] = ans3;
			  opt3[i] = ans;
			  break;
		}
	}
}

function drawUniversity() {
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390)
		context.fillStyle = '#ffffff';
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		state = 1;
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
	context.fillStyle = '#ffffff';
	context.font = '15px Noto Sans';
	if (University.canGo == false) {
		context.fillText('Sorry, you cannot go to university.', 220, 135);
		context.fillText('You must have 3500 LifePoints and $15000.', 220, 160);
	}
	else {
		context.fillText('Complete 10 problems to receive up to 2800 LifePoints.', 220, 135);
		context.fillText('(Costs $15000)', 580, 313)
		context.fillText('Correct: ' + University.numCorrect + ' / ' + University.numDone, 580, 338);
		if (University.numDone < 10)
			University.prob();
		else {
			pLife += 2800 * (University.numCorrect / 10);
			pMoney -= 15000;
			attUniversity++;
			state = 1;
			destX = 530;
			destY = 300;
		}
	}
}

function drawWork() {
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
		context.fillRect(mPosX, mPosY, 160, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText("Work at McRonald's", mPosX + 10, mPosY + 20);
	}
	if (20 <= mPosX && mPosX <= 170 && 175 <= mPosY && mPosY <= 275) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX, mPosY, 120, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Work in Retail', mPosX + 10, mPosY + 20);
	}
	if (20 <= mPosX && mPosX <= 170 && 295 <= mPosY && mPosY <= 395) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX, mPosY, 175, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Become an Engineer!!', mPosX + 10, mPosY + 20);
	}
	if (750 <= mPosX && mPosX <= 850 && 100 <= mPosY && mPosY <= 300) {
		context.fillStyle = '#282828';
		context.fillRect(mPosX - 125, mPosY, 125, 30);
		context.fillStyle = '#ffffff';
		context.font = '15px Noto Sans';
		context.fillText('Go Back Home', mPosX - 115, mPosY + 20);
	}

	// Handle Clicks
	if (0 <= mClickX && mClickX <= 900 && 35 <= mClickY && mClickY <= 500) {
		if (20 <= mClickX && mClickX <= 170 && 55 <= mClickY && mClickY <= 155) {
			destX = mClickX;
			destY = mClickY;
			if (20 <= pPosX && pPosX <= 170 && 55 <= pPosY && pPosY <= 155) {
				startMcRonalds();
				state = 6;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (20 <= mClickX && mClickX <= 170 && 175 <= mClickY && mClickY <= 275) {
			destX = mClickX;
			destY = mClickY;
			if (20 <= pPosX && pPosX <= 170 && 175 <= pPosY && pPosY <= 275) {
				startRetail();
				state = 7;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (20 <= mClickX && mClickX <= 170 && 295 <= mClickY && mClickY <= 395) {
			destX = mClickX;
			destY = mClickY;
			if (20 <= pPosX && pPosX <= 170 && 295 <= pPosY && pPosY <= 395) {
				startEngineering();
				state = 8;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (750 <= mClickX && mClickX <= 850 && 100 <= mClickY && mClickY <= 300) {
			destX = mClickX;
			destY = mClickY;
			if (750 <= pPosX && pPosX <= 850 && 100 <= pPosY && pPosY <= 300) {
				state = 1;
				sceneNum = 0;
				destX = 530;
				destY = 300;
				mClickX = '';
				mClickY = '';
			}
		}
		else {
			destX = mClickX;
			destY = mClickY;
			mClickX = '';
			mClickY = '';
		}
	}
}

McRonalds = new Object();

function startMcRonalds() {
	if (Math.floor(pAge) < 16)
		McRonalds.canGo = false;
	else {
		McRonalds.canGo = true;
	}
	var square = new Array();

	square[1] = Math.floor(Math.random() * 4) + 1;
	square[2] = Math.floor(Math.random() * 4) + 1;
	square[3] = Math.floor(Math.random() * 4) + 1;
	square[4] = Math.floor(Math.random() * 4) + 1;
	square[5] = Math.floor(Math.random() * 4) + 1;

	var curStage = 1;
	var curSquare = 1;

	McRonalds.win = null;

	McRonalds.playGame = function() {
		if (McRonalds.win == null) {
			squares();
			extra();
		}
		else if (McRonalds.win == true) {
			context.fillStyle = '#ffffff';
			context.font = '30px Basic Title Font';
			context.fillText('You Won!', 400, 261);
		}
		else if (McRonalds.win == false) {
			context.fillStyle = '#ffffff';
			context.font = '30px Basic Title Font';
			context.fillText('You Lost', 400, 261);
		}
	}

	extra = function() {
		context.fillStyle = '#282828';
		context.lineWidth = 6;
		context.strokeStyle = '#bdbdbd';
		context.fillRect(400, 225, 100, 50);
		if (400 <= mPosX && mPosX <= 500 && 225 <= mPosY && mPosY <= 275)
			context.strokeRect(400, 225, 100, 50);
		context.fillStyle = '#ffffff';
		context.font = '30px Basic Title Font';
		context.fillText('Begin', 418, 261);
		if (400 <= mClickX && mClickX <= 500 && 225 <= mClickY && mClickY <= 275) {
			showPattern();
			mClickX = '';
			mClickY = '';
		}
	}

	function squares() {
		context.fillStyle = '#AD1515';
		context.fillRect(355, 155, 90, 90);
		context.fillStyle = '#2EAD15';
		context.fillRect(455, 155, 90, 90);
		context.fillStyle = '#1550AD';
		context.fillRect(355, 255, 90, 90);
		context.fillStyle = '#ADA115';
		context.fillRect(455, 255, 90, 90);
	}

	function mouseOver() {
		if (355 <= mPosX && mPosX <= 445 && 155 <= mPosY && mPosY <= 245)
			highlight(1);
		if (455 <= mPosX && mPosX <= 545 && 155 <= mPosY && mPosY <= 245)
			highlight(2);
		if (355 <= mPosX && mPosX <= 445 && 255 <= mPosY && mPosY <= 345)
			highlight(3);
		if (455 <= mPosX && mPosX <= 545 && 255 <= mPosY && mPosY <= 345)
			highlight(4);
	}

	function mouseClick() {
		if (355 <= mClickX && mClickX <= 445 && 155 <= mClickY && mClickY <= 245) {
			check(1);
			mClickX = '';
			mClickY = '';
		}
		if (455 <= mClickX && mClickX <= 545 && 155 <= mClickY && mClickY <= 245) {
			check(2);
			mClickX = '';
			mClickY = '';
		}
		if (355 <= mClickX && mClickX <= 445 && 255 <= mClickY && mClickY <= 345) {
			check(3);
			mClickX = '';
			mClickY = '';
		}
		if (455 <= mClickX && mClickX <= 545 && 255 <= mClickY && mClickY <= 345) {
			check(4);
			mClickX = '';
			mClickY = '';
		}
	}

	function highlight(num) {
		context.lineWidth = 6;
		switch (num) {
			case 1:
			  context.fillStyle = '#E01B1B';
			  context.strokeStyle = '#AD1515';
			  context.fillRect(355, 155, 90, 90);
			  context.strokeRect(355, 155, 90, 90);
			  break;
			case 2:
			  context.fillStyle = '#3CE01B';
			  context.strokeStyle = '#2EAD15';
			  context.fillRect(455, 155, 90, 90);
			  context.strokeRect(455, 155, 90, 90);
			  break;
			case 3:
			  context.fillStyle = '#1B68E0';
			  context.strokeStyle = '#1550AD';
			  context.fillRect(355, 255, 90, 90);
			  context.strokeRect(355, 255, 90, 90);
			  break;
			case 4:
			  context.fillStyle = '#E0D11B';
			  context.strokeStyle = '#ADA115';
			  context.fillRect(455, 255, 90, 90);
			  context.strokeRect(455, 255, 90, 90);
			  break;
		}
	}

	function showPattern() {
		var squareNum = 1;
		extra = function() {}
		blink();

		function blink() {
			setTimeout(function() {
				extra = function() {
					highlight(square[squareNum]);
				}
				setTimeout(function() {
					extra = function() {}
					if (squareNum < curStage) {
						squareNum++
						blink();
					}
					else {
						mClickX = '';
						mClickY = '';
						extra = function() {
							mouseOver();
							mouseClick();
						}
					}
				}, 500);
			}, 500);
		}
	}

	function check(num) {
		if (num == square[curSquare]) {
			if (curStage <= 5)
				if (curSquare < curStage)
					curSquare++;
				else if (curStage < 5) {
					curStage++;
					curSquare = 1;
					showPattern();
				}
			else
				McRonalds.win = true;
		}
		else
			McRonalds.win = false;
	}
}

function drawMcRonalds() {
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390)
		context.fillStyle = '#ffffff';
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		state = 5;
		if (McRonalds.win == true) {
			pMoney += 400;
			pLife += 100;
		}
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
	context.fillStyle = '#ffffff';
	context.font = '15px Noto Sans';
	if (McRonalds.canGo == false) {
		context.fillText('Sorry, you cannot work at McRonalds.', 220, 135);
		context.fillText('You must be 16 years old.', 220, 160);
	}
	else {
		context.fillText('Click on the squares in the order they light up for $400.', 220, 135);
		McRonalds.playGame();
	}
}

Retail = new Object();

function startRetail() {
	if (Math.floor(pAge) < 16 || pLife < 1500)
		Retail.canGo = false;
	else {
		Retail.canGo = true;
	}

	Retail.win = null;

	var time = new Timer(15);

	Retail.game = function() {
		if (Retail.win == null) {
			context.drawImage(ispy,200,155);
			context.fillStyle = '#ffffff';
			context.font = '15px Noto Sans';
			context.fillText('Time Remaining: ' + time.seconds + ' seconds', 220, 378);
			if (Retail.items[Retail.curItem].iPosX <= mClickX && mClickX <= Retail.items[Retail.curItem].iPosX2 && Retail.items[Retail.curItem].iPosY <= mClickY && mClickY <= Retail.items[Retail.curItem].iPosY2) {
				Retail.win = true;
				mClickX = '';
				mClickY - '';
			}
		}
		else if (Retail.win == true) {
			context.fillStyle = '#ffffff';
			context.font = '30px Basic Title Font';
			context.fillText('You Won!', 400, 261);
			time.stop();
		}
		else if (Retail.win == false) {
			context.fillStyle = '#ffffff';
			context.font = '30px Basic Title Font';
			context.fillText('You Lost', 400, 261);
			time.stop();
		}
	}

	Retail.items = new Array();
	Retail.items[1] = new Item('number 65', 165, 155, 195, 180);
	Retail.items[2] = new Item('number 25', 365, 50, 425, 110);
	Retail.items[3] = new Item('number 5', 120, 160, 145, 185);
	Retail.items[4] = new Item('stingray', 75, 0, 115, 50);
	Retail.items[5] = new Item('butterfly', 375, 115, 435, 170);
	Retail.items[6] = new Item('red button', 320, 85, 355, 120);
	Retail.items[7] = new Item('letter M', 165, 110, 200, 150);
	Retail.items[8] = new Item('swordfish', 90, 115, 170, 150);
	Retail.items[9] = new Item('green marble', 70, 125, 90, 145);
	Retail.items[10] = new Item('spool of thread', 425, 50, 460, 95);
	Retail.items[11] = new Item('octopus', 95, 40, 145, 90);
	Retail.items[12] = new Item('ribbon', 155, 30, 185, 90);
	Retail.items[13] = new Item('black car', 200, 95, 230, 140);
	Retail.items[14] = new Item('letter E', 250, 115, 280, 145);
	Retail.items[15] = new Item('cheese', 0, 70, 50, 125);
	Retail.items[16] = new Item('frog', 25, 145, 90, 190);
	Retail.items[17] = new Item('ladybug', 20, 120, 65, 160);
	Retail.items[18] = new Item('triangle', 430, 90, 465, 125);
	Retail.items[19] = new Item('letter V', 190, 15, 225, 55);
	Retail.items[20] = new Item('house', 180, 40, 210, 70);

	Retail.curItem = Math.floor((Math.random() * 20) + 1);

	function Item(name, posX, posY, posX2, posY2) {
		this.iName = name;
		this.iPosX = posX + 200;
		this.iPosY = posY + 155;
		this.iPosX2 = posX2 + 200;
		this.iPosY2 = posY2 + 155;
		this.iWidth = posX2 - posX;
		this.iHeight = posY2 - posY;
	}
	function Timer(seconds) {
		this.seconds = seconds;
		var that = this;
		this.int = setInterval(function() {
			if (that.seconds > 1)
				that.seconds--;
			else {
				that.stop();
				Retail.win = false;
			}
		}, 1000);
		this.stop = function() {
			clearInterval(that.int);
		}
	}
}

function drawRetail() {
	context.fillStyle = '#282828';
	context.fillRect(200, 100, 500, 300);
	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390)
		context.fillStyle = '#ffffff';
	else
		context.fillStyle = '#bdbdbd';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		state = 5;
		if (Retail.win == true) {
			pMoney += 2000;
			pLife += 300;
		}
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
	context.fillStyle = '#ffffff';
	context.font = '15px Noto Sans';
	if (Retail.canGo == false) {
		context.fillText('Sorry, you cannot work in Retail.', 220, 135);
		context.fillText('You must be 16 years old and have 1500 LifePoints', 220, 160);
	}
	else {
		context.fillText('Find the ' + Retail.items[Retail.curItem].iName + ' for $2000.', 220, 135);
		Retail.game();
	}
	context.lineWidth = 2;
	context.strokeStyle = '#282828';
	context.strokeRect(200,100,500,300);
}

Engineering = new Object();

function startEngineering() {
	if (Math.floor(pAge) < 16 || pLife < 15000)
		Engineering.canGo = false;
	else {
		Engineering.canGo = true;
	}
	Engineering.win = null;

	Engineering.maze = function() {
		if (Engineering.win == null) {
			context.fillStyle = '#ab0000';
			context.fillRect(200, 155, 500, 30);
			context.fillRect(200, 185, 30, 215);
			context.fillRect(230, 370, 330, 30);
			context.fillRect(670, 185, 30, 150);
			context.fillRect(530, 220, 30, 150);
			context.fillRect(420, 185, 30, 150);
			context.fillRect(280, 305, 140, 30);
			context.fillRect(280, 205, 30, 100);

			context.fillStyle = '#128bd1';
			context.fillRect(385, 270, 30, 30);

			if ((200 <= mPosX && mPosX <= 700 && 155 <= mPosY && mPosY <= 185) ||
				(200 <= mPosX && mPosX <= 230 && 185 <= mPosY && mPosY <= 400) ||
				(230 <= mPosX && mPosX <= 560 && 370 <= mPosY && mPosY <= 400) ||
				(670 <= mPosX && mPosX <= 700 && 185 <= mPosY && mPosY <= 335) ||
				(530 <= mPosX && mPosX <= 560 && 220 <= mPosY && mPosY <= 370) ||
				(420 <= mPosX && mPosX <= 450 && 185 <= mPosY && mPosY <= 335) ||
				(280 <= mPosX && mPosX <= 420 && 305 <= mPosY && mPosY <= 335) ||
				(280 <= mPosX && mPosX <= 310 && 205 <= mPosY && mPosY <= 305)) {
				Engineering.win = false;
			}

			if (385 <= mPosX && mPosX <= 415 && 270 <= mPosY && mPosY <= 300) {
				context.lineWidth = 6;
				context.strokeStyle = '#0d689c';
				context.strokeRect(385, 270, 30, 30);
			}
			if (385 <= mClickX && mClickX <= 415 && 270 <= mClickY && mClickY <= 300) {
				Engineering.win = true;;
				mClickX = '';
				mClickY = '';
			}
		}
		else if (Engineering.win == true) {
			context.fillStyle = '#282828';
			context.font = '30px Basic Title Font';
			context.fillText('You Won!', 400, 261);
		}
		else if (Engineering.win == false) {
			context.fillStyle = '#282828';
			context.font = '30px Basic Title Font';
			context.fillText('You Lost', 400, 261);
		}
	}
}

function drawEngineering() {
	context.fillStyle = '#bdbdbd';
	context.fillRect(200, 100, 500, 300);

	if (490 <= mPosX && mPosX <= 690 && 345 <= mPosY && mPosY <= 390)
		context.fillStyle = '#ffffff';
	else
		context.fillStyle = '#282828';
	context.font = '30px Basic Title Font';
	context.fillText('Return', 580, 378);
	if (490 <= mClickX && mClickX <= 690 && 345 <= mClickY && mClickY <= 390) {
		state = 5;
		if (Engineering.win == true) {
			pMoney += 20000;
			pLife += 1200;
			gotEngineering = true;
		}
		mClickX = '';
		mClickY = '';
		destX = 530;
		destY = 300;
	}
	context.fillStyle = '#282828';
	context.font = '15px Noto Sans';
	if (Engineering.canGo == false) {
		context.fillText('Sorry, you cannot work as an Engineer.', 220, 135);
		context.fillText('You must be 16 years old and have 15000 LifePoints', 220, 160);
	}
	else {
		context.fillText('Get to the blue square without touching the red walls for $20000.', 220, 135);
		Engineering.maze();
		context.lineWidth = 2;
	}
	context.lineWidth = 2;
	context.strokeStyle = '#282828';
	context.strokeRect(200,100,500,300);
}

function drawGameOver() {
	context.fillStyle = '#ffffff';
	context.font = '150px Basic Title Font';
	context.fillText('Game Over', 125, 200);
	var scoreMultiplier = 1;
	if (attSchool >= 4)
		scoreMultiplier += 0.1;
	if (attCollege >= 2)
		scoreMultiplier += 0.1;
	if (attUniversity >= 4)
		scoreMultiplier += 0.2;
	if (gotEngineering == true)
		scoreMultiplier += 0.3;
	context.font = '30px Basic Title Font';
	context.fillText('Your Score= ' + Math.floor((pLife + pMoney) * scoreMultiplier), 135, 260);
	context.fillStyle = '#539c05';
	if (250 <= mPosX && mPosX <= 650 && 350 <= mPosY && mPosY <= 395)
		context.fillStyle = '#bdbdbd';
	context.fillRect(250, 350, 400, 45);
	context.fillStyle = '#ffffff';
	context.font = '30px Basic Title Font';
	context.fillText('Play Again', 390, 383);
	if (250 <= mClickX && mClickX <= 650 && 350 <= mClickY && mClickY <= 395) {
		initialize();
		state = prestate;
		mClickX = '';
		mClickY = '';
	}
}

// Visual Elements
function bar() {
	// Draw bar
	context.fillStyle = '#282828';
	context.fillRect(0,0,900,35);
	context.fillStyle = '#ffffff';
	context.font = '20px Basic Title Font';
	context.fillText('LifePoints= ' + pLife, 15, 24);
	context.fillText('Money= @' + pMoney, 315, 24);
	context.fillText('Age= ' + Math.floor(pAge), 615, 24);
	/*
	if (pMood)
		context.drawImage(happy, 820, 2);
	else
		context.drawImage(sad, 820, 2);
	*/
}
function pauseButton() {
	context.drawImage(pause, 860, 2);
	if (860 <= mPosX && mPosX <= 890 && 2 <= mPosY && mPosY <= 32)
		gameCanvas.style.cursor = 'pointer';
	else
		gameCanvas.style.cursor = 'default';
	if (860 <= mClickX && mClickX <= 890 && 2 <= mClickY && mClickY <= 32) {
		prestate = state;
		state = 0;
	}
}
function scene() {
	// Draw scene
	switch (sceneNum) {
		case 0:
		  context.fillStyle = context.createPattern(grass, 'repeat');
		  context.fillRect(0, 35, 900, 465);
		  context.drawImage(house, 380, 200);
		  context.drawImage(school, 20, 55);
		  context.drawImage(college, 20, 175);
		  context.drawImage(university, 20, 295);
		  context.drawImage(work, 750, 100);
		  break;
		case 1:
		  context.fillStyle = context.createPattern(tile, 'repeat');
		  context.fillRect(0, 35, 900, 465);
		  context.drawImage(mcronalds, 20, 55);
		  context.drawImage(retail, 20, 175);
		  context.drawImage(engineer, 20, 295);
		  context.drawImage(work, 750, 100);
		  break;
	}
	// Draw player
	context.drawImage(guy, pPosX - 25, pPosY - 25);
}
function shade() {
	context.globalAlpha = 0.9;
	context.fillStyle = '#282828';
	context.fillRect(0, 35, 900, 465);
	context.globalAlpha = 1.0;
}

// Automation Tools
function age() {
	pAge += 1 / (pAgeRate * 25);
	if (pAge > 30)
		state = 9;
}