//Global Nodes
const startGameBtnNode = document.querySelector('.start-btn')
const gameRunScreenNode = document.querySelector('.game-run-screen')
const initialScreenNode = document.querySelector('.initial-screen')

// Event Listener
startGameBtnNode.addEventListener('click', startGame)
window.addEventListener('keydown', (e)=> {
    player.playerMovement(e.key)
})

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

//Global Game Functions
function startGame(){
    initialScreenNode.style.display = "none"
    gameRunScreenNode.style.display = "flex"
    
    player = new Player
    player.addPlayerDOM()

    displayAllCards(cardsArray) 
    
    
    // Start the main game loop
   mainGameLoopId = setInterval(mainGameLoop,1000/60)
    
        
}

function mainGameLoop() {
          checkColisionPlayerCodeBox()
          checkWinner()
      }



function displayAllCards(cardsArr) {
          for(let i = 0; i < cardsArr.length; i++){
              cardsArr[i].addCodeCardDOM()
          }
      
      }

function checkWinner() {
        
        let counterCorrectWords = 0
        for (let i = 0; i < correctAsnwerArray.length; i++ ){
            if(correctAsnwerArray[i] === playerAnswerArray[i]){
                counterCorrectWords++
            }
        }
        if(counterCorrectWords === correctAsnwerArray.length){
            alert('you won the game')
            clearInterval(mainGameLoopId)
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
                playerAnswerArray.push(catchName)
                card.cardDivNode.remove()
                cardsArray.splice(index, 1)
            }
        })
        
      }


