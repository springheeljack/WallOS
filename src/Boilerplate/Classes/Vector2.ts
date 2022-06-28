import { MathHelper } from "../Modules/MathHelper";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

export class Vector2 {
    constructor(
        public x: number,
        public y: number
    ) { }

    public static zero() {
        return new Vector2(0, 0);
    }

    public static unitFromAngle(angle: number) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }

    public clone() {
        return new Vector2(this.x, this.y);
    }

    public angle() {
        return Math.atan2(this.y, this.x);
    }

    public add(vector2: Vector2): Vector2 {
        return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }

    public addNumber(number: number): Vector2 {
        return new Vector2(this.x + number, this.y + number);
    }

    public subtract(vector2: Vector2): Vector2 {
        return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }

    public subtractNumber(number: number): Vector2 {
        return new Vector2(this.x - number, this.y - number);
    }

    public multiply(vector2: Vector2): Vector2 {
        return new Vector2(this.x * vector2.x, this.y * vector2.y);
    }

    public multiplyNumber(number: number): Vector2 {
        return new Vector2(this.x * number, this.y * number);
    }

    public divide(vector2: Vector2): Vector2 {
        return new Vector2(this.x / vector2.x, this.y / vector2.y);
    }

    public divideNumber(number: number): Vector2 {
        return new Vector2(this.x / number, this.y / number);
    }

    public distanceSquared(position: Vector2) {
        return (this.x - position.x) ** 2 + (this.y - position.y) ** 2;
    }

    public distance(position: Vector2) {
        return Math.sqrt(this.distanceSquared(position));
    }

    public intersectsRectangle(rectangle: Rectangle) {
        return MathHelper.intersectsRectanglePoint(rectangle, this);
    }

    public intersectsCircle(circle: Circle) {
        return MathHelper.intersectsCirclePoint(circle, this);
    }
}
