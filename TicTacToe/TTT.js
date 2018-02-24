/**
 * Created by Andy on 2018-01-13.
 */
var board = [];
var userScore = 0;
var computerScore = 0;
var turns;
var win; // TRUE if somebody won the game
var winCombos = [   [0, 1, 2],
                    [0, 4, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 4, 6],
                    [2, 5, 8],
                    [3, 4, 5],
                    [6, 7 , 8]  ];
var HumanOponent = document.getElementById("H-opponent");
var CompOponent = document.getElementById("C-opponent");
var cellsClass = document.querySelectorAll('.cell');
var userScoreSpan = document.getElementById("user-score");
var computerScoreSpan = document.getElementById("computer-score");
var resetGame = document.getElementById('reset-game');
var PickOponent = document.querySelector(".play");
var gameMessage = document.querySelector(".message >p");
var context = { 'userLabel' : 'X', 'computerLabel' : 'O' }; // context is which symbol is on the board.
var currentContext;
var compEnabled = true;

initial();
function initial() {
    for(var i = 0; i< cellsClass.length; i++) {
        cellsClass[i].innerText = '';
        cellsClass[i].removeEventListener('click', clickHandler, false);
    }
    resetGame.disabled = true;
}

//PlayAgain.innerHTML = '';
HumanOponent.addEventListener('click', TwoPlayer ,false);
CompOponent.addEventListener('click', ComputerPlayer,false);
//constructor
function startGame() {
    resetGame.disabled = false;
    setmessage("Make your move.");
    turns = 0;
    if (!win)
    currentContext = computeContext();
    board = [0,1,2,3,4,5,6,7,8];
    for(var i = 0; i< cellsClass.length; i++) {
        cellsClass[i].innerText = '';
        cellsClass[i].addEventListener('click', clickHandler, false);
    }
    resetGame.addEventListener('click', resetGameHandler, false);
}

function TwoPlayer(){
    compEnabled = false;
    PickOponent.innerHTML = "";
    startGame();
}

function ComputerPlayer(){
    PickOponent.innerHTML = "";
    startGame();
}


function computeContext() {
    return (turns % 2 == 0) ? context.userLabel : context.computerLabel; // mod 2 is 0
}

function setmessage(msg) {
    gameMessage.innerHTML = msg;
}


function clickHandler(posId){

    const position =  posId.target.id;
    if(compEnabled == true ){
    if (isEmptyPosition(position) && !checkWin(board, context ) ) {
        change(position, context.userLabel);
    }
        if (!isEmptyPosition(position))
            cellsClass[position].removeEventListener('click', clickHandler, false);                    }

    if(compEnabled == false ){
        if (isEmptyPosition(position) && !checkTie() )
            change(position, computeContext());
    }

        var userWin = checkWin(board, context.userLabel)
        if (userWin) {
            gameOver(userWin);

            userScore++;
            userScoreSpan.innerHTML = userScore;

            if(compEnabled == true )  setmessage("Congratulations!!!! YOU WIN! :D ");
            if(compEnabled == false )  setmessage("Player 1 Wins Good Job :D ");
        }
            if (!userWin && compEnabled == true) {

                //_____________________ COMPUTERS TURN _____________________

                if (!checkTie()) {
                    change(getComputerChoice(), context.computerLabel);

                }//
            }
            //_____________________ COMPUTERS TURN END _____________________

    turns++;
    currentContext = computeContext();
}

function isEmptyPosition(position) {
    return typeof board[position] === 'number';
}

function change(posId, user){
        board[posId] = user;
        document.getElementById(posId).innerText = user;

    var compWin = checkWin(board, context.computerLabel)
         if (compWin) {gameOver(compWin);
                        computerScore++;
                        computerScoreSpan.innerHTML = computerScore;
             if(compEnabled == true )  setmessage("HA! HA! YOU LOST :( ");
                if(compEnabled == false )  setmessage("Player 2 Wins Good Job :D ");
                        }
}

function getComputerChoice(){
      var randomPosition
 do {
 randomPosition = Math.floor(Math.random() * 9);
 } while((!isEmptyPosition(randomPosition)));
    cellsClass[randomPosition].removeEventListener('click', clickHandler, false);
    return randomPosition;
}

function clearEvents(){
    for(var i = 0; i < cellsClass.length; i++) {
        cellsClass[i].removeEventListener('click', clickHandler);
    }
}

function resetGameHandler() {
    clearEvents();
    startGame();
    // Go over all the cell nodes
    // clear out innerHTML
    for (var i = 0; i < cellsClass.length; i++) {
        cellsClass[i].className = '';
        cellsClass[i].innerHTML = '';
        cellsClass[i].style.backgroundColor = "lightslategray";
    }
}
/******  FUNCTIONS  ******/
/*
1. plays = reduced version of the board array, from 9 down to 3 indexes.
2. game not won yet, set to null.
3. For every index in the winCombo
4. check if plays (reduced) == the combinations from winCombo
5. Found it, index is indexes / numbers of the winning, and user is the user who won.
6*/
function checkWin(board, user) {
    let plays = board.reduce((a, e, i) => (e === user) ? a.concat(i) : a, []);// => means check
   let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, user: user};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.user == context.userLabel ? "blue" : "red";
    }
    for (var i = 0; i < cellsClass.length; i++) {
        cellsClass[i].removeEventListener('click', clickHandler, false);
        // disable continuing game after winning.
    }

}
function emptySquares() {
    return board.filter(s => typeof s == 'number');
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cellsClass.length; i++) {
            cellsClass[i].style.backgroundColor = "green";
        }
        setmessage("IT'S A TIE NO ONE WINS");
        return true;
    }
    return false;
}


