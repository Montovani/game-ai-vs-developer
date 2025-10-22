const placedPositions = []

class CodeCard {
    constructor(cardName) {
        this.cardName = cardName
        this.w = 120
        this.h = 30
        this.cardDivNode = this.createCodeCardDiv()
    }
    createCodeCardDiv(){
        const cardDivNode = document.createElement('div')
        cardDivNode.style.border = "2px solid #ef7d57"
        cardDivNode.style.width = `${this.w}px` 
        cardDivNode.style.height = `${this.h}px`
        cardDivNode.style.borderRadius = "5px"
        cardDivNode.style.backgroundColor = "#1a1c2c"
        cardDivNode.style.position = "absolute"
        
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
        // The random position should follow this rule because of the map size:
        // start x = 60 / end x maximum = 1000
        //start y = 250 /end y maximum = 550    
        randomX = Math.floor(Math.random() * (1000 - 60) + 60)
        randomY = Math.floor(Math.random() * (550 - 250) + 250)
        tooClose = placedPositions.some(posObj => 
        Math.abs(posObj.x - randomX) < 180 &&  
        Math.abs(posObj.y - randomY) < 80      
      )
        }
        placedPositions.push({ x: randomX, y: randomY })
        this.x = randomX
        this.y = randomY
        this.cardDivNode.style.left = `${randomX}px`
        this.cardDivNode.style.top = `${randomY}px`
        document.querySelector('.map-section').append(this.cardDivNode)
    }
    addCardPlayerCode(){
        this.cardDivNode.style.position = "static"
        this.cardDivNode.style.flex = "0 1 20%"

        document.querySelector('.code-collect-box-player').append(this.cardDivNode)
    }
}
