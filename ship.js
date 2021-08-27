class Ship {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ship = createSprite(400, 300, 10, 10);
        this.image = loadImage("ship.png")
        this.ship.scale = 0.08;
    }

    

    moveRight() {
        if(keyDown(RIGHT_ARROW) || touches.length > 0) {
                while(this.ship.velocity.x < 12) {
                    this.ship.velocity.x = this.ship.velocity.x + 1; 
                    touches = []
                    console.log(touches);
                }
        }
    }

    moveLeft() {
        if(keyDown(LEFT_ARROW)) {
            while(this.ship.velocity.x > -12) {
                this.ship.velocity.x = this.ship.velocity.x - 1; 
            }
        }
    }

    display() {
        this.ship.addImage(this.image);
    }
}