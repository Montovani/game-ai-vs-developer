class Player {
  constructor() {
      (this.x = 70),
      (this.y = 60),
      (this.w = 25),
      (this.h = 55),
      (this.speed = 20);
    this.imgNode = document.createElement("img");
    this.imgNode.src = "./img/developer-character-topdown.png";
  }

  addPlayerDOM() {
    this.imgNode.style.width = `${this.w}px`;
    this.imgNode.style.height = `${this.h}px`;
    this.imgNode.style.position = `absolute`;
    this.imgNode.style.top = `${this.x}px`;
    this.imgNode.style.left = `${this.y}px`;
    document.querySelector(".map-section").append(this.imgNode);
  }

  playerMovement(keyPressed) {
    if (keyPressed === "s" || keyPressed === "ArrowDown") {
      if(!(this.y >= 363)){
        this.y += this.speed;
        this.imgNode.style.top = `${this.y}px`;
      }
    }
    if (keyPressed === "w" || keyPressed === "ArrowUp") {
      if (!(this.y <=60)){
        this.y -= this.speed;
        this.imgNode.style.top = `${this.y}px`;

      }
    }
    if (keyPressed === "d" || keyPressed === "ArrowRight") {
      if(!(this.x >= 1100)){
        this.x += this.speed;
        this.imgNode.style.left = `${this.x}px`;
      }
    }
    if (keyPressed === "a" || keyPressed === "ArrowLeft") {
      if(!(this.x <= 70)){
        this.x -= this.speed;
        this.imgNode.style.left = `${this.x}px`;
      }
    }
  }
  playerRespawn() {
    this.x = 70;
    this.y = 60;
    this.imgNode.style.top = `${this.x}px`;
    this.imgNode.style.left = `${this.y}px`;

    // Remove player movement
    window.removeEventListener("keydown", handleKey);

    // blink effect of Cooldown
    let blinkCount = 0;
    const blinkId = setInterval(() => {
        this.imgNode.style.display =
        this.imgNode.style.display === "none" ? "block" : "none";

      blinkCount++;
      if (blinkCount === 6) {
        clearInterval(blinkId);
        this.imgNode.style.display = "block";
        window.addEventListener("keydown", handleKey);
      }
    }, 500);
  }
}
