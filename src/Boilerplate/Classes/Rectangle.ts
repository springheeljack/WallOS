import { MathHelper } from "../Modules/MathHelper";
import { Circle } from "./Circle";
import { Vector2 } from "./Vector2";

export class Rectangle {
    constructor(
        public position: Vector2,
        public size: Vector2,
    ) { }

    public static zero() {
        return new Rectangle(Vector2.zero(), Vector2.zero());
    }

    public clone() {
        return new Rectangle(this.position.clone(), this.size.clone());
    }

    public intersectsPoint(point: Vector2): boolean {
        return MathHelper.intersectsRectanglePoint(this, point);
    }

    public intersectsCircle(circle: Circle): boolean {
        return MathHelper.intersectsCircleRectangle(circle, this);
    }

    public top(): number {
        return this.position.y;
    }

    public bottom(): number {
        return this.position.y + this.size.y;
    }

    public left(): number {
        return this.position.x;
    }

    public right(): number {
        return this.position.x + this.size.x;
    }

    public center(): Vector2 {
        return this.position.add(this.size.divideNumber(2));
    }

    public topLeft(): Vector2 {
        return this.position;
    }

    public topRight(): Vector2 {
        return this.position.add(new Vector2(this.size.x, 0));
    }

    public bottomLeft(): Vector2 {
        return this.position.add(new Vector2(0, this.size.y));
    }

    public bottomRight(): Vector2 {
        return this.position.add(new Vector2(this.size.x, this.size.y));
    }

    public topCenter(): Vector2 {
        return this.center().subtract(new Vector2(0, this.size.y / 2));
    }

    public bottomCenter(): Vector2 {
        return this.center().add(new Vector2(0, this.size.y / 2));
    }

    public leftCenter(): Vector2 {
        return this.center().subtract(new Vector2(this.size.x / 2, 0));
    }

    public rightCenter(): Vector2 {
        return this.center().add(new Vector2(this.size.x / 2, 0));
    }

    public offset(offset: Vector2): Rectangle {
        return new Rectangle(this.position.add(offset), this.size);
    }
}
