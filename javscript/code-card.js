// class CodeCards {
//     constructor(){
//         this.words = ['let','function','console','x','if','("hello world")','.forEach','def','lindt']
//         // create an array of fixed positions arr = [[x,y],[x,y]]
//     }
//     addCodeCardsDOM () {
//         for (let i = 0; i < this.words.length; i++) {
//             const cardDivNode = document.createElement('div')
//             cardDivNode.style.border = "2px solid #ef7d57"
//             cardDivNode.style.width = "120px"
//             cardDivNode.style.height = "30px"
    
    
//             cardDivNode.style.borderRadius = "5px"
//             cardDivNode.style.backgroundColor = "#1a1c2c"

//             cardDivNode.style.position = "absolute"
            
//             const map = document.querySelector('.map-section')
//             const mapWidth = map.offsetWidth
//             const mapHeight = map.offsetHeight
//             const cardWidth = 120
//             const cardHeight = 30
//             const padding = 50
//             const offsetY = 250
//             const x = Math.random() * (mapWidth - cardWidth - padding * 2) + padding
//             const y = Math.random() * (mapHeight - cardHeight - padding * 2 - offsetY) + offsetY
//             cardDivNode.style.left = `${x}px`
//             cardDivNode.style.top = `${y}px`

//             const cardPNode = document.createElement('p')
//             cardPNode.style.margin = "0px"
//             cardPNode.style.textAlign = "center"
//             cardPNode.style.color = "white"
//             cardPNode.style.fontFamily = "VT323"
//             cardPNode.style.fontSize = "20px"
//             cardPNode.innerHTML = this.words[i]
//             cardDivNode.append(cardPNode)
//             document.querySelector('.map-section').append(cardDivNode)
            
//         }
//     }
// }

const placedPositions = []

class CodeCard {
    constructor(cardName) {
        this.cardName = cardName
        this.cardDivNode = this.createCodeCardDiv()
        // this.x = cardXPos
        // this.y = cardYPos
    }
    createCodeCardDiv(){
        const cardDivNode = document.createElement('div')
        cardDivNode.style.border = "2px solid #ef7d57"
        cardDivNode.style.width = "120px"
        cardDivNode.style.height = "30px"
        cardDivNode.style.borderRadius = "5px"
        cardDivNode.style.backgroundColor = "#1a1c2c"
        cardDivNode.style.position = "absolute"
        cardDivNode.style.gap = "20px"
        
        const cardPNode = document.createElement('p')
        cardPNode.style.margin = "0px"
        cardPNode.style.textAlign = "center"
        cardPNode.style.color = "white"
        cardPNode.style.fontFamily = "VT323"
        cardPNode.style.fontSize = "20px"
        cardPNode.innerHTML = this.cardName
        cardDivNode.append(cardPNode)
        return cardDivNode
    }
    addCodeCardDOM() {
        let randomX, randomY
        let tooClose = true

        while (tooClose) {
        randomX = Math.floor(Math.random() * (1000 - 60) + 60)
        randomY = Math.floor(Math.random() * (550 - 250) + 250)
        tooClose = placedPositions.some(pos => 
        Math.abs(pos.x - randomX) < 180 &&  
        Math.abs(pos.y - randomY) < 80      
      )
        }
        placedPositions.push({ x: randomX, y: randomY })
        this.cardDivNode.style.left = `${randomX}px`
        this.cardDivNode.style.top = `${randomY}px`
        document.querySelector('.map-section').append(this.cardDivNode)
    }
}
