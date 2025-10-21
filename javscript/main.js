//Global Nodes
const startGameBtnNode = document.querySelector('.start-btn')
const gameRunScreenNode = document.querySelector('.game-run-screen')
const initialScreenNode = document.querySelector('.initial-screen')

//Global Variables

// console.log(cards.addCodeCardsDOM())
let player

// Event Listener
startGameBtnNode.addEventListener('click', startGame)
window.addEventListener('keydown', (e)=> {
    player.playerMovement(e.key)
})

function startGame(){
    initialScreenNode.style.display = "none"
    gameRunScreenNode.style.display = "flex"
    
    const asnwerArray = ['console','.log','("hello world")']
    player = new Player
    player.addPlayerDOM()

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
    displayAllCards(cardsArray) 
    console.log(cardsArray[0])
    console.log(player)
    
    
    // Start the main game loop
    const mainGameLoopId = setInterval(gameRunning,1000/60)
    
    function checkColisionPlayerCodeBox () {
      
        cardsArray.forEach((card) =>{
            if (
                   player.x < card.x + card.w &&
                    player.x + player.w > card.x &&
                    player.y < card.y + card.h &&
                    player.y + player.h > card.y
            ) {
                console.log('player collide')
            }
        })
      }
      function gameRunning() {
          checkColisionPlayerCodeBox()
      }
      function displayAllCards(cardsArr) {
          for(let i = 0; i < cardsArr.length; i++){
              cardsArr[i].addCodeCardDOM()
          }
      
      }

      
}




