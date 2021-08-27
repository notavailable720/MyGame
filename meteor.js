class Meteor {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.met = createSprite(this.x, this.y, this.width, this.height)
        this.met.velocityY = random(3, 10);
        this.met.velocityX = random(1, 5);
        meteors.push(this.met);
        
    }   

    display() {
        fill('white')
        rect(this.x, this.y, this.width, this.height);
    }
}