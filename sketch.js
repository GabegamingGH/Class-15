var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage
var obstacles
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var PLAY = 1
var END = 0
var gamestate = PLAY
var score = 0
var cloudGroup
var obstacleGroup
var restart, restart_image
var gameOver, gameOver_image
var highScore = 0

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png")

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")

  restart_image = loadImage("restart.png")
  gameOver_image = loadImage("gameOver.png")
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  trex.debug = false
  trex.setCollider("circle",0,0,40)
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstacleGroup = new Group()
  cloudGroup = new Group()
}

function draw() {
  //set background color
  background(255);
  text(score,500,20)
  text("HI "+highScore,450,20)
  score = score+Math.round(frameCount/120)
  console.log(trex.y)
  if(gamestate === PLAY){
    ground.velocityX = -4;
  
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -13;
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds()
  
    spawnObstacles()
    if(trex.isTouching(obstacleGroup)){
      gamestate = END
    }
  }
  else if(gamestate === END){
    ground.velocityX = 0
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_collided)
    trex.velocityY = 0
    restart = createSprite(300,120,50,50)
    gameOver = createSprite(300,80,50,25)
    restart.addImage(restart_image)
    gameOver.addImage(gameOver_image)
    restart.scale = 0.5
    if (score>highScore){
      highScore = score
    }
    score = 0
  }
  
  // jump when the space key is pressed

  

  

  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds

  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if (frameCount%60===0){
 clouds = createSprite(550,Math.round(random(0,100)),60,50)
 clouds.velocityX = -5
 clouds.addImage(cloudImage)
 clouds.depth = trex.depth
 trex.depth = trex.depth+1
 clouds.lifetime=120
 cloudGroup.add(clouds)
 }
}

function spawnObstacles(){
  if (frameCount%60===0){
 obstacles = createSprite(600,169,20,50)
 obstacles.velocityX = -4
 obstacles.lifetime=190
 obstacles.scale = 0.55
 var rand = Math.round(random(1,6))
 switch(rand){
   case 1:obstacles.addImage(obstacle1)
   break;
   case 2:obstacles.addImage(obstacle2)
   break;
   case 3:obstacles.addImage(obstacle3)
   break;
   case 4:obstacles.addImage(obstacle4)
   break;
   case 5:obstacles.addImage(obstacle5)
   break;
   case 6:obstacles.addImage(obstacle6)
   break;
   default:break
 }
 obstacleGroup.add(obstacles)
  }
}