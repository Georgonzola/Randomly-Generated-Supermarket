///////////////////////////////////////////////////////////////////////////////////////////////////
// DIR = TRUE MEANS VERTICAL
//////////////////////////////////////////////
class finalRoom {
  constructor(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;
    this.num = myMap.finalRooms.length;
    this.short = 0;
    this.long = 0;
    this.numRows = 0;
    this.numSegments = 0;
    this.rowsRemainder = 0;
    this.segmentsRemainder = 0;
    this.dir = null;
    this.edges = [0, 0, 0, 0];
    this.hasEdge = false;
    this.end = 0;
    this.middle = 0;
    this.wall = 0;
    ///////////////l r t b
    this.bounds = [];
	this.stock = [];
	this.type = null;
    /////////////////////////////////////////////////////////////
    /* EDGES POSITION
            0
        __________
       |          |
       |          |
   3   |          |   1
       |          |
       |          |    
       |__________|
       
            2
                   
    */
    ////////////////////////////////////////////////////////////
  }

  drawRoom() {
    push();

    /*     
    push();
    
     
    translate(cellWidth, cellWidth, 0) 
    rotateX(90)
    translate(0, 0, 0)  
    fill(255,255,255);
    scale(1,sc,1)
    rect(0,0,500,500)     
    pop(); 
*/

    fill(255, 255, 255);

    rect(
      this.pos.x * cellWidth,
      this.pos.y * cellHeight,
      this.width * cellWidth,
      this.height * cellHeight
    );

    push();

    translate(0, 0, 1);
    fill(56, 140, 132);

    rectMode(CENTER);
/*
    if (this.edges[0] == true) {
      rect(
        this.pos.x * cellWidth + (this.width * cellWidth) / 2,
        this.pos.y * cellHeight + 5,
        this.width * cellWidth,
        10
      );
    }

    if (this.edges[2] == true) {
      rect(
        this.pos.x * cellWidth + (this.width * cellWidth) / 2,
        this.pos.y * cellHeight + this.height * cellHeight - 5,
        this.width * cellWidth,
        10
      );
    }

    if (this.edges[3] == true) {
      rect(
        this.pos.x * cellWidth + 5,
        this.pos.y * cellHeight + (this.height * cellHeight) / 2,
        10,
        this.height * cellHeight
      );
    }

    if (this.edges[1] == true) {
      rect(
        this.pos.x * cellWidth + this.width * cellWidth - 5,
        this.pos.y * cellHeight + (this.height * cellHeight) / 2,
        10,
        this.height * cellHeight
      );
    }
*/
    pop();
/*
    translate(0, 0, 2);
    fill(252, 3, 40);
    rect(this.pos.x * cellWidth, this.pos.y * cellHeight, 30, 30);
    fill(250);
    translate(0, 0, 1);
    textAlign(CENTER);
    text(
      this.num,
      this.pos.x * cellWidth + cellWidth / 2,
      this.pos.y * cellHeight + cellHeight / 2
    );
	*/
    pop();
  }

  calculateShelves() {
    if (this.width > this.height) {
      this.dir = false;
      this.long = this.width;
      this.short = this.height;
    } else {
      this.dir = true;
      this.long = this.height;
      this.short = this.width;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////
    ///CHECK EDGES
    /////////////////////////////////////////////////////////////////////////////////////////////
    if (this.pos.y == 1 && this.dir == false) {
      this.edges[0] = true;
    }

    if (this.pos.x + this.width == numColumns - 1 && this.dir == true) {
      this.edges[1] = true;
    }

    if (this.pos.y + this.height == numRows - 1 && this.dir == false) {
      this.edges[2] = true;
    }

    if (this.pos.x == 1 && this.dir == true) {
      this.edges[3] = true;
    }

    if (this.long >= 6) {
      for (let i = 0; i < this.edges.length; i++) {
        if (this.edges[i] == true) {
          this.short -= 2;
          this.hasEdge = true;
        }
      }
    }

    this.numRows = 1 + floor((this.short - 2) / 3);
    this.rowsRemainder = (this.short - 2) % 3;
    this.numSegments = floor((this.long - 6) / 2);
    this.segmentsRemainder = (this.long - 6) % 2;

    this.createBounds();

    /////////////////////////////////////////////////////////////////////////////////////////////
    ///VARIATIONS
    /////////////////////////////////////////////////////////////////////////////////////////////
    if (this.long < 12) {
      let temp = round(random(1, 3));

      switch (temp) {
        case 1:
          this.end = fruitEnd;
          this.middle = fruitMiddle;
          this.wall = wallFruit;
		  this.type = "Fruit"
          break;

        case 2:
          this.end = fridgeEnd;
          this.middle = fridgeMiddle;
          this.wall = wallFridge;
		  this.type = "Fridge"			  
          break;

        default:
          this.end = shelfEnd;
          this.middle = shelfMiddle;
          this.wall = wallShelf;
		  this.type = "Shelf"
          break;
      }
    } else {
      this.end = shelfEnd;
      this.middle = shelfMiddle;
      this.wall = wallShelf;
	  this.type = "Shelf"	
    }
	  
	  for (let i = 0 ; i< numRows; i++){
		this.stock.push(new Stock(this.numSegments));
		print(this.num);
		this.stock[i].initialiseStock();
	  }
	  
  }

  /////////////////////////////////////////////////////////////////

  createBounds() {
    let temp;
    let xoffset;
    let zoffset;

	 	
    if (this.long >= 6) {
      for (let i = 0; i < this.numRows; i++) {
        temp = 0;
        this.bounds.push(new Bounds());
        switch (this.rowsRemainder) {
          case 1:
            temp += cellWidth / 2;
            break;
          case 2:
            temp += cellWidth;
            break;
        }

        xoffset = i * cellWidth * 3;
        zoffset = 0;

        if (
          this.hasEdge == true &&
          this.edges[1] == false &&
          this.edges[2] == false
        ) {
          xoffset += 2 * cellWidth;
        }

        if (this.dir) {
          xoffset += cellWidth * this.pos.x;
          zoffset += cellWidth * this.pos.y;
        } else {
          xoffset += cellWidth * this.pos.y;
          zoffset += cellWidth * this.pos.x;
        }

        xoffset += temp;

        if (this.segmentsRemainder) {
          zoffset += cellWidth / 2;
        }

        if (this.dir) {
          this.bounds[i].left = xoffset;
          this.bounds[i].bottom = zoffset;
        } else {
          this.bounds[i].bottom = xoffset;
          this.bounds[i].left = zoffset;
        }

        xoffset += cellWidth * 2;
        zoffset += cellWidth * this.long;
        if (this.segmentsRemainder) {
          zoffset -= cellWidth;
        }

        if (this.dir) {
          this.bounds[i].top = zoffset;
          this.bounds[i].right = xoffset;
        } else {
          this.bounds[i].right = zoffset;
          this.bounds[i].top = xoffset;
        }
      }

    } else {
      this.bounds.push(new Bounds());
      if (this.short < 4) {
        if (this.long - this.short <= 1) {
          //////////////////////////////////////////////////////////////////
          //  Buffer
          //////////////////////////////////////////////////////////////////
          if (this.long - this.short > 0) {
            //translate(this.dir ? 0: cellWidth/2 ,0,this.dir ? cellWidth/2: 0)
          }
			
		if (this.dir) {
          this.bounds[0].left = cellWidth * this.pos.x;
          this.bounds[0].bottom = cellWidth * this.pos.y;
          this.bounds[0].right = cellWidth * (this.pos.x + this.width);
          this.bounds[0].top = cellWidth * (this.pos.y + this.height);
        } else {
          this.bounds[0].left = cellWidth * this.pos.x;
          this.bounds[0].bottom = cellWidth * this.pos.y;
          this.bounds[0].right = cellWidth * (this.pos.x + this.width);
          this.bounds[0].top = cellWidth * (this.pos.y + this.height);
        }

          //////////////////////////////////////////////////////////////////
          //  Box Stack
          //////////////////////////////////////////////////////////////////
        } else {
          //////////////////////////////////////////////////////////////////
          //  Box Cage  (Sides Shorter than 4 and inequal)
          //////////////////////////////////////////////////////////////////

        if (this.dir) {
          this.bounds[0].left = cellWidth * this.pos.x;
          this.bounds[0].bottom = cellWidth * this.pos.y;
          this.bounds[0].right = cellWidth * (this.pos.x + this.width);
          this.bounds[0].top = cellWidth * (this.pos.y + this.height);
        } else {
          this.bounds[0].left = cellWidth * this.pos.x;
          this.bounds[0].bottom = cellWidth * this.pos.y;
          this.bounds[0].right = cellWidth * (this.pos.x + this.width);
          this.bounds[0].top = cellWidth * (this.pos.y + this.height);
        }
        }
      } else {
        //////////////////////////////////////////////////////////////////
        //  Tables  (Sides Shorter than 6)
        //////////////////////////////////////////////////////////////////
/*
        if (this.dir) {
          this.bounds[0].left = cellWidth * this.pos.x;
          this.bounds[0].bottom = cellWidth * this.pos.y;
          this.bounds[0].right = cellWidth * (this.pos.x + this.width);
          this.bounds[0].top = cellWidth * (this.pos.y + this.height);
        } else {
          this.bounds[0].left = cellWidth * this.pos.x;
          this.bounds[0].bottom = cellWidth * this.pos.y;
          this.bounds[0].right = cellWidth * (this.pos.x + this.width);
          this.bounds[0].top = cellWidth * (this.pos.y + this.height);
        }
		*/
      }
		
    }
	  
	/////////////////////////////////////////////////////////////////////
	//EDGES
	////////////////////////////////////////////////////
	
	if (this.hasEdge){
	this.bounds.push(new Bounds());
		
	let length = this.bounds.length - 1;	
		
	if (this.edges[1] || this.edges[2])	{
		xoffset = cellWidth*(this.short+1);			
	}else{
		xoffset = 0;			
	}
			

	zoffset = 0;
		
	if (this.dir) {
    	xoffset += cellWidth * this.pos.x;
    	zoffset += cellWidth * this.pos.y;
    } else {
        xoffset += cellWidth * this.pos.y;
        zoffset += cellWidth * this.pos.x;}
		
	if (this.dir) {
        this.bounds[length].left = xoffset;
        this.bounds[length].bottom = zoffset;
    } else {
        this.bounds[length].bottom = xoffset;
        this.bounds[length].left = zoffset;}
		
	xoffset += cellWidth;
	zoffset += cellWidth * this.long;
		
	if (this.dir) {
        this.bounds[length].top = zoffset;
        this.bounds[length].right = xoffset;
    } else {
        this.bounds[length].right = zoffset;
        this.bounds[length].top = xoffset;}
	}  
	  
  }

  drawBounds() {
    push();

    rotateX(0);

    push();
    translate(this.pos.x * cellWidth, this.pos.y * cellWidth, 0);
    ambientMaterial(50);
    sphere(10);
    pop();

    sphere(10);

	  
      for (let i = 0; i < this.bounds.length; i++) {
        //RED
        push();
        noStroke();
        translate(this.bounds[i].left, this.bounds[i].bottom, 0);
        fill(235, 64, 52);
        sphere(10);
		translate(0, 0, 10);
		fill(250);
		text(this.num,0,0)
        pop();

        //YELLOW
        push();
        noStroke();
        translate(this.bounds[i].left, this.bounds[i].top, 0);
        fill(255, 237, 71);
        sphere(10);
		translate(0, 0, 10);
		fill(250);
		text(this.num,0,0)
        pop();

        //BLUE
        push();
        noStroke();
        translate(this.bounds[i].right, this.bounds[i].bottom, 0);
        fill(71, 108, 255);
        sphere(10);		
		translate(0, 0, 1);
		fill(250);
		text(this.num,0,0)
        pop();

        //PINK
        push();
        noStroke();
        translate(this.bounds[i].right, this.bounds[i].top, 0);
        fill(237, 71, 255);
        sphere(10);
		translate(0, 0, 10);
		fill(250);
		text(this.num,0,0)
        pop();
      }
    
    pop();
  }
	
	
  checkBounds(tempX, tempZ){
	  for(let i = 0; i< this.bounds.length; i++){	  
		  		  
	if (this.dir){
      if (theCamera.eyeZ > this.bounds[i].bottom-20 && theCamera.eyeZ < this.bounds[i].top+20 && theCamera.eyeX < this.bounds[i].right && theCamera.eyeX > this.bounds[i].left){
		 //print("IN")
      theCamera.eyeZ = tempZ
	  
	  } 
      
      if (theCamera.eyeX < this.bounds[i].right+5 && theCamera.eyeX > this.bounds[i].left-5 && theCamera.eyeZ > this.bounds[i].bottom && theCamera.eyeZ < this.bounds[i].top){
		 //print("IN")		  
      theCamera.eyeX = tempX
	  
	  }
      
    } else{
      
      if (theCamera.eyeZ > this.bounds[i].bottom-5 && theCamera.eyeZ < this.bounds[i].top+5 && theCamera.eyeX < this.bounds[i].right && theCamera.eyeX > this.bounds[i].left){
		 //print("IN")		  
      theCamera.eyeZ = tempZ
	  
	  }
      
      if (theCamera.eyeX < this.bounds[i].right+20 && theCamera.eyeX > this.bounds[i].left-20 && theCamera.eyeZ > this.bounds[i].bottom && theCamera.eyeZ < this.bounds[i].top){
		 //print("IN")		  
      theCamera.eyeX = tempX
	  
	  }}        

		  
	  }
  }	

  //////////////////////////////////////////////////////////////////////////////////////////////////

  drawShelves() {
    push();

    noStroke();
    ambientMaterial(50);
    rotateX(-90);

    /////////////////////////////////////////////////////////////////////
    /// Small sections
    /////////////////////////////////////////////////////////////////////
    translate(this.pos.x * cellWidth, 0, this.pos.y * cellHeight);

    if (this.long < 6) {
      if (this.short < 4) {
        if (this.long - this.short <= 1) {
          //////////////////////////////////////////////////////////////////
          //  Buffer
          //////////////////////////////////////////////////////////////////
          if (this.long - this.short > 0) {
            translate(
              this.dir ? 0 : cellWidth / 2,
              0,
              this.dir ? cellWidth / 2 : 0
            );
          }

          //////////////////////////////////////////////////////////////////
          //  Box Stack  (Sides Shorter than 4 and relatively equal)
          //  2x2 2x3 3x3 3x4
          //////////////////////////////////////////////////////////////////

          push();
          scale(-1);
          rotateY(180);
          scale(cellWidth / 20);
          scale(this.short / 2);
		  texture(boxesBase);
          model(boxes);
          pop();
        } else {
          //////////////////////////////////////////////////////////////////
          //  Box Cage  (Sides Shorter than 4 and inequal)
          //  2x4 2x5 3x5
          //////////////////////////////////////////////////////////////////
          push();

          scale(-1);
          rotateY(270);
          rotateY(this.dir ? -90 : 0);

          translate(this.dir ? 0 : -this.short * cellWidth, 0, 0);

          scale(cellWidth / 20);
          scale(this.short, this.long / 3, this.long / 2);
          model(boxCage);
          pop();
        }
      } else {
        //////////////////////////////////////////////////////////////////
        //  Tables  (Sides Shorter than 6)
        //  4x4 5x4 5x5
        //////////////////////////////////////////////////////////////////
/*
        push();
        scale(-1);
        rotateY(180);
        scale(cellWidth / 20);
        scale(
          this.dir ? this.short / 2 : this.long / 2,
          this.long / 2,
          this.dir ? this.long / 2 : this.short / 2
        );
        model(tables);
        pop();
		
		*/
      }
    }

    translate(cellWidth, 0, cellWidth);

    scale(-1);

    translate(this.dir ? 0 : -cellWidth, 0, this.dir ? -cellWidth : 0);

    rotateY(this.dir ? 0 : 90);

    if (this.edges[1] == true || this.edges[2] == true) {
      translate(
        0,
        0,
        this.dir
          ? -(this.height - 4) * cellHeight
          : -(this.width - 4) * cellWidth
      );
      translate(
        this.dir
          ? -(this.width - 2) * cellWidth
          : (this.height - 2) * cellHeight,
        0,
        0
      );

      rotateY(180);
    }

    /////////////////////////////////////////////////////////////////////
    /// Wall section
    /////////////////////////////////////////////////////////////////////

    if (this.long >= 6 && this.hasEdge == true) {		
      push();
      translate(this.dir ? cellWidth : -cellWidth, 0, 0);
      rotateY(this.dir ? 0 : 180);
      translate(0, 0, this.dir ? cellWidth : -cellWidth);

      if (this.segmentsRemainder) {
        translate(0, 0, this.dir ? -cellWidth / 2 : cellWidth / 2);
      }

      for (let i = 0; i < this.numSegments + 3; i++) {
        scale(cellWidth / 20);
		  
		if (this.type == "Fruit"){
			texture(fruitWallTex);//////////////////////////////////////////////////////////
		}
		if (this.type == "Fridge"){
			texture(fridgeWallTex);//////////////////////////////////////////////////////////
		}
		if (this.type == "Shelf"){
			specularMaterial(60);
		}  
		  
		  
        model(this.wall);
        scale(20 / cellWidth);
        translate(0, 0, this.dir ? -cellWidth * 2 : cellWidth * 2);
      }

      pop();

      translate(this.dir ? -cellWidth * 2 : cellWidth * 2, 0, 0);
		
    }

    ////////////////////////////////////////////////////////////////////////
    /// Buffer
    ////////////////////////////////////////////////////////////////////////

    switch (this.rowsRemainder) {
      case 1:
        translate(this.dir ? -cellWidth / 2 : cellWidth / 2, 0, 0);
        break;
      case 2:
        translate(this.dir ? -cellWidth : cellWidth, 0, 0);
        break;
    }

    if (this.long >= 6) {
      /////////////////////////////////////////////////////////////////////
      /// Start segment
      /////////////////////////////////////////////////////////////////////

      push();
      if (this.segmentsRemainder) {
        translate(0, 0, -cellWidth / 2);
      }		
		
      for (let i = 0; i < this.numRows; i++) {
		 if (this.type == "Shelf"){
			 specularMaterial(60);
		this.stock[i].drawStock();}
        scale(cellWidth / 20);
		if (this.type == "Fruit"){
				texture(fruitEndTex);//////////////////////////////////////////////////////////
		} 	
		if (this.type == "Fridge"){
			texture(fridgeEndTex);//////////////////////////////////////////////////////////
		} 
        model(this.end);
        scale(20 / cellWidth);
        translate(this.dir ? -cellWidth * 3 : cellWidth * 3, 0, 0);
      }

      pop();

      /////////////////////////////////////////////////////////////////////
      ///Middle segment
      /////////////////////////////////////////////////////////////////////

      push();

      if (this.segmentsRemainder) {
        translate(0, 0, -cellWidth / 2);
      }

      for (let i = 0; i < this.numSegments; i++) {
        translate(0, 0, -cellWidth * 2);
        push();
        for (let i = 0; i < this.numRows; i++) {
          scale(cellWidth / 20);
			
			if (this.type == "Fruit"){
				texture(fruitMiddleTex);//////////////////////////////////////////////////////////
			}
			if (this.type == "Fridge"){
			texture(fridgeMiddleTex);//////////////////////////////////////////////////////////
			} 
			if (this.type == "Shelf"){
			 specularMaterial(60);
			}
          model(this.middle);
          scale(20 / cellWidth);
          translate(this.dir ? -cellWidth * 3 : cellWidth * 3, 0, 0);
        }
        pop();
      }

      pop();

      /////////////////////////////////////////////////////////////////////
      ///End segment
      /////////////////////////////////////////////////////////////////////

      push();

      if (this.segmentsRemainder) {
        translate(0, 0, cellWidth / 2);
      }
      rotateY(180);

      translate(0, 0, (this.long - 4) * cellWidth);

      for (let i = 0; i < this.numRows; i++) {
        scale(cellWidth / 20);
		  
		if (this.type == "Fruit"){
				texture(fruitEndTex);//////////////////////////////////////////////////////////
		}  
		  if (this.type == "Fridge"){
			texture(fridgeEndTex);//////////////////////////////////////////////////////////
		} 
		if (this.type == "Shelf"){
			specularMaterial(60);
		}  
        model(this.end);
        scale(20 / cellWidth);
        translate(this.dir ? cellWidth * 3 : -cellWidth * 3, 0, 0);
      }

      pop();
    }

    pop();
  }
}