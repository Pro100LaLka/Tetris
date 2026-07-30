const canv = document.getElementById("canvas");
const ctx = canv.getContext("2d");
const nextShpCanv = document.getElementById("next-shape-canvas");
const nextShpCtx = nextShpCanv.getContext("2d");
const heldShpCanv = document.getElementById("held-shape-canvas");
const heldShpCtx = heldShpCanv.getContext("2d");

const scoreBoard = document.querySelector(".score-board");
const linesBoard = document.querySelector(".lines-cleared");
const levelBoard = document.querySelector(".level-board");

let startingLevel = 1;
let level = startingLevel;
const framesPerSecond = 240;
let gameSpeed = 1 + (level - 1) * 0.4 * 1.05 ** (level - 1);
const cellSize = window.innerHeight / 21;
let score = 0;
let linesCleared = 0;

canv.height = 20 * cellSize;
canv.width = 10 * cellSize;
nextShpCanv.height = 6 * cellSize;
nextShpCanv.width = 6 * cellSize;
heldShpCanv.height = 6 * cellSize;
heldShpCanv.width = 6 * cellSize;

let fieldMap = [
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
	[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
];
const shapes = [
	[[[0, 1, 0],[1, 1, 1],[0, 0, 0]],[[0, 1, 0],[0, 1, 1],[0, 1, 0]],
	[[0, 0, 0],[1, 1, 1],[0, 1, 0]],[[0, 1, 0],[1, 1, 0],[0, 1, 0]]],
	[[[0, 0, 1],[1, 1, 1],[0, 0, 0]],[[0, 1, 0],[0, 1, 0],[0, 1, 1]],
	[[0, 0, 0],[1, 1, 1],[1, 0, 0]],[[1, 1, 0],[0, 1, 0],[0, 1, 0]]],
	[[[1, 0, 0],[1, 1, 1],[0, 0, 0]],[[0, 1, 1],[0, 1, 0],[0, 1, 0]],
	[[0, 0, 0],[1, 1, 1],[0, 0, 1]],[[0, 1, 0],[0, 1, 0],[1, 1, 0]]],
	[[[0, 1, 1],[1, 1, 0],[0, 0, 0]],[[0, 1, 0],[0, 1, 1],[0, 0, 1]],
	[[0, 0, 0],[0, 1, 1],[1, 1, 0]],[[1, 0, 0],[1, 1, 0],[0, 1, 0]]],
	[[[1, 1, 0],[0, 1, 1],[0, 0, 0]],[[0, 0, 1],[0, 1, 1],[0, 1, 0]],
	[[0, 0, 0],[1, 1, 0],[0, 1, 1]],[[0, 1, 0],[1, 1, 0],[1, 0, 0]]],
	[[[1, 1],[1, 1]],[[1, 1],[1, 1]],[[1, 1],[1, 1]],[[1, 1],[1, 1]]],
	[[[0, 0, 0, 0],[1, 1, 1, 1],[0, 0, 0, 0],[0, 0, 0, 0]],
	[[0, 0, 1, 0],[0, 0, 1, 0],[0, 0, 1, 0],[0, 0, 1, 0]],
	[[0, 0, 0, 0],[0, 0, 0, 0],[1, 1, 1, 1],[0, 0, 0, 0]],
	[[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0]]]
];
colors = ["purple", "orange", "blue", "green", "red", "yellow", "lightblue"];

let heldShape;
let holdFlag = true;
let currentShape;
let randNum = getRandNum(0, 6);
let randShape = shapes[randNum][0];
let randColor = colors[randNum];
let nextShape = [randShape, randColor, (5 - Math.floor(randShape[0].length / 2)), 0, randNum, 0];
getRandShape();


function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandShape() {
  currentShape = nextShape;
  let randNum = getRandNum(0, 6);
  let randShape = shapes[randNum][0];
  let randColor = colors[randNum];
  nextShape = [randShape, randColor, (5 - Math.floor(randShape[0].length / 2)), 0, randNum, 0];
  if (!checkGameOver()) {
    gameOver();
  }
	holdFlag = true
}

function holdShape() {
	if(holdFlag) {
		if(heldShape === undefined) {
			heldShape = currentShape
			heldShape[0] = shapes[heldShape[4]][0]
			heldShape[2] = 5 - Math.floor(heldShape[0][0].length / 2)
			heldShape[3] = 0
			heldShape[5] = 0
			getRandShape()
			holdFlag = false
		}
		else {
			let tempHeldShape = heldShape
			heldShape = currentShape
			heldShape[0] = shapes[heldShape[4]][0]
			heldShape[2] = 5 - Math.floor(heldShape[0][0].length / 2)
			heldShape[3] = 0
			heldShape[5] = 0
			currentShape = tempHeldShape
			holdFlag = false
		}
	}
}

function drawRect(color, x, y, w, h) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function drawStroke(color, x, y, w, h, linewidth) {
  ctx.strokeStyle = color;
  ctx.lineWidth = linewidth;
  ctx.strokeRect(x, y, w, h);
}

function drawGame() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      drawRect("black", i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      drawStroke("grey", i * cellSize, j * cellSize, cellSize, cellSize, 1);
    }
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 20; j++) {
      if (fieldMap[j][i][0] === 0) continue;
      drawRect(
        fieldMap[j][i][1],
        i * cellSize,
        j * cellSize,
        cellSize,
        cellSize
      );
    }
  }
}

function drawNextShape() {
  nextShpCtx.fillStyle = "black";
  nextShpCtx.fillRect(0, 0, 100 * cellSize, 100 * cellSize);
  nextShpCtx.fillStyle = nextShape[1];
  for (let i = 0; i < nextShape[0].length; i++) {
    for (let j = 0; j < nextShape[0].length; j++) {
      if (nextShape[0][j][i] === 0) continue;
      nextShpCtx.fillRect(
        (i + 3 - nextShape[0].length / 2) * cellSize,
        (j + 2) * cellSize,
        cellSize,
        cellSize
      );
    }
  }
}

function drawHeldShape() {
  heldShpCtx.fillStyle = "black";
  heldShpCtx.fillRect(0, 0, 100 * cellSize, 100 * cellSize);
	if(!(heldShape === undefined)) {
  heldShpCtx.fillStyle = heldShape[1];
		for (let i = 0; i < heldShape[0].length; i++) {
			for (let j = 0; j < heldShape[0].length; j++) {
				if (heldShape[0][j][i] === 0) continue;
				heldShpCtx.fillRect(
					(i + 3 - heldShape[0].length / 2) * cellSize,
					(j + 2) * cellSize,
					cellSize,
					cellSize
				);
			}
		}
	}
}

function drawCurShape() {
  let curColor = currentShape[1];
  for (let i = 0; i < currentShape[0].length; i++) {
    for (let j = 0; j < currentShape[0].length; j++) {
      if (currentShape[0][j][i] === 0) continue;
      drawRect(
        curColor,
        (currentShape[2] + i) * cellSize,
        (currentShape[3] + j) * cellSize,
        cellSize,
        cellSize
      );
    }
  }
  let tempCurShape = [
    currentShape[0],
    currentShape[1],
    currentShape[2],
    currentShape[3],
    currentShape[4],
    currentShape[5],
  ];
  while (
    (() => {
      for (let i = 0; i < tempCurShape[0].length; i++) {
        for (let j = 0; j < tempCurShape[0].length; j++) {
          if (tempCurShape[0][j][i] === 0) continue;
          if (j + tempCurShape[3] + 1 > 19) {
            return false;
          } else if (
            fieldMap[j + tempCurShape[3] + 1][i + tempCurShape[2]][0] === 1
          ) {
            return false;
          }
        }
      }
      return true;
    })()
  ) {
    tempCurShape[3] += 1;
  }
  for (let i = 0; i < tempCurShape[0].length; i++) {
    for (let j = 0; j < tempCurShape[0].length; j++) {
      if (tempCurShape[0][j][i] === 0) continue;
      drawStroke(
        curColor,
        (tempCurShape[2] + i) * cellSize + 2,
        (tempCurShape[3] + j) * cellSize + 2,
        cellSize - 4,
        cellSize - 4,
        4
      );
    }
  }
}

function addShape() {
  for (let i = 0; i < currentShape[0].length; i++) {
    for (let j = 0; j < currentShape[0].length; j++) {
      if (currentShape[0][j][i] === 0) continue;
      fieldMap[j + currentShape[3]][i + currentShape[2]] = [1, currentShape[1]];
    }
  }
  checkLines();
}

function checkLines() {
  let complete = false;
  let linesAmount = 0;
  while (!complete) {
    let found = false;
    for (let i = 0; i < 20; i++) {
      let flag = true;
      for (let j = 0; j < 10; j++) {
        if (fieldMap[i][j][0] === 0) {
          flag = false;
          break;
        }
      }
      if (flag) {
        fieldMap.splice(i, 1);
        fieldMap.unshift([
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ]);
        found = true;
        linesAmount += 1;
        break;
      }
    }
    if (!found) complete = true;
  }
  linesCleared += linesAmount;
  score +=
    level *
    (linesAmount === 1
      ? 40
      : linesAmount === 2
      ? 100
      : linesAmount === 3
      ? 300
      : linesAmount === 4
      ? 1200
      : 0);
  level = startingLevel + Math.floor(linesCleared / 10);
  gameSpeed = 1 + (level - 1) * 0.4 * 1.05 ** (level - 1);
}

function checkGameOver() {
  for (let i = 0; i < currentShape[0].length; i++) {
    for (let j = 0; j < currentShape[0].length; j++) {
      if (currentShape[0][j][i] === 0) continue;
      if (fieldMap[j + currentShape[3]][i + currentShape[2]][0] === 1) {
        return false;
      }
    }
  }
  return true;
}
function gameOver() {
  clearInterval(frameUpdate);
  clearInterval(gameUpdate);
  alert(`Game Over | Score: ${score}`);
  location.reload();
}

function checkBottom() {
  for (let i = 0; i < currentShape[0].length; i++) {
    for (let j = 0; j < currentShape[0].length; j++) {
      if (currentShape[0][j][i] === 0) continue;
      if (j + currentShape[3] + 1 > 19) {
        return false;
      } else if (
        fieldMap[j + currentShape[3] + 1][i + currentShape[2]][0] === 1
      ) {
        return false;
      }
    }
  }
  return true;
}
function checkLeft() {
  for (let i = 0; i < currentShape[0].length; i++) {
    for (let j = 0; j < currentShape[0].length; j++) {
      if (currentShape[0][j][i] === 0) continue;
      if (i + currentShape[2] - 1 < 0) {
        return false;
      } else if (
        fieldMap[j + currentShape[3]][i + currentShape[2] - 1][0] === 1
      ) {
        return false;
      }
    }
  }
  return true;
}
function checkRight() {
  for (let i = 0; i < currentShape[0].length; i++) {
    for (let j = 0; j < currentShape[0].length; j++) {
      if (currentShape[0][j][i] === 0) continue;
      if (i + currentShape[2] + 1 > 9) {
        return false;
      } else if (
        fieldMap[j + currentShape[3]][i + currentShape[2] + 1][0] === 1
      ) {
        return false;
      }
    }
  }
  return true;
}
function checkRotation() {
  let tempShape = shapes[currentShape[4]][(currentShape[5] + 1) % 4];
  for (let i = 0; i < tempShape.length; i++) {
    for (let j = 0; j < tempShape.length; j++) {
      if (tempShape[j][i] === 0) continue;
      if (i + currentShape[2] > 9) {
				return 'r'
			}
      if (i + currentShape[2] < 0) {
				return 'l'
			}
      if (j + currentShape[3] > 19) {
        return 'd';
      } else if (fieldMap[j + currentShape[3]][i + currentShape[2]][0] === 1) {
        if(j === tempShape.length - 1) {
					return 'd'
				}
				else if(i === 0) {
					return 'l'
				}
				else if(i === tempShape.length - 1) {
					return 'r'
				}
      }
    }
  }
  return true;
}

function moveBottom() {
  currentShape[3] += 1;
}
function moveAllTheWayBottom() {
  while (checkBottom()) {
    currentShape[3] += 1;
  }
	addShape();
	getRandShape();
}
function moveLeft() {
  currentShape[2] -= 1;
}
function moveRight() {
  currentShape[2] += 1;
}
function makeRotation() {
	if(checkRotation() === true) {
		currentShape[0] = shapes[currentShape[4]][(currentShape[5] + 1) % 4];
		currentShape[5] = (currentShape[5] + 1) % 4;
	}
	else if(checkRotation() === 'd') {
		currentShape[3] -= 1
		makeRotation()
	}
	else if(checkRotation() === 'l') {
		currentShape[2] += 1
		makeRotation()
	}
	else if(checkRotation() === 'r') {
		currentShape[2] -= 1
		makeRotation()
	}
}

function scoreUpdate() {
  scoreBoard.textContent = `SCORE: ${score}`;
  linesBoard.textContent = `LINES: ${linesCleared}`;
  levelBoard.textContent = `LEVEL: ${level}`;
}

let overallTimeout;
let partTimeout;
let timeoutsFlag = true
function shapeInBottom() {
	if(checkBottom()) {
		clearTimeout(overallTimeout)
		clearTimeout(partTimeout)
	}
	else {
		timeoutsFlag = false
		overallTimeout = setTimeout(() => {
			addShape();
			getRandShape();
			clearTimeout(partTimeout)
			timeoutsFlag = true
		}, 1500);
		partTimeout = setTimeout(() => {
			addShape();
			getRandShape();
			clearTimeout(overallTimeout)
			timeoutsFlag = true
		}, 310);
	}
}

let prevGameSpeed = gameSpeed
let gameUpdate = gameUpdateInterval()
function gameUpdateInterval() {
	return setInterval(() => {
		if(timeoutsFlag) {
			shapeInBottom()
		}
		if(checkBottom()) {
			currentShape[3] += 1;
		}
	}, 1000 / gameSpeed);
}

let frameUpdate = setInterval(() => {
  drawGame();
  drawCurShape();
  drawNextShape();
	drawHeldShape();
  scoreUpdate();
	if (prevGameSpeed != gameSpeed) {
		clearInterval(gameUpdate)
		prevGameSpeed = gameSpeed
		gameUpdate = gameUpdateInterval();
	}
}, 1000 / framesPerSecond);

document.addEventListener("keydown", (e) => {
	if(!(timeoutsFlag)) {
		clearTimeout(partTimeout)
		partTimeout = setTimeout(() => {
			addShape();
			getRandShape();
			clearTimeout(overallTimeout)
			timeoutsFlag = true
		}, 310);
	}
  if (e.keyCode === 37 || e.keyCode === 65) {
    // arrLeft
    if (checkLeft()) {
      moveLeft();
    }
  }
  if (e.keyCode === 39 || e.keyCode === 68) {
    // arrRight
    if (checkRight()) {
      moveRight();
    }
  }
  if (e.keyCode === 40 || e.keyCode === 83) {
    // arrBottom
    if (checkBottom()) {
      moveBottom();
    }
  }
  if (e.keyCode === 38 || e.keyCode === 90 || e.keyCode === 87) {
    // arrUp || z
    if (checkRotation()) {
      makeRotation();
    }
  }
  if (e.keyCode === 32) {
    // spaceBar
    moveAllTheWayBottom();
  }
	if(e.keyCode === 67) {
		// c
		holdShape()
	}
});