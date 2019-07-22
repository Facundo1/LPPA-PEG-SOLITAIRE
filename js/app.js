//initializing array that represents a board
var board = [
  [, , { value: 1 }, { value: 1 }, { value: 1 }, ,],
  [, , { value: 1 }, { value: 1 }, { value: 1 }, ,],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [, , { value: 1 }, { value: 1 }, { value: 1 }, ,],
  [, , { value: 1 }, { value: 1 }, { value: 1 }, ,]
]

//Score
var score = 0;
var numberOfPegs = 32;

//creation of pegs 
var selectedPeg = { x: undefined, y: undefined };
var createId = function (rowN, colN) 
{
  return 'peg-' + rowN + '-' + colN;
}

//dynamic id
var getPositionFromId = function (id) {
  var idParts = id && id.length ? id.split('-') : []
  if (idParts.length === 3) {
    return {x: parseInt(idParts[1]),y: parseInt(idParts[2])};
  }
  return {};
}

// Generate functional board
var generateCell = function (cell, rowN, colN) {
  var html = '<button id="' + createId(rowN, colN) + '" class="';
  if (cell && cell.value) {
    html += 'peg';
  }
  else if (cell && cell.value === 0) {
    html += 'hole';
  }
  else {
    html += 'hidden';
  }
  html += '"></button>';
  return html;
}

var generateRow = function (row, rowN) {
  var html = '<ul>';
  for (var j = 0; j < row.length; j++) {
    html += generateCell(row[j], rowN, j)
  }
  html += "</ul>";
  return html;
}

var generateBoard = function () {
  var html = '';
  for (var i = 0; i < board.length; i++) {
    html += generateRow(board[i], i);
  }
  return html;
}

//non-selected peg function
var unselectPeg = function () {
  if (selectedPeg.x !== undefined && selectedPeg.y !== undefined) {
    var prevSelectedId = createId(selectedPeg.x, selectedPeg.y)
    document.getElementById(prevSelectedId).className = 'peg';
  }
}

// function to return a specify element
var getElement = function (id) {
  var element = document.getElementById(id);
  return element || {};
}

// Function to solve the problem that the suggestions not dissappear when there are more than one
var HideRecommendation = function () {
  var suggestions = document.getElementsByClassName('suggestion');
  while (suggestions.length > 0) {
    for (var i = 0; i < suggestions.length; i++) {
      suggestions[i].className = 'hole';
    }
   
  }
}

// Move pegs functions and score with peg-counter
var choosePeg = function (evt) {
  var ball = evt.target;
  var ballClass = ball.className;
  unselectPeg();
  HideRecommendation();
  HideRecommendation();
  if (ballClass === 'peg') {
    selectPeg(ball);
  }
  else if (ballClass === 'selected') {
    selectedPeg.x = undefined;
    selectedPeg.y = undefined;
  }
  else if (ballClass === 'suggestion') {
    moveBall(ball);
 
  }
}

var moveBall = function (ball) {
  ball.className = 'peg';
  var prevSelectedId = createId(selectedPeg.x, selectedPeg.y);
  var RefreshScore = document.getElementById("Score");
  var Winner = document.getElementById("Winner");
  var Counter = document.getElementById("Pegs-Remaining");
  document.getElementById(prevSelectedId).className = 'hole';
  var id = getPositionFromId(ball.id)
  if (id.x > selectedPeg.x) {
    var middleBall = createId(selectedPeg.x + 1, selectedPeg.y)
  }
  else if (id.x < selectedPeg.x) {
    var middleBall = createId(selectedPeg.x - 1, selectedPeg.y)
  }
  else if (id.y > selectedPeg.y) {
    var middleBall = createId(selectedPeg.x, selectedPeg.y + 1)
  }
  else if (id.y < selectedPeg.y) {
    var middleBall = createId(selectedPeg.x, selectedPeg.y - 1)
  }
  document.getElementById(middleBall).className = 'hole';
  selectedPeg.x = undefined;
  selectedPeg.y = undefined;
  score += 100;
  RefreshScore.textContent = "SCORE" +" "+" "+" "+" "+ score;
  numberOfPegs = numberOfPegs - 1;
  Counter.textContent = "PEGS" +" "+" "+" "+" "+ numberOfPegs; 
  if (numberOfPegs === 1) {
    if (id.x == 3 && id.y == 3){
      Winner.textContent = "YOU WON THE GAME";
    }
    else{
      Winner.textContent = "GAME OVER:THE LAST BALL IS NOT IN THE CENTER "
    }
  }
}

// posibbles movements and Count possibles movements
var showRecommendations = function () {
  var near = {
    above: getElement(createId(selectedPeg.x - 1, selectedPeg.y)),
    left: getElement(createId(selectedPeg.x, selectedPeg.y - 1)),
    right: getElement(createId(selectedPeg.x, selectedPeg.y + 1)),
    below: getElement(createId(selectedPeg.x + 1, selectedPeg.y)),
  }

  var possible = {
    above: getElement(createId(selectedPeg.x - 2, selectedPeg.y)),
    left: getElement(createId(selectedPeg.x, selectedPeg.y - 2)),
    right: getElement(createId(selectedPeg.x, selectedPeg.y + 2)),
    below: getElement(createId(selectedPeg.x + 2, selectedPeg.y)),
  }

  if (near.above.className === 'peg' && possible.above.className === 'hole') {
    possible.above.className = 'suggestion';
  }
  if (near.left.className === 'peg' && possible.left.className === 'hole') {
    possible.left.className = 'suggestion';
  }
  if (near.right.className === 'peg' && possible.right.className === 'hole') {
    possible.right.className = 'suggestion';
  }
  if (near.below.className === 'peg' && possible.below.className === 'hole') {
    possible.below.className = 'suggestion';
  }
}

var thisBall = { x: undefined, y: undefined }

var countRecommendations = function () {
  var ballPlaces = document.getElementsByClassName('peg');
  var Winner = document.getElementById("Winner")
  for (var i = 0; i < ballPlaces.length; i++) {
    var thisBall = getPositionFromId(ballPlaces[i].id);
    console.log(thisBall);
    var suggestions = showRecommendations(thisBall);
    if (suggestions.length > 0) {
    return{};
    }
    Winner.textContent = 'GAME OVER: NO MORE POSSIBLE MOVES.';
  }
 
}


var selectPeg = function (peg) {
 
  var idparts = getPositionFromId(peg.id)
  selectedPeg.x = idparts.x
  selectedPeg.y = idparts.y
  peg.className = "selected";
  showRecommendations(); 

}

var AddPegsEventHandlers = function (pegs) {
  for (var i = 0; i < pegs.length; i++) {
    pegs[i].onclick = choosePeg;
  }
}

//menu functions
//reset
var resetBoard = function () {
  var Newboard = [
    [, , { value: 1 }, { value: 1 }, { value: 1 }, ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, ,],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, ,]
  ]
  var boardReseted = document.getElementById('board');
  boardReseted.innerHTML = generateBoard(Newboard);
  var Winner = document.getElementById("Winner");
  var Pegsss = boardReseted.getElementsByTagName('button');
  AddPegsEventHandlers(Pegsss);
  score = 0;
  var PutScore = document.getElementById("Score");
  PutScore.textContent = "SCORE" +" "+" "+" "+" "+ score;
  numberOfPegs = 32;
  var Counter = document.getElementById("Pegs-Remaining");
  Counter.textContent = "PEGS" +" "+" "+" "+" "+ numberOfPegs; 
  Winner.textContent = "PEG SOLITAIRE";
}

//Save game
function BoardValues() {
  var currentBoard = [];
  var myBoard = document.getElementById('board');
  var myUls = myBoard.getElementsByTagName('ul');
  for (var i = 0; i < myUls.length; i++) {
    var myUl = [];
    var myButtons = myUls[i].getElementsByTagName('button');
    for (var j = 0; j < myButtons.length; j++) {
      if (myButtons[j].className === 'peg' || myButtons[j].className === 'selected') 
      { myUl.push({ value: 1 }); }
      else if (myButtons[j].className === 'hole' || myButtons[j].className === 'suggestion') { myUl.push({ value: 0 }); }
      else { myUl.push(undefined); }
    } currentBoard.push(myUl);
  }
  return currentBoard;
}
var SavePegs = function () {
  localStorage.setItem('SaveFile', JSON.stringify(BoardValues()))
  console.log(BoardValues());
}

// Load Game
var LoadPegs = function () {
  var LoadedBoard = document.getElementById('board');
  LoadedBoard.innerHTML = generateBoard(JSON.parse(localStorage.getItem('SaveFile')));
  console.log(JSON.parse(localStorage.getItem('SaveFile')))

  var balls = LoadedBoard.getElementsByTagName('button');
  AddPegsEventHandlers(balls);
 }

 // Instructions
var ShowInstructions = function(){
  document.location.target ="_blank";
  document.location.href = "Instructions.html";
}

// Show Higscores and names

var thisBall = {x: undefined, y: undefined}

var countSuggestions = function(){
  var ballPlaces = document.getElementsByClassName('ball-place');
  var ballCounter = document.getElementById('ball-counter');
  ballCounter.textContent = 'Peg Counter: ' + ballPlaces.length;
  var gameState = document.getElementById('game-state');

  if (ballPlaces.length === 1) {
    var thisBall = createPosition(ballPlaces[0].id);
    if (thisBall.x == 3 && thisBall.y == 3) {
      gameState.textContent = 'Congrats, you won the game.';
    }
    else {
      gameState.textContent = 'You almost did it. The last peg was not in the middle of the board.';
    }
  }
  else {
    gameState.textContent = '';
    for (var i = 0; i < ballPlaces.length; i++) {
      var thisBall = createPosition(ballPlaces[i].id);
      var suggestions = searchSuggestions(thisBall);
      if (suggestions.length > 0) {
        return {};
      }
    }
    gameState.textContent = 'Game over. There are no possible moves.';
  }
}

// initialize game
var init = function () {
  resetBoard();
  var boardElement = document.getElementById("board")
  boardElement.innerHTML = generateBoard()
  var Pegs = boardElement.getElementsByTagName("button");
  AddPegsEventHandlers(Pegs)
  var newGame = document.getElementById('Reset');
  newGame.onclick = resetBoard;
  var SaveGame = document.getElementById("Save");
  SaveGame.onclick = SavePegs;
  var loadGame = document.getElementById("Load");
  loadGame.onclick = LoadPegs;
  var Instructions = document.getElementById("HowToPlay");
  console.log(Instructions);
  Instructions.onclick = ShowInstructions;
  var PutScore = document.getElementById("Score");
  PutScore.textContent = "SCORE" +" "+" "+" "+" "+ score;
  var Counter = document.getElementById("Pegs-Remaining");
  Counter.textContent = "PEGS" +" "+" "+" "+" "+ numberOfPegs; 
}

window.onload = init;
