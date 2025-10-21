class Player {
    constructor(){
        this.x = 70,
        this.y = 60,
        this.w = 30,
        this.h = 60,
        this.speed = 10
        this.imgNode = document.createElement("img")
        this.imgNode.src = './img/developer-character-topdown.png'
    }

    addPlayerDOM () {
        this.imgNode.style.width = `${this.w}px`
        this.imgNode.style.height = `${this.h}px`
        this.imgNode.style.position = `absolute`
        this.imgNode.style.top = `${this.x}px`
        this.imgNode.style.left = `${this.y}px`
        document.querySelector('.map-section').append(this.imgNode)
    }

    playerMovement(keyPressed) {
        
        if(keyPressed === "s" || keyPressed === "ArrowDown"){
            this.x += this.speed
            console.log(this.x)
            this.imgNode.style.top = `${this.x}px`
        }
        if(keyPressed === "w" || keyPressed === "ArrowUp"){
            this.x -= this.speed
            console.log(this.x)
            this.imgNode.style.top = `${this.x}px`
        }
        if(keyPressed === "d" || keyPressed === "ArrowRight"){
            this.y += this.speed
            this.imgNode.style.left = `${this.y}px`
        }
        if(keyPressed === "a" || keyPressed === "ArrowLeft"){
            this.y -= this.speed
            this.imgNode.style.left = `${this.y}px`
        }
    }
}

