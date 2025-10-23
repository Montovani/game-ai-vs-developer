//Global Nodes
const startGameBtnNode = document.querySelector(".start-btn");
const gameRunScreenNode = document.querySelector(".game-run-screen");
const initialScreenNode = document.querySelector(".initial-screen");
const secondsNode = document.querySelector(".timer-seconds");
const speechBubbleNode = document.querySelector(".speech-bubble");

// Event Listener
startGameBtnNode.addEventListener("click", startGame);
window.addEventListener("keydown", handleKey);

//Global Variables
const playerAnswerArray = [];
const correctAsnwerArray = [];
const cardsArray = [];
const questions = [ new Question( "Print hello world in the browser console",["console", ".log", '("hello world")'],["let","function",
".log",'("hello world")',"lindt",".forEach","x","if","console","{}",]),
new Question('Declare a variable called "game" that can be changed later.',["let", "game"],["letGame", "const", "y", "let", "x", "game", "function", "var", "="]),
new Question('Create a constant named "player" with value "Dev".',["const", "player", "=", 'Dev'],
      ["let","var","create","Dev",'player',"game","define","function","true","const","=",]),
];

let player;
let mainGameLoopId;
let roundTimeSeconds = 25;
secondsNode.innerHTML = roundTimeSeconds;
let timer;
let indexToCheck = 0;
let level = 0;


//Global Game Functions
function startGame() {
  initialScreenNode.style.display = "none";
  gameRunScreenNode.style.display = "flex";

  player = new Player();
  player.addPlayerDOM();

  shuffleQuestions(questions);

  // Start the main game loop
  mainGameLoopId = setInterval(mainGameLoop, 1000 / 60);
  
  loadLevel2()
  
  
  
  
  
}


function loadLevel(){
    
    player.addPlayerDOM()
    correctAsnwerArray.push(...questions[level].asnwerArr);

    questions[level].cardsArr.forEach((card) => {
        cardsArray.push(new CodeCard(card));
  });
  speechBubbleNode.innerHTML = questions[level].question;
  displayAllCards(cardsArray);
  console.log(document.querySelectorAll('.card-div'))
  countDownTimer(roundTimeSeconds);

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
  //console.log(questionsArr)
  questionsArr.sort((question1,question2)=>{
    let arr = [-1,1]
   // return -1
   return arr[Math.floor(Math.random()*arr.length)]
  })


//   for(let i = questionsArr.length - 1; i > 0;i--){
//     shuffleIndex = Math.floor(Math.random()*shuffleIndex)
//     [questionsArr[i],questionsArr[shuffleIndex]] = [questionsArr[shuffleIndex],questionsArr[i]]
//     shuffleIndex--
//   }

    // for (let i = questionsArr.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1)); // random index 0–i
    //         [questionsArr[i], questionsArr[j]] = [questionsArr[j], questionsArr[i]];   // swap elements
    //     }
}

function countDownTimer(roundTime) {
  timer = roundTime;

  timerCountDown = setInterval(() => {
    timer -= 1;
    secondsNode.innerHTML = timer;
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
      alert("game over");
      clearInterval(mainGameLoopId);
      clearInterval(timerCountDown);
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

function checkWinner() {
  // Create a Guard Clause to just check if the asnwer arr has the same lenght as the correctasnwer arr
  let counterCorrectWords = 0;

  for (let i = 0; i < correctAsnwerArray.length; i++) {
    if (correctAsnwerArray[i] === playerAnswerArray[i]) {
      counterCorrectWords++;
    }
  }
  if (counterCorrectWords === correctAsnwerArray.length) {
    if(level < 2){
      clearInterval(mainGameLoopId)
      clearInterval(timerCountDown)
      indexToCheck = 0
      counterCorrectWords = 0
      player.x = 70
      player.y = 60
      player.imgNode.style.top = `${player.x}px`;
      player.imgNode.style.left = `${player.y}px`;
      alert("you win the round");
      cardsArray.splice(0,cardsArray.length)
      document.querySelectorAll('.card-div').forEach(cardDiv => cardDiv.remove())
      level++
      correctAsnwerArray.splice(0,correctAsnwerArray.length)
      playerAnswerArray.splice(0,playerAnswerArray.length)
      placedPositions.splice(0,placedPositions.length)
      loadLevel2()
    } else if (level = 3){
        clearInterval(timerCountDown);
        clearInterval(mainGameLoopId);
        alert('you win the game')
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
        card.cardDivNode.remove();
        let newCard = new CodeCard(catchName);
        playerAnswerArray.push(catchName);
        newCard.addCardPlayerCode();
        cardsArray.splice(index, 1);
        indexToCheck += 1;
        checkWinner();
      } else {
        console.log("ohno?");
        player.playerRespawn();
      }
    }
  });
}
