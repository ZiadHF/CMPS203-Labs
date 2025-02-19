class Point {
  constructor(coordinateX, coordinateY) {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height = width) {
    this.checkValidity(height, width)
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
    this.isSquare = (width == height);
  }

  // ***************
  // METHODS
  // ***************

  checkValidity(height, width) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid width/height.");
    }
  }

  calculateArea() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }

  updateHeight(height) {
    if (height && height > 0) {
      this.height = height;
    }
    if (this.isSquare) {
      this.width = height;
    }
  }

  updateAll({ startingPoint, width, height }) {
    this.checkValidity(height, width);
    this.startingPoint = startingPoint;
    this.width = width;
    this.updateHeight(height);
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  // Assumes starting point is top left;
  printEndPoints() {
    const topRight = this.startingPoint.coordinateX + this.width;
    const bottomLeft = this.startingPoint.coordinateY - this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
}

function buildObject(width, x, height, y) {
  const mainPoint = new Point(x, y);
  return new Rectangle(mainPoint, width, height);
}

function checkValidSquare(squareHeight) {
  if (!squareHeight || squareHeight <= 0){
    throw new Error("Invalid height.");
  }
  return true;
}

function buildSquare(x, y, squareHeight) {
  checkValidSquare(squareHeight);
  let mainPoint = new Point(x,y);
  let square = new Rectangle(mainPoint, squareHeight);
  printSquare(square);
  return square;
}

function printSquare(square){
  const squareArea = square.calculateArea();
  const squarePerimeter = square.calculatePerimeter();
  console.log("Square Area: ", squareArea);
  console.log("Square Perimeter: ", squarePerimeter);
}

const myRect = buildObject(2, 3, 5, 4);
const mySquare = buildSquare(0,0,7);

console.log(mySquare.calculatePerimeter());
mySquare.printEndPoints();

myRect.updateHeight(3);