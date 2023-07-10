//points and bounces counter 
let points = 0
let bounces = 0

// setting up the scrolling background
let bg;

//set up the UFO
let ufo
let ufoX
let ufoY

// keep track of bg location
let y1 = 0;
let y2 = -700;

// keep track of ball location
let ballX =500
let ballY =350

// keep track of the speed & direction of the ball
var speedX = 0
var speedY = 0
var d 
// var ospeedX

// store the X position of the paddle
var paddleX = 500

//keep track of the color of the ball
var h = 0
var hChange = 1

//setting up the sounds 
let bounceSound
let caughtSound
let overSound

function preload() {
  bg = loadImage('bg.png');
  ufo = loadImage('moon.png');
  bounceSound = loadSound('sounds/space_bounce.wav')
  caughtSound = loadSound('sounds/ship_caught.wav')
  overSound = loadSound('sounds/game_over.wav')


}

function setup() {
  let canvas = createCanvas(1000, 700);

  canvas.style('display', 'block');
  canvas.style('margin', 'auto');
  }

//start the game & reset the counter
function mousePressed(){

  if (speedX==0 && speedY==0){

    bounces=0
    points=0
    
    ufoX=random(180, 820)
    ufoY=random(180, 320)

    let a=random(0,1)
    if (a >= 0.5){
      d=1
    } else{
      d=-1
    }

    speedX = random(4,6) * d
    speedY = random(4,6) * d
    ospeedX=speedX

}

}


function draw() {
  //scrolling background

  image(bg, 0, y1);
  image(bg, 0, y2);

  y1 += 5;
  y2 += 5;

  if (y1 >= 700) {
    y1 = y2 - 700;
  }
  if (y2 >= 700) {
    y2 = y1 - 700;

  }

  //three borders
  noStroke()
  fill(255)
  rectMode(CORNER)
  rect(0,0,30,700)
  rect(0,0,1000,30)
  rect(970,0,30, 700)

  //ball
  
  //change the color[HUE] of the ball
  colorMode(HSB)
  h += hChange
  if (h == 256){
    hChange = -1
  }

  if (h == 0){
    hChange = 1
  }

  fill(h,90,60)
  ellipse(ballX, ballY, 30,30)

  colorMode(RGB)

    //paddle 
  fill(h)
  rectMode(CENTER)
  rect(paddleX, 685, 150, 30)

  if (speedX!=0 && speedY!=0){
  if (keyIsDown(65)) {
    paddleX -= 7;
  }
  if (keyIsDown(68)) {
    paddleX += 7;
  }

  if (paddleX < 105){
    paddleX = 105
  }

  if (paddleX > 895){
  paddleX = 895
  }
}

  //ball moves
  ballX += speedX
  ballY += speedY

  //bounce-left & right
  if (ballX <= 45 || ballX >= 955){
    if (ballX <= 45){
      fill(50,50,255)
      rectMode(CORNER)
      rect(0,30,30,670)
    }

    if (ballX >= 955){
      fill(50,50,255)
      rectMode(CORNER)
      rect(970,30,30,670)
    }
      bounceSound.play()
      bounces +=1
      speedX *= -1
  }

  //bounce-up
  if (ballY <= 45){
    fill(50,50,255)
    rectMode(CORNER)
    rect(30,0,940,30)
    bounceSound.play()
    bounces +=1
    speedY *= -1
  }

  //bounce-paddle
  if (ballY >= 655 && ballY <= 685 && Math.abs(ballX-paddleX)<=90 ){
    ballY = 655
    bounceSound.play()
    fill(50,50,255)
    rectMode(CENTER)
    rect(paddleX, 685, 150, 30)
    bounces +=1
    speedY *= -1
    if ((ballX-paddleX)<=0 ){
      speedX = map((ballX-paddleX), -90,0,-10,-3)
    }

    if ((ballX-paddleX)>0) {
      speedX = map((ballX-paddleX), 0,90,3,10)
    }
  }

  //miss
  if (ballY > 715 && (ballX < (paddleX-75) || ballX > (paddleX+75)) ){
    overSound.play()
    speedX=0
    speedY=0
    ballX=500
    ballY=350
    paddleX=500
    ufoX=1500
    ufoY=0

  }

  //ufo
  fill(h,150)
  ellipse(ufoX,ufoY,180,180)
  imageMode(CENTER)
  image(ufo, ufoX,ufoY, 150, 147)
  imageMode(CORNER)

  //hit the ufo
  if (dist(ballX,ballY,ufoX,ufoY)<= 105){
    points += 1
    caughtSound.play()
    fill(255,0,100)
    ellipse(ufoX,ufoY,180,180)
    ufoX=random(180, 820)
    ufoY=random(180, 320)
  }

   // display counter
    fill(0) 
    text("Bounces: " + bounces, 30, 20);
    text("Points: " + points, 150, 20);
    text("Speed: " + Math.abs(speedX), 270, 20);
    text("TIPS: bounce the ball faster at the corner of the paddle", 600, 20)
}


