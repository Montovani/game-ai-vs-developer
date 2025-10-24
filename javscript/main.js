//Global Nodes
const startGameBtnNode = document.querySelector(".start-btn");
const gameRunScreenNode = document.querySelector(".game-run-screen");
const initialScreenNode = document.querySelector(".initial-screen");
const gameOverScreenNode = document.querySelector('.game-over-screen')
const secondsNode = document.querySelector(".timer-seconds");
const speechBubbleNode = document.querySelector(".speech-bubble");
const restartGameBtnNode = document.querySelector('.restart-btn')
const gameWinScreenNode = document.querySelector('.game-win-screen')
const restartGameBtnNode2 = document.querySelector('.restart-btn2')
const currentLevelNode = document.querySelector('.current-level')
const totalLevelsNode = document.querySelector('.total-levels-dashboard')
const playerScoreNode = document.querySelector('.player-score')
const totalLevelsGameOverNode = document.querySelector('.total-levels')

// Event Listener
startGameBtnNode.addEventListener("click", startGame);
restartGameBtnNode.addEventListener('click',startGame)
restartGameBtnNode2.addEventListener('click',startGame)
window.addEventListener("keydown", handleKey);

// Questions of the game
const questions = [ new Question( "Print hello world in the browser console",["console", ".log", '("hello world")'],["let","function",
".log",'("hello world")',"lindt",".forEach","x","if","console","{}",]),
new Question('Declare a variable called "game" that can be changed later.',["let", "game"],["letGame", "const", "y", "let", "x", "game", "function", "var", "="]),
new Question('Create a constant named "player" with value "Dev".',["const", "player", "=", 'Dev'],
      ["let","var","create","Dev",'player',"game","define","function","true","const","=",]),
new Question ('Write a function called "startGame" that returns a string "Game started".',['function','startGame()','{','return','"Game started"','}'],['function','startGame()','{','return','"Game started"','}','console.log','alert(','print','let']),
new Question ('Add the values "red", "yellow" and "blue" to the array colors.',['colors','.push','(','"red,"','"yellow,"','"blue"',')'],['colors','.push','(','"red,"','"yellow,"','"blue"',')','.add','green','.pop','const','.length'])
];

//Global Variables

const playerAnswerArray = [];
const correctAsnwerArray = [];
const cardsArray = [];
let player;
let mainGameLoopId;
let roundTimeSeconds = 40;
secondsNode.innerHTML = roundTimeSeconds;
let timer;
let indexToCheck = 0;
let level = 0;
let currentLevelDashboard = 1
let totalLevels = questions.length
totalLevelsNode.innerHTML = totalLevels
currentLevelNode.innerHTML = currentLevelDashboard


// Music & SFX
const mainBgMusic = new Audio("./music/background-music/main-game-music.mp3")
mainBgMusic.loop = true
mainBgMusic.volume = 0.1
const getCardSound = new Audio("./music/sfx/get-card-sound.mp3")
getCardSound.volume = 1
const errorCardSound = new Audio("./music/sfx/error-sound.mp3")
errorCardSound.volume = 0.3
const nextStageSound = new Audio("./music/sfx/next-stage-sound.mp3")
nextStageSound.volume = 0.4
const winGameSound = new Audio("./music/sfx/win-game-sound.mp3")
winGameSound.volume = 0.4

//Global Game Functions

function startGame() {
  initialScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "none";
  gameWinScreenNode.style.display = "none";
  gameRunScreenNode.style.display = "flex";
  mainBgMusic.play()


  player = new Player();
  player.addPlayerDOM();

  shuffleQuestions(questions);

  // Start the main game loop
  mainGameLoopId = setInterval(mainGameLoop, 1000 / 60);
  
  loadLevel2()
}

function loadLevel2(){
    console.log('current level', level)
    player.addPlayerDOM()
    correctAsnwerArray.push(...questions[level].asnwerArr);
    speechBubbleNode.innerHTML = questions[level].question;
    questions[level].cardsArr.forEach((card) => {
        cardsArray.push(new CodeCard(card));
    });
    displayAllCards(cardsArray);
    countDownTimer(roundTimeSeconds);
    indexToCheck = 0
    console.log('current index to check', indexToCheck)
    mainGameLoopId = setInterval(mainGameLoop,1000/60)
    

}

function mainGameLoop() {
  checkColisionPlayerCodeBox();
    
}

function shuffleQuestions(questionsArr) {
  let shuffleIndex = questionsArr.length
  questionsArr.sort((question1,question2)=>{
    let arr = [-1,1]
   return arr[Math.floor(Math.random()*arr.length)]
  })
}

function countDownTimer(roundTime) {
  timer = roundTime;
  let totalOfAsnwers = correctAsnwerArray.length
  console.log('total of answes:',totalOfAsnwers)

  timerCountDown = setInterval(() => {
    timer -= 1;
    secondsNode.innerHTML = timer;

    if(totalOfAsnwers === 3){
      if (timer === Math.round(roundTime / 1.2)) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[0]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === Math.round(roundTime / 2)) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[1]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 1) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[2]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 0) {
        console.log('calling game over')
        gameOver()
      }
    }
    if(totalOfAsnwers === 2){
      if (timer === Math.round(roundTime / 1.2)) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[0]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === 1) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[1]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 0) {
        console.log('calling game over')
        gameOver()
      }
    }
    if(totalOfAsnwers === 4){
      if (timer === 35) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[0]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === 27) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[1]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === Math.round(roundTime / 2)) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[2]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 1) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[3]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 0) {
        console.log('calling game over')
        gameOver()
      }
    }
    if(totalOfAsnwers === 6){
      if (timer === 35) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[0]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === 27) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[1]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === Math.round(roundTime / 2)) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[2]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 15) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[3]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 10) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[4]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 1) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[5]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 0) {
        console.log('calling game over')
        gameOver()
      }
    }
    if(totalOfAsnwers === 7){
      if (timer === 37) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[0]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === 34) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[1]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === 27) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[2]);
        firstAnswerCard.addCardAiCode();
        
      }
      if (timer === Math.round(roundTime / 2)) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[3]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 15) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[4]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 10) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[5]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 1) {
        let firstAnswerCard = new CodeCard(correctAsnwerArray[6]);
        firstAnswerCard.addCardAiCode();
      }
      if (timer === 0) {
        console.log('calling game over')
        gameOver()
      }
    }
  }, 1000);
}

function handleKey(event) {
  player.playerMovement(event.key);
}

function displayAllCards(cardsArr) {
  for (let i = 0; i < cardsArr.length; i++) {
    cardsArr[i].addCodeCardDOM();
  }
}

function gameOver(){
      console.log('game over was called')
      gameRunScreenNode.style.display = 'none'
      gameOverScreenNode.style.display = 'flex'
      playerScoreNode.innerHTML = currentLevelDashboard - 1
      totalLevelsGameOverNode.innerHTML = totalLevels

      clearInterval(mainGameLoopId);
      clearInterval(timerCountDown);
      timer = roundTimeSeconds
      secondsNode.innerHTML = timer;
      indexToCheck = 0
      counterCorrectWords = 0
      level = 0
      timer = 0
      player.imgNode.remove()
      player = null
      currentLevelDashboard = 1
      currentLevelNode.innerHTML = currentLevelDashboard
      cardsArray.splice(0,cardsArray.length)
      document.querySelectorAll('.card-div').forEach(cardDiv => cardDiv.remove())
      correctAsnwerArray.splice(0,correctAsnwerArray.length)
      playerAnswerArray.splice(0,playerAnswerArray.length)
      placedPositions.splice(0,placedPositions.length)
}


function checkWinner() {
  
  let counterCorrectWords = 0;

  for (let i = 0; i < correctAsnwerArray.length; i++) {
    if (correctAsnwerArray[i] === playerAnswerArray[i]) {
      counterCorrectWords++;
    }
  }
  if (counterCorrectWords === correctAsnwerArray.length) {
    if(level < 4){
      clearInterval(mainGameLoopId)
      clearInterval(timerCountDown)
      timer = roundTimeSeconds
      secondsNode.innerHTML = timer;
      nextStageSound.play()
      indexToCheck = 0
      counterCorrectWords = 0
      player.x = 70
      player.y = 60
      player.imgNode.style.top = `${player.x}px`;
      player.imgNode.style.left = `${player.y}px`;
      cardsArray.splice(0,cardsArray.length)
      document.querySelectorAll('.card-div').forEach(cardDiv => cardDiv.remove())
      level++
      currentLevelDashboard++
      currentLevelNode.innerHTML = currentLevelDashboard
      correctAsnwerArray.splice(0,correctAsnwerArray.length)
      playerAnswerArray.splice(0,playerAnswerArray.length)
      placedPositions.splice(0,placedPositions.length)
      loadLevel2()
    } else if (level = 5){
      mainBgMusic.pause()
      winGameSound.play()
      gameRunScreenNode.style.display = 'none'
      gameWinScreenNode.style.display = 'flex'

       clearInterval(mainGameLoopId);
       clearInterval(timerCountDown);
       timer = roundTimeSeconds
       secondsNode.innerHTML = timer;
       indexToCheck = 0
       counterCorrectWords = 0
       level = 0
       timer = 0
       currentLevelDashboard = 1
       currentLevelNode.innerHTML = currentLevelDashboard
       player.imgNode.remove()
       player = null
       cardsArray.splice(0,cardsArray.length)
       document.querySelectorAll('.card-div').forEach(cardDiv => cardDiv.remove())
       correctAsnwerArray.splice(0,correctAsnwerArray.length)
       playerAnswerArray.splice(0,playerAnswerArray.length)
       placedPositions.splice(0,placedPositions.length)
    }
  }
  }

function checkColisionPlayerCodeBox() {
  cardsArray.forEach((card, index) => {
    if (
      player.x < card.x + card.w &&
      player.x + player.w > card.x &&
      player.y < card.y + card.h &&
      player.y + player.h > card.y
    ) {
      const catchName = card.cardName;
      if (catchName === correctAsnwerArray[indexToCheck]) {
        getCardSound.play()
        card.cardDivNode.remove();
        let newCard = new CodeCard(catchName);
        playerAnswerArray.push(catchName);
        newCard.addCardPlayerCode();
        cardsArray.splice(index, 1);
        indexToCheck += 1;
        checkWinner();
      } else {
        errorCardSound.play()
        player.playerRespawn();
      }
    }
  });
}
