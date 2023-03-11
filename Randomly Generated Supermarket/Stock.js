class Stock{
	constructor(segments){
		this.numSegments = segments;
		this.values = [];
		//this.textures = [];
		this.models = [];
		this.textures = [];
		this.count = 0;
		this.type = floor(random(0,1.9))
	}
	
	
initialiseStock(){
  for (let i = 0; i< 66; i++){
     this.values.push(floor(random(0,2.9)));}  

 for (let j = 0; j < this.numSegments; j++){
 	for (let i = 0; i < 24; i++){
     	this.values.push(floor(random(0,2.9)));}}
	
if (this.type == 0){
	this.models[0]=cans;
	this.models[1]=scans;	
	this.models[2]=lcans;
	
	this.textures[0]=canTexture;
	this.textures[1]=scanTexture;	
	this.textures[2]=lcanTexture;	
}else{
	this.models[0]=drink;
	this.models[1]=sdrink;	
	this.models[2]=ldrink;	
	
	this.textures[0]=mTexture;
	this.textures[1]=sTexture;	
	this.textures[2]=lTexture;	
}
	
}	
	
drawStock(){
	
this.count = 0;
push();
  push();
  	translate(0.6*cellWidth, 0.25*cellWidth, 0.9*cellWidth);
	
	//sphere();d
	
  	this.drawDouble();
	this.drawSingle();
  	translate(0,0.65*cellWidth,0);
  	this.drawDouble();
  	this.drawSingle();  
  	translate(0,0.65*cellWidth,0);
  	this.drawDouble();
  	this.drawSingle();
  pop();
	
	
  push();
	rotateY(180)
    translate(0,0,(2*cellWidth) + 2*this.numSegments*cellWidth)
  	translate(0.6*cellWidth, 0.25*cellWidth, 0.9*cellWidth);
	
	//sphere();
	
  	this.drawDouble();
	this.drawSingle();
  	translate(0,0.65*cellWidth,0);
  	this.drawDouble();
  	this.drawSingle();  
  	translate(0,0.65*cellWidth,0);
  	this.drawDouble();
  	this.drawSingle();
  pop();
	  	
	translate(0.6*cellWidth, 0.25*cellWidth, 0.9*cellWidth);
	for (let i = 0; i < this.numSegments; i++) {
      translate(0, 0, -cellWidth * 2);
	push();
	  this.drawDouble();
	  translate(0,0.65*cellWidth,0);
	  this.drawDouble();
	  translate(0,0.65*cellWidth,0);
	  this.drawDouble();		
	pop();
	}
	
pop();
}


	
	
	
	
drawSingle(){
	
push();
  
  rotateY(90);
  translate(-0.7*cellWidth,0,0)
  rotateY(180)
  translate(0,0,0.3*cellWidth)
    push();
    for(let i = 0; i < 3; i++){
	push();
	scale(0.75)
	//this.models[this.values[this.count]]
	texture(this.textures[this.values[this.count]])	
    model(this.models[this.values[this.count]])
	pop();
    this.count+=1;
    translate(0,0,0.45*cellWidth)}
    pop();
  
 pop();}

	
	
drawDouble(){
	
 push();
  translate(0,0,-0.075*cellWidth)
   push();
	
    for(let i = 0; i < 4; i++){
    push();
	scale(0.75)
	texture(this.textures[this.values[this.count]])	
    model(this.models[this.values[this.count]])
	pop();  
    this.count+=1;
    translate(0,0,-0.45*cellWidth)}
   pop();
      
	translate(0,0,-0.3*cellWidth)
  	translate(-1.2*cellWidth,0,0);
  	rotateY(180);
	
    push();
    for(let i = 0; i < 4; i++){
	push();
	scale(0.75)
	texture(this.textures[this.values[this.count]])	
    model(this.models[this.values[this.count]])
	pop();  
    this.count+=1;
    translate(0,0,0.45*cellWidth)}
    pop();
      

pop();
}
	
	
}