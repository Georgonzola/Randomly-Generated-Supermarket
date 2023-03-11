function keyCheck() {
  
let tempX = theCamera.eyeX;
let tempZ = theCamera.eyeZ;
  
 theCamera.move(
 
       // D - right, A - left 
      (keyIsDown(68) ? playerSpeed : 0) + (keyIsDown(65) ? -playerSpeed : 0),
      // Q - down, E - up
      (keyIsDown(81) ? playerSpeed : 0) + (keyIsDown(69) ? -playerSpeed : 0),
      // S - backward, W - forward
      (keyIsDown(83) ? playerSpeed : 0) + (keyIsDown(87) ? -playerSpeed : 0)
 
 )
	
if(theCamera.eyeY > -100){	
  for (let i = 0; i<myMap.finalRooms.length; i++){

    myMap.finalRooms[i].checkBounds(tempX, tempZ);}	
}
  
 if (keyIsDown(80)) {
    print(theCamera.eyeX, theCamera.eyeZ, theCamera.eyeY);
 }  
  
  
 if (keyIsDown(13) == true || keyIsDown(27) == true) {

    exitPointerLock();
 }
	
	
  ////////////////////
if (lock == true){ 
theCamera.eyeY = -45;
} 
  
 if (keyIsDown(32) == true) {
   if (lock == false){
     theCamera.eyeY = -45;
   }
   
   lock = true;

 } 
  
  if (keyIsDown(16)){

    playerSpeed = 15;
  } else{
    playerSpeed = 5;
  }
  
}

function mouseClicked(){
	
	if (complete == true){
	     requestPointerLock();	
	}
 
}

function mouseWheel(event) {
 if (event.delta < 0){
   speed+=1;
   if (speed > 40){
     speed = 40;
   }
 } else{
   speed-=1;
   
   if (speed < 3){
     speed = 3;
   }
   
 }
}

function drawLights(){
  directionalLight(250,250,250,50,300,10)
  ambientLight(50)
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = loadImage(file.data);
  } else {
    img = null;
  }
}

function completeID(){
  if (img == false || name == ""){
    print("Please enter details")
  }else{
   complete = true;  
   theCamera.pan(-45)
  }

}

