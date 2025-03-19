class Database {
    save(data) {
        console.log(`Saving data to the database: ${JSON.stringify(data)}`);
    }
}

class LocalFile {
    save(data) {
        console.log(`Saving data to the local file: ${JSON.stringify(data)}`);
    }
}

class Shape {
    constructor(type, dimensions) {
        this.type = type;
        this.dimensions = dimensions;
    }

    draw() {
        if (this.type === 'Circle') {
            // Draw circle logic
            console.log(`Drawing a circle with radius ${this.dimensions.radius}`);
        } else if (this.type === 'Rectangle') {
            // Draw rectangle logic
            console.log(`Drawing a rectangle with width ${this.dimensions.width} and height ${this.dimensions.height}`);
        } else if (this.type === 'Triangle') {
            // Draw triangle logic
            console.log(`Drawing a triangle with side lengths ${this.dimensions.sideA}, ${this.dimensions.sideB}, ${this.dimensions.sideC}`);
        } else {
            console.log('Unsupported shape');
        }
    }

    calculateArea() {
        if (this.type === 'Circle') {
            // Calculate circle area logic
            return Math.PI * Math.pow(this.dimensions.radius, 2);
        } else if (this.type === 'Rectangle') {
            // Calculate rectangle area logic
            return this.dimensions.width * this.dimensions.height;
        } else if (this.type === 'Triangle') {
            // Calculate triangle area logic
            const s = (this.dimensions.sideA + this.dimensions.sideB + this.dimensions.sideC) / 2;
            return Math.sqrt(s * (s - this.dimensions.sideA) * (s - this.dimensions.sideB) * (s - this.dimensions.sideC));
        } else {
            console.log('Unsupported shape');
            return 0;
        }
    }

    save() {
        const database = new Database();
        database.save(this.dimensions);
    }
}

// Example usage
// create a circle with radius 5, a rectangle with width 4 and height 6, and a triangle with side lengths 3, 4, and 5
// save dimensions of circle to database, rectangle to local file, and triangle to both database and local file
const localFile = new LocalFile();

const circle = new Shape('Circle', { radius: 5 });
circle.draw();
console.log(`Area of the circle: ${circle.calculateArea()}`);
circle.save();

const rectangle = new Shape('Rectangle', { width: 4, height: 6 });
rectangle.draw();
console.log(`Area of the rectangle: ${rectangle.calculateArea()}`);
localFile.save(rectangle.dimensions);

const triangle = new Shape('Triangle', { sideA: 3, sideB: 4, sideC: 5 });
triangle.draw();
console.log(`Area of the triangle: ${triangle.calculateArea()}`);
triangle.save();
localFile.save(triangle.dimensions);
