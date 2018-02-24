/**
 * Created by Andy on 2018-01-12.
 */
var userScore = 0;
var computerScore = 0;
//Caching the Dom, storing for future use.
var userScoreSpan = document.getElementById("user-score"); //stored in a span tag
var computerScoreSpan = document.getElementById("computer-score"); //stored in a span tag
var scoreBoardDiv = document.querySelector(".score-board");
var resultP = document.querySelector(".result >p");
const rockDiv = document.getElementById("r");
const paperDiv = document.getElementById("p");
const scissorDiv = document.getElementById("s");

function getComputerChoice() {
    const choices = ["r", 'p', 's']
    const randNum = Math.floor(Math.random()*3);
    return choices[randNum];
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
      case "rs":
      case "pr":
      case "sp":
        win(userChoice , computerChoice);
    break;
       case "rp":
       case "ps":
       case "sr":
        lose(userChoice , computerChoice);
    break;
       case "rr":
       case "pp":
       case "ss":
        tie(userChoice , computerChoice);
    break;
    }
}

function convertWord(letter){
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "s") return "Scissor";
}

function win(user , computer){
    userScore++;
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;
    const userChoiceDiv = document.getElementById(user);

    if(convertWord(user) === "Rock" && convertWord(computer) === "Scissor" ){
        resultP.innerHTML = "Rock Breaks Scissor, You Win :)";}
    if(convertWord(user) === "Paper" && convertWord(computer) === "Rock" ){
        resultP.innerHTML = "Paper Covers Rock, You Win :)";}
    if(convertWord(user) === "Scissor" && convertWord(computer) === "Paper" ){
        resultP.innerHTML = "Scissor Cuts Paper, You Win :)";}
    userChoiceDiv.classList.add('green-glow');
    setTimeout(() => userChoiceDiv.classList.remove('green-glow'), 600);
}


function lose(user , computer){
    computerScore++;
    computerScoreSpan.innerHTML = computerScore;
    const userChoiceDiv = document.getElementById(user);
    if(convertWord(user) === "Rock" && convertWord(computer) === "Paper" ){
        resultP.innerHTML = "Sorry Paper Covers Rock, You Lose :(";}
    if(convertWord(user) === "Paper" && convertWord(computer) === "Scissor" ){
        resultP.innerHTML = "Sorry Scissor Cuts Paper, You Lose :(";}
    if(convertWord(user) === "Scissor" && convertWord(computer) === "Rock" ){
        resultP.innerHTML = "Sorry Rock Breaks Scissor, You Lose :(";}
    userChoiceDiv.classList.add('red-glow');
    setTimeout(function(){ userChoiceDiv.classList.remove('red-glow')}, 600);
}
function tie(user , computer){
    const userChoiceDiv = document.getElementById(user);
    resultP.innerHTML = `${convertWord(user)} Equals ${convertWord(computer)} ,It's a Tie!`;
    userChoiceDiv.classList.add('purple-glow');
    setTimeout(function(){ userChoiceDiv.classList.remove('purple-glow')}, 600);
}

function main() {
    rockDiv.addEventListener('click', function () { game("r") });
    paperDiv.addEventListener('click', () => game("p")); //ex6
    scissorDiv.addEventListener('click', function () {
        game("s");
    })
}
main();