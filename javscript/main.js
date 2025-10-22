//Global Nodes
const startGameBtnNode = document.querySelector('.start-btn')
const gameRunScreenNode = document.querySelector('.game-run-screen')
const initialScreenNode = document.querySelector('.initial-screen')
const secondsNode = document.querySelector('.timer-seconds')


// Event Listener
startGameBtnNode.addEventListener('click', startGame)
window.addEventListener('keydown', handleKey) 
    

//Global Variables
let playerAnswerArray = []
let correctAsnwerArray = ['console','.log','("hello world")']
 const cardsArray = [
        new CodeCard('let'),
        new CodeCard('function'),
        new CodeCard('.log'),
        new CodeCard('("hello world")'),
        new CodeCard('lindt'),
        new CodeCard('.forEach'),
        new CodeCard('x'),
        new CodeCard('.if'),
        new CodeCard('console')
    ]
let player
let mainGameLoopId
let roundTimeSeconds = 40
secondsNode.innerHTML = roundTimeSeconds
let timer
let indexToCheck = 0

//Global Game Functions
function startGame(){
    initialScreenNode.style.display = "none"
    gameRunScreenNode.style.display = "flex"
    
    player = new Player
    player.addPlayerDOM()

    displayAllCards(cardsArray) 
    
    // Start the main game loop
   mainGameLoopId = setInterval(mainGameLoop,1000/60)
    
    countDownTimer(roundTimeSeconds)
}

function mainGameLoop() {
          checkColisionPlayerCodeBox()
          
      }



function countDownTimer(roundTime) {
    timer = roundTime
    timerCountDown = setInterval(()=> {
        timer -= 1
        secondsNode.innerHTML = timer
        if (timer === 0) {
            alert('game over')
            clearInterval(mainGameLoopId)
            clearInterval(timerCountDown)
        }
    },1000)
}

function handleKey(event){
    player.playerMovement(event.key)
}

function displayAllCards(cardsArr) {
          for(let i = 0; i < cardsArr.length; i++){
              cardsArr[i].addCodeCardDOM()
          }
      
      }

function checkWinner() {
        // Create a Guard Clause to just check if the asnwer arr has the same lenght as the correctasnwer arr
        let counterCorrectWords = 0

        for (let i = 0; i < correctAsnwerArray.length; i++ ){
            if(correctAsnwerArray[i] === playerAnswerArray[i]){
                counterCorrectWords++
            } 
        }
        if(counterCorrectWords === correctAsnwerArray.length){
            alert('you won the game')
            clearInterval(mainGameLoopId)
            clearInterval(timerCountDown)

        }
      }

function checkColisionPlayerCodeBox () {
      
        cardsArray.forEach((card,index) =>{
            if (
                   player.x < card.x + card.w &&
                    player.x + player.w > card.x &&
                    player.y < card.y + card.h &&
                    player.y + player.h > card.y
            ) {
                const catchName = card.cardName 
                if(catchName === correctAsnwerArray[indexToCheck]){
                    let newCard = new CodeCard(catchName)
                    playerAnswerArray.push(catchName)
                    checkWinner()
                    newCard.addCardPlayerCode()
                    card.cardDivNode.remove()
                    cardsArray.splice(index, 1)
                    indexToCheck += 1
                } else {
                    console.log('ohno?')
                    player.playerRespawn()
                }
            }
        })
      }


