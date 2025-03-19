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
    constructor(type, dimensions, savers = [new Database()]) {
        this.type = type;
        this.dimensions = dimensions;
        this.savers = Array.isArray(savers) ? savers : [savers];
    }

    draw() {
        if (this.type === 'Circle') {
            console.log(`Drawing a circle with radius ${this.dimensions.radius}`);
        } else if (this.type === 'Rectangle') {
            console.log(`Drawing a rectangle with width ${this.dimensions.width} and height ${this.dimensions.height}`);
        } else if (this.type === 'Triangle') {
            console.log(`Drawing a triangle with side lengths ${this.dimensions.sideA}, ${this.dimensions.sideB}, ${this.dimensions.sideC}`);
        } else {
            console.log('Unsupported shape');
        }
    }

    calculateArea() {
        if (this.type === 'Circle') {
            return Math.PI * Math.pow(this.dimensions.radius, 2);
        } else if (this.type === 'Rectangle') {
            return this.dimensions.width * this.dimensions.height;
        } else if (this.type === 'Triangle') {
            const s = (this.dimensions.sideA + this.dimensions.sideB + this.dimensions.sideC) / 2;
            return Math.sqrt(s * (s - this.dimensions.sideA) * (s - this.dimensions.sideB) * (s - this.dimensions.sideC));
        } else {
            console.log('Unsupported shape');
            return 0;
        }
    }

    save() {
        this.savers.forEach(saver => saver.save(this.dimensions));
    }
}

// Example usage
const database = new Database();
const localFile = new LocalFile();

const circle = new Shape('Circle', { radius: 5 }, database);
circle.draw();
console.log(`Area of the circle: ${circle.calculateArea()}`);
circle.save();

const rectangle = new Shape('Rectangle', { width: 4, height: 6 }, localFile);
rectangle.draw();
console.log(`Area of the rectangle: ${rectangle.calculateArea()}`);
rectangle.save();

const triangle = new Shape('Triangle', { sideA: 3, sideB: 4, sideC: 5 }, [database, localFile]);
triangle.draw();
console.log(`Area of the triangle: ${triangle.calculateArea()}`);
triangle.save();