//Global Nodes
const startGameBtnNode = document.querySelector('.start-btn')
const gameRunScreenNode = document.querySelector('.game-run-screen')
const initialScreenNode = document.querySelector('.initial-screen')

//Global Variables

let player

// Event Listener
startGameBtnNode.addEventListener('click', startGame)


function startGame(){
    initialScreenNode.style.display = "none"
    gameRunScreenNode.style.display = "flex"
    
    player = new Player
    console.log(player)
    player.addPlayerDOM()

    // Start the main game loop
    const mainGameLoopId = setInterval(gameRunning,1000/60)
    
}

function gameRunning() {
    console.log('game running at 60 fps.')
}


function gameLoop() {
    console.log('looping of the game')
}
