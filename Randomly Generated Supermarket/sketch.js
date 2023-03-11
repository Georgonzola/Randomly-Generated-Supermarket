p5.disableFriendlyErrors = true;

let mouseSensitivity = 0.3
let roomsMax = 20;
let roomsCount = 0;
let numRows = 30;
let numColumns =40;
let cellWidth = 40;
let cellHeight = 40;
let playerSpeed = 5;
let cam;
let myFont;
let lock = false;
let complete = false;
let img;
let sc = 5;

function preload() {
  myFont = loadFont('Assets/Roboto-Regular.ttf');
  
  shelfEnd = loadModel("Assets/ShelfEnd.obj");
  shelfMiddle = loadModel("Assets/ShelfMiddle.obj");
  wallShelf = loadModel("Assets/WallShelf.obj");
  
  fruitEnd = loadModel("Assets/FruitEnd.obj");
  fruitMiddle = loadModel("Assets/FruitMiddle.obj");
  wallFruit = loadModel("Assets/WallFruit.obj");
  
  fridgeEnd = loadModel("Assets/FridgeEnd.obj");
  fridgeMiddle = loadModel("Assets/FridgeMiddle.obj");
  wallFridge = loadModel("Assets/WallFridge.obj");
  
  boxes = loadModel("Assets/Boxes.obj");
  boxCage = loadModel("Assets/BoxCage.obj");
  
  tables = loadModel("Assets/Tables.obj");
	
  cans = loadModel("Assets/Stock Objs/Cans.obj");
  scans = loadModel("Assets/Stock Objs/ShortCans.obj");
  lcans = loadModel("Assets/Stock Objs/LongCans.obj");

  drink = loadModel("Assets/Stock Objs/Drink.obj");
  sdrink = loadModel("Assets/Stock Objs/SmallDrink.obj");	
  ldrink = loadModel("Assets/Stock Objs/LargeDrink.obj");
	
  fruitMiddleTex = loadImage("Assets/Texture/Fruit Shelf Tex.png");
  fruitEndTex = loadImage("Assets/Texture/Fruit Shelf End Tex.png");
  fruitWallTex = loadImage("Assets/Texture/Fruit Shelf Wall Tex.png");

  fridgeMiddleTex = loadImage("Assets/Texture/Fridge.png");
  fridgeEndTex = loadImage("Assets/Texture/Fridge End.png");
  fridgeWallTex = loadImage("Assets/Texture/Wall Fridge.png");	
	
	
	
  canBase = loadImage('Assets/Texture/CansBase.png');
  sCanBase =  loadImage('Assets/Texture/ShortCansBase.png');
  lCanBase = loadImage('Assets/Texture/LongCansBase.png')
	
  drinkBase = loadImage('Assets/Texture/WaterBottleBase.png');
  sDrinkBase =  loadImage('Assets/Texture/SmallDrinkBase.png');
  lDrinkBase = loadImage('Assets/Texture/BigDrinkBase.png');
	
  boxesBase = loadImage('Assets/Texture/Boxes.png');
}



/////////////////////////////////////////////////////////////////////////////////////////


function setup() {
  createCanvas(1600, 1100, WEBGL);
  textFont(myFont);
  textSize(width / 70);
  angleMode(DEGREES);
  
  theCamera = createCamera();
  theCamera.move(-100,-100,-100);
  imageInput = createFileInput(handleFile);
  imageInput.position(0,0);
  textInput = createInput();
  textInput.position(0,30);
  button = createButton('submit');
  button.position(0,60);
	
	
  
  
  
  mTexture = createGraphics(600,600);
  sTexture = createGraphics(600,600);
  lTexture = createGraphics(600,600);
  canTexture = createGraphics(600,600);
  scanTexture = createGraphics(600,300);
  lcanTexture = createGraphics(600,300);
  textAlign(CENTER,CENTER);
  textSize(40);

////Changes camera clipping for further view distance and no close camera clipping
  angleMode(RADIANS);
  theCamera.perspective(PI / 3.0, width / height, 10, 2500)
  angleMode(DEGREES);
  
  myMap = new Map();
  
  
  myMap.rooms.push(new Room(1,1,numColumns-2,numRows-2,1));
  
  //translate(-600,-500,-100)
  
  for (let i = 0; i < myMap.rooms.length; i++){
    myMap.rooms[i].drawRoom();
  }
   
  for (let i = 0; i < myMap.finalRooms.length; i++){
    myMap.finalRooms[i].calculateShelves();
    //print(i, myMap.finalRooms[i].edges)
    
    
    //print( i, myMap.finalRooms[i].width, myMap.finalRooms[i].height, myMap.finalRooms[i].numRows, myMap.finalRooms[i].rowsRemainder,myMap.finalRooms[i].numSegments, myMap.finalRooms[i].segmentsRemainder)
  }
  



  ///////////////////////////////////////////////////////////////////////////////////////
}


function draw() {
  background(0);

  background(220);
  
  if (complete == false){
    push();
    translate(-600,-500,0)
    fill(255);
    rectMode(CENTER)
    rect(700,500,400,600)
    fill(0);
    text("ID:", 700,230)
    name = textInput.value();
    text(name,700,730)
    
    if (img){
      imageMode(CENTER)
      image(img,700,470,300,400)
    }
  
  pop();
    
  button.mousePressed(completeID);
        
  }else{
    
  textInput.hide();
  imageInput.hide();
  button.hide();
    
  createTextures();	
	
	
  drawLights();
  
 //////////////////////////////////////////////////////// 

	var x = map(mouseX, 0, width, -200, 200);
	var y = map(mouseY, 0, height, -200, 200);
  
    theCamera.pan(-movedX * mouseSensitivity);
    theCamera.tilt(movedY * mouseSensitivity);	
  /////////////////////////////////////////////////////////
  
  

  rotateX(90)
   
  
  for (let i = 0; i<myMap.finalRooms.length; i++){
    myMap.finalRooms[i].drawRoom();
   // myMap.finalRooms[i].drawBounds();
    myMap.finalRooms[i].drawShelves();

  }
  
    for (let i = 0; i<myMap.rooms.length; i++){
    if (myMap.rooms[i].willDivide == true){
      myMap.rooms[i].drawDivider();
    }
  }

  

  
   keyCheck();
  
  }
}

