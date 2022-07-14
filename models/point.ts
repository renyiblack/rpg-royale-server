export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public sumX(value: number): Point {
        return new Point(this.x + value, this.y);
    }
    public sumY(value: number): Point {
        return new Point(this.x, this.y + value);
    }
    public subX(value: number): Point {
        return new Point(this.x - value, this.y);
    }
    public subY(value: number): Point {
        return new Point(this.x, this.y - value);
    }
}