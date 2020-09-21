var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlocksGroup;
var spookySound;
var gamestate = "play";

function preload () {
towerImg = loadImage("tower.png");
doorImg  = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
spookySound = loadSound("spooky.wav");  
}

function setup () {
  
createCanvas(600,600);  
 
spookySound.loop();  
  
tower = createSprite(300,300,600,600);
tower.addImage("running", towerImg);
tower.velocityY = 1;

doorsGroup = new Group();
climbersGroup = new Group();
invisibleBlocksGroup = new Group();  
  
ghost = createSprite(200,200,50,50);
ghost.addImage(ghostImg);
ghost.scale = 0.3;  

}

function draw () {

background(0);
  
if(gamestate === "play") {
   
  
if(tower.y > 400) {
   tower.y = 300;
   }

if(keyDown("left_arrow")) {
   ghost.x = ghost.x - 3; 
   }
  
if(keyDown("right_arrow")) {
   ghost.x = ghost.x + 3; 
   } 
  
if(keyDown("space")) {
   ghost.velocityY = -5; 
   }  
 
ghost.velocityY = ghost.velocityY + 0.8;  

if(climbersGroup.isTouching(ghost)) {
   ghost.velocityY = 0;
   }
  
if(invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600) {
   ghost.destroy();
   gamestate = "end";
   }
  
spawnDoors();
  
drawSprites()
}  

if(gamestate === "end") {
   stroke("yellow");
   fill("yellow");
   textSize(30);
   text("GAMEOVER",230,250);
   }
  
}

function spawnDoors () {
if(frameCount % 240 === 0) {
   door = createSprite(200,-50);
   door.addImage(doorImg);
  
   climber = createSprite(200,10);
   climber.addImage(climberImg);
  
   invisibleBlock = createSprite(200,15);
   invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
  
  
   door.x = Math.round(random(120,400)); 
   door.velocityY = 1;
  
   climber.x = door.x;
   climber.velocityY = 1;
   
   invisibleBlock.x = door.x;
   invisibleBlock.velocityY = 1;
  
   ghost.depth = door.depth;
   ghost.depth = ghost.depth + 1;
  
   door.lifeTime = 800;
   climber.lifeTime = 800;
  
   doorsGroup.add(door);
   climbersGroup.add(climber);
  
   invisibleBlock.debug = true;
   invisibleBlocksGroup.add(invisibleBlock);
   }
}