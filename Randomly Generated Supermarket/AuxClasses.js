class Bounds{
  constructor(){
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.bottom = 0;
  }
}

class Map {
  constructor() {
    this.rooms = [];
    this.finalRooms = [];
    this.maxRooms = 20;
    this.map = new Array(numColumns);
    for (let column = 0; column < numColumns; column++) {
      this.map[column] = new Array(numRows);
    }

    for (let column = 0; column < numColumns; column++) {
      for (let row = 0; row < numRows; row++) {
        this.map[column][row] = false;
      }
    }
  }
}

class Room {
  constructor(x, y, w, h, dir) {
    this.startPos = createVector(x, y);
    this.roomWidth = w;
    this.roomHeight = h;
    this.divideDirection = dir;
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.willDivide = true;
    this.finalRoom = false;
    this.num = myMap.rooms.length;

    if (this.divideDirection == 1 && this.roomWidth <= 5) {
      this.divideDirection = 0;
    }
    if (this.divideDirection == 0 && this.roomHeight <= 5) {
      this.divideDirection = 1;
    }

    if (this.roomHeight < 5 && this.roomWidth < 5) {
      this.willDivide = false;
    }

    if (this.roomHeight * this.roomWidth < 25) {
      this.willDivide = false;
    }

    if (this.divideDirection == 1) {
      this.buffer = round(this.roomWidth / 6);

      if (this.buffer < 3) {
        this.buffer = 3;
      }

      this.divide = round(random(this.buffer, this.roomWidth - this.buffer));
      this.length = this.roomHeight;
    } else {
      this.buffer = round(this.roomHeight / 6);

      if (this.buffer < 3) {
        this.buffer = 3;
      }

      this.divide = round(random(this.buffer, this.roomHeight - this.buffer));
      this.length = this.roomWidth;
    }
  }

  drawRoom() {
    if (this.willDivide == true && roomsCount < roomsMax) {
      this.drawDivider();
      this.createRooms();
    } else {
      this.finalRoom = true;
      this.createFinalRooms();
    }
  }

  drawDivider() {
    for (let i = 0; i < this.length; i++) {
      fill(50);
      if (this.divideDirection == 1) {
        rect(
          (this.startPos.x + this.divide) * cellWidth,
          (i + this.startPos.y) * cellHeight,
          cellWidth,
          cellHeight
        );
      } else {
        rect(
          (i + this.startPos.x) * cellWidth,
          (this.startPos.y + this.divide) * cellHeight,
          cellWidth,
          cellHeight
        );
      }
    }
  }

  createRooms() {
    roomsCount++;
    if (this.divideDirection == 1) {
      myMap.rooms.push(
        new Room(
          this.startPos.x,
          this.startPos.y,
          this.divide,
          this.roomHeight,
          0
        )
      );
      myMap.rooms.push(
        new Room(
          this.startPos.x + this.divide + 1,
          this.startPos.y,
          this.roomWidth - this.divide - 1,
          this.roomHeight,
          0
        )
      );
    } else {
      myMap.rooms.push(
        new Room(
          this.startPos.x,
          this.startPos.y,
          this.roomWidth,
          this.divide,
          1
        )
      );
      myMap.rooms.push(
        new Room(
          this.startPos.x,
          this.startPos.y + this.divide + 1,
          this.roomWidth,
          this.roomHeight - this.divide - 1,
          1
        )
      );
    }
  }

  createFinalRooms() {
    roomsCount++;

    if (this.willDivide == false) {
      myMap.finalRooms.push(
        new finalRoom(
          this.startPos.x,
          this.startPos.y,
          this.roomWidth,
          this.roomHeight
        )
      );
    } else {
      if (this.divideDirection == 1) {
        myMap.finalRooms.push(
          new finalRoom(
            this.startPos.x,
            this.startPos.y,
            this.divide,
            this.roomHeight
          )
        );
        myMap.finalRooms.push(
          new finalRoom(
            this.startPos.x + this.divide + 1,
            this.startPos.y,
            this.roomWidth - this.divide - 1,
            this.roomHeight
          )
        );
      } else {
        myMap.finalRooms.push(
          new finalRoom(
            this.startPos.x,
            this.startPos.y,
            this.roomWidth,
            this.divide
          )
        );
        myMap.finalRooms.push(
          new finalRoom(
            this.startPos.x,
            this.startPos.y + this.divide + 1,
            this.roomWidth,
            this.roomHeight - this.divide - 1
          )
        );
      }
    }
  }
}
