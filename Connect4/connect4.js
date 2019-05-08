/**
 * Created by Andy on 2019-05-06.
 */
let board = {};
let numRows = 6;
let numCols = 7;
let numTurns = 0;
let userScore = 0;
let computerScore = 0;
let currentPlayer;
let turns;
let win; // TRUE if somebody won the game
let players = { 'player1' : 'red', 'player2' : 'yellow' }; 
let HumanOponent = document.getElementById("H-opponent");
let CompOponent = document.getElementById("C-opponent");
let columns = document.querySelectorAll('.column');
let userScoreSpan = document.getElementById("user-score");
let computerScoreSpan = document.getElementById("computer-score");
let resetGame = document.getElementById('reset-game');
let PickOponent = document.querySelector(".play");
let gameMessage = document.querySelector(".message >p");


let compEnabled = true;

initial();
function initial() {
    columns.disabled = true;
    
    resetGame.disabled = true;
}

//PlayAgain.innerHTML = '';
HumanOponent.addEventListener('click', TwoPlayer ,false);
CompOponent.addEventListener('click', ComputerPlayer,false);
//constructor
function startGame() {
    resetGame.disabled = false;
    
    Array.prototype.forEach.call(document.querySelectorAll('circle'), function(piece) {
        piece.setAttribute('class', 'free');
    });

   
    board = {};
    for(let x = 0; x <= numRows; x++) {
    
        board[x] = {};
        
        for(let y = 0; y <= numCols; y++) {
            board[x][y] = 'free';
        }
    }
    numTurns = 0;
    setmessage("Game Started.");
    currentPlayer = getNextPlayer();
    resetGame.addEventListener('click', resetGameHandler, false);
}

function TwoPlayer(){
    compEnabled = false;
    PickOponent.innerHTML = "";
    Array.prototype.forEach.call(columns, function(col) {
        col.addEventListener('click', function() {
            clickHandler(col.getAttribute('data-x')); //column
        });
    });
    startGame();
    
}

function ComputerPlayer(){
    PickOponent.innerHTML = "";
    startGame();
}

function setmessage(msg) {
    gameMessage.innerHTML = msg;
}

function getNextPlayer() {
    if(currentPlayer === "no_one"){
        setmessage("Game is Over! Reset The Game");
        return "no_one";
    }
    else
    return (numTurns % 2 == 0) ? players.player1 : players.player2; // mod 2 is 0
}

let clickHandler = function(x) {
    if(currentPlayer != "no_one"){
    let nextColumn = false;
    
    for(let y = 0; y < numRows; y++) { //6 rows
        if(board[x][y] === 'free') {
            nextColumn = y;
            break;
        }
    }
    
    if(nextColumn === false) { //full column
        setmessage("No free spaces in this column. Pick another location.");
        return false;
    }
    
    board[x][nextColumn] = currentPlayer;
    
    document.querySelector('#column-'+x+' .row-'+nextColumn+' circle').setAttribute(
            'class', currentPlayer
    );
    
    if(checkWin(parseInt(x), nextColumn)) {
        win = true;
        setmessage("Congratulations!!!! " + currentPlayer+ " WINS! :D ");
        if(currentPlayer === 'red'){
            userScore++;
            userScoreSpan.innerHTML = userScore;
        }
        if(currentPlayer === 'yellow'){
            computerScore++;
            computerScoreSpan.innerHTML = computerScore;
        }
   
        Array.prototype.forEach.call(document.querySelectorAll('circle'), function(piece) {
       if(piece.getAttribute('class') === 'free'){
            piece.setAttribute('class', 'game_over');
       }
        });
        currentPlayer = "no_one";

        return true;
    }

    numTurns++;
    
    if(numTurns >= numRows * numCols) {
        setmessage("IT'S A TIE NO ONE WINS");
      
        return true;				
    }
    }
    currentPlayer = getNextPlayer();

};

let resetGameHandler = function() {
    win = false;
    currentPlayer = 'red';
    startGame();
}

function checkWin(X, Y) { // check if has 4 consecutives at position
    return checkDirection(X, Y, 'vertical') || 
    checkDirection(X, Y, 'diagonal') || 
    checkDirection(X, Y, 'horizontal');
}

let isBounds = function(x, y) {
    return (board.hasOwnProperty(x) && typeof board[x][y] !== 'undefined'); 
//The hasOwnProperty() method returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).
};

let checkDirection = function(X, Y, direction) {

    let chainLength, directions;
    
    directions = {
        horizontal: [
            [0, -1], [0, 1]
        ],
        vertical: [
            [-1, 0], [1, 0]
        ],
        diagonal: [
            [-1, -1], [1, 1], [-1, 1], [1, -1]
        ]
    };
    
    chainLength = 1;
    
    directions[direction].forEach(function(coords) {
        
        let i = 1;

        while( isBounds(X + (coords[0] * i), Y + (coords[1] * i)) && 
            (board[X + (coords[0] * i)][Y + (coords[1] * i)] === currentPlayer)
        ) {
            chainLength = chainLength + 1; 
            i = i + 1; 
        };
        
    });
    
    return (chainLength >= 4);
    
};