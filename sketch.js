const World = Matter.World;
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;


var world, engine;
var square;
var gameState;
var meteors = [];
var spaceShip, shipImg;
var score;
var reset, resetImg;

function preload() {
  bg = loadImage("space.jpg");

  shipImg = loadImage("ship.png");

  resetImg = loadImage("reset.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  //Reset sprite
  reset = createSprite(width/2, height/1.5, 200, 200);
  reset.addImage(resetImg);
  reset.scale = 0.7
  reset.visible = false;

  //spaceShip = new Ship(400, 300, 10, 10);
  spaceShip = createSprite(width/2, 550, 10, 10)
  spaceShip.addImage(shipImg);
  spaceShip.scale = 0.08;

  gameState = 1;
  score = 0;
}

function draw() {
  background(bg);  
  if(mousePressedOver(reset)) {
    restart();
  }

  if(frameCount % 50 === 0 && gameState == 1) {
    for(var i = 0; i < 10; i++) {
      var meteor = createSprite(random(10, width - 10), -10, random(10, 30), random(10, 30));
      meteors.push(meteor);
      meteor.velocityY = random(3, 10);
      meteor.velocityX = random(1, 5);
      spaceShip.visible = true;
    }
  }

  if(frameCount % 30 === 0 && gameState == 1) {
    score++;
  }
  
  //spaceShip.display();

  moveRight();
  moveLeft();

  for(i = 0; i < meteors.length; i++) {
    if(meteors[i].isTouching(spaceShip)) {
      gameState = 2;
      end();
    }
  }

  if(gameState == 2) {
    fill("white")
    textSize(20);
    text("GAME OVER!", width/2 - 75, height/3)
  }

  drawSprites();

  textSize(25);
  fill("white")
  text(`Score ${score}`, width/2 - 50, 20);
}

function end() {
  if(gameState === 2) {
    for(i = 0; i < meteors.length; i++) {
      meteors[i].destroy();
    }
    spaceShip.visible = false;
    spaceShip.velocity.x = 0;
    score = 0;
    reset.visible = true;
    reset.debug = true;
    console.log(gameState);
    if (mousePressedOver(reset)) {
      console.log(gameState);
      restart();
    }
  }
}


function moveRight() {
  if(keyDown(RIGHT_ARROW)) {
          while(this.spaceShip.velocity.x < 12) {
              spaceShip.velocity.x = spaceShip.velocity.x+1; 
          }
  }
}

function moveLeft() {
  if(keyDown(LEFT_ARROW)) {
      while(this.spaceShip.velocity.x > -12) {
          spaceShip.velocity.x = spaceShip.velocity.x - 1; 
      }
  }
}

function restart() {
  gameState = 1;
  reset.visible = false;
  spaceShip.visible = true;
  spaceShip.depth = background.depth + 1;
}