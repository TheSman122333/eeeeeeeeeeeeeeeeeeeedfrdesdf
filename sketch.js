//Create variables here
var dog, happyDog, database, foodS, foodStock ,dogSprite;
var foodS = 0;
function preload()
{
  dog = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(500,500);
  dogSprite = createSprite(250, 250, 10, 10 );
  dogSprite.addImage(dog);
  dogSprite.scale = 0.25;


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').set({
    Food:x
  })
}