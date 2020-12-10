//Create variables here
var dog,happyDog,database,foodS,foodStock;

function preload()
{
  //load images here
  Dog = loadImage("images/dogImg.png");
  Dog1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(Dog);
  dog.scale = 0.5;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(Dog1);
}

  drawSprites();
  //add styles here
textSize(17);
fill("white");
stroke("white");
text("Food Remaining:"+foodS,25,25);
text("Note:Press UP_ARROW Key To Feed Your Pet",25,50);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}