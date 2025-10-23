//Global Nodes
const startGameBtnNode = document.querySelector('.start-btn')
const gameRunScreenNode = document.querySelector('.game-run-screen')
const initialScreenNode = document.querySelector('.initial-screen')
const secondsNode = document.querySelector('.timer-seconds')


// Event Listener
startGameBtnNode.addEventListener('click', startGame)
window.addEventListener('keydown', handleKey) 
    

//Global Variables
const playerAnswerArray = []
const correctAsnwerArray = []
const cardsArray = []
let player
let mainGameLoopId
let roundTimeSeconds = 25
secondsNode.innerHTML = roundTimeSeconds
let timer
let indexToCheck = 0
let level = 1

//Global Game Functions
function startGame(){
    initialScreenNode.style.display = "none"
    gameRunScreenNode.style.display = "flex"
    
    player = new Player
    player.addPlayerDOM()
    
    let questions = [
        new Question('Print hello world in the browser console',['console','.log','("hello world")'],['let','function','.log','("hello world")','lindt','.forEach','x','if','console','{}']),
        new Question('Declare a variable called "game" that can be changed later.',['let','game'],['letGame','const','y','let','x','game','function','var','='])
    ]
    correctAsnwerArray.push(...questions[1].asnwerArr)
    questions[1].cardsArr.forEach((card)=> {
        cardsArray.push(new CodeCard(card))
    })
    


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

    console.log(Math.round(roundTime/1.2))
    timerCountDown = setInterval(()=> {
        timer -= 1
        secondsNode.innerHTML = timer
        if(timer === Math.round(roundTime/1.2)){
            let firstAnswerCard = new CodeCard(correctAsnwerArray[0])
            firstAnswerCard.addCardAiCode()
        }
        if(timer === Math.round(roundTime/2)){
            let firstAnswerCard = new CodeCard(correctAsnwerArray[1])
            firstAnswerCard.addCardAiCode()
        }
        if (timer === 1) {
            let firstAnswerCard = new CodeCard(correctAsnwerArray[2])
            firstAnswerCard.addCardAiCode()
        }
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
            console.log(cardsArr)
            console.log(cardsArr[0])
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


