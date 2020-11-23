var gameState = "play"
var man, man_running
var road, roadImg
var police, policeImg
var cars, car1, car2, car3
var vehicle1, bike
var vehicle2, bus
var score = 0;
var line1, line2
var policeSound, walkieSound

function preload(){
 man_running = loadAnimation("man1.png", "man2.png", "man3.png", "man4.png", "man5.png", "man6.png", "man7.png", "man8.png");
 roadImg = loadImage("road.png")
policeImg = loadImage("police.png")

policeSound = loadSound("policeSound.mp3")
walkieSound = loadSound("walkieSound.mp3")
}



function setup() {
  createCanvas(1000, 400);
 road = createSprite(300, 155, displayWidth, displayHeight)
  road.addAnimation("road_traffic", roadImg); 
  road.x = road.width /2;
   road.velocityX = -4
  
   man = createSprite(250, 300, 10, 10)
   man.addAnimation("running", man_running); 
   man.scale  = 0.6
line1 = createSprite(200, 180, 800, 10)
  line2 = createSprite(200, 405, 800, 10)
  
   police = createSprite(40, 350, 10, 10)
police.addAnimation("police_car", policeImg)
police.scale = 1.2
  cars = new Group();

  //vehicle2 = new Group();
 
}



function draw() {
  background(100);

 
  




 if(gameState === "play"){  
  
  score = score + Math.round(getFrameRate()/60);
  line2.visible = false
  line1.visible = false
  if (road.x<450) {
    road.x = road.width/2;
    
    policeSound.play()
  }

  if(keyDown("space")){
   man.scale = 0.6
 man.velocityY = -4;
  }
man.velocityY = man.velocityY + 0.01   


if(keyDown("down")){
  man.scale = 0.4
  man.velocityY = man.velocityY + 4
}
  
   if(cars.isTouching(man)){
      man.x = man.x - 20
     
      cars.destroyEach()
   }
  if(man.isTouching(police)){
    policeSound.stop()
    man.velocityX = 0
    road.velocityX = 0
    score = 0
   man.visible = false
    fill("white")
    text("YOU HAVE BEEN CAUGHT. BETTER LUCK NEXT TIME! PRESS F5 KEY TO PLAY AGAIN", 400, 350) 

  }
  
 if(score >=2000){
 policeSound.stop()

  man.velocityX = 6
  score = 2000
 fill("white")
text("YOU ESCAPED. GOOD JOB!!", 350, 350)
road.velocityX = 0

 }

  man.velocityY = man.velocityY + 0.1 
  
  road.display()
  man.display()
  man.collide(line1)
  man.collide(line2)
  police.display()
  line1.display()
  line2.display()
  carGroup()
  
  drawSprites();




textSize(20)
fill("black")
 text("SCORE:"+ score, 20, 20)   
  
  }

function carGroup(){
 
  if (frameCount % 200 === 0) {
    var car = createSprite(420,120,40,10);
    car.y = random(270,360);
  
    car.addImage(policeImg);
car.scale = 1.2
   
    car.velocityX = -3
   
  car.depth = man.depth;
    man.depth = car.depth + 1;

     car.setLifetime = 600;
  cars.add(car);
    
  }
}

}

