class Player {
    constructor(){
        this.x = 50,
        this.y = 50,
        this.w = 60,
        this.h = 90,
        this.speed = 5
    }

    addPlayerDOM () {
        const imgNode = document.createElement("img")
        imgNode.src = './img/developer-character-topdown.png'
        imgNode.style.width = `${this.w}px`
        imgNode.style.height = `${this.h}px`
        imgNode.style.position = `absolute`
        imgNode.style.top = `${this.x}px`
        imgNode.style.left = `${this.y}px`
        document.querySelector('.map-section').append(imgNode)
    }
}


