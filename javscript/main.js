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
    console.log(e.key)
    player.playerMovement(e.key)
})

function startGame(){
    initialScreenNode.style.display = "none"
    gameRunScreenNode.style.display = "flex"
    
    // start x = 60
    //end x maximum = 1000
    //start y = 250
    // end y maximum = 550
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
    
    // Start the main game loop
    const mainGameLoopId = setInterval(gameRunning,1000/60)
    
}

function gameRunning() {
    
}
function displayAllCards(cardsArr) {
    for(let i = 0; i < cardsArr.length; i++){
        cardsArr[i].addCodeCardDOM()
    }
}


