//Global Nodes
const startGameBtnNode = document.querySelector('.start-btn')
const gameRunScreenNode = document.querySelector('.game-run-screen')
const initialScreenNode = document.querySelector('.initial-screen')

//Global Variables

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
    
    player = new Player
    player.addPlayerDOM()
    
    
    // Start the main game loop
    const mainGameLoopId = setInterval(gameRunning,1000/60)
    
}

function gameRunning() {
    console.log('game running at 60 fps.')
}


