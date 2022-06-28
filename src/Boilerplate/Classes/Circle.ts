import { MathHelper } from "../Modules/MathHelper";
import { Rectangle } from "./Rectangle";
import { Vector2 } from "./Vector2";

export class Circle {
    constructor(
        public position: Vector2,
        public radius: number,
    ) { }

    public static zero() {
        return new Circle(Vector2.zero(), 0);
    }

    public clone() {
        return new Circle(this.position.clone(), this.radius);
    }

    public intersectsPoint(point: Vector2) {
        return MathHelper.intersectsCirclePoint(this, point);
    }

    public intersectsRectangle(rectangle: Rectangle) {
        return MathHelper.intersectsCircleRectangle(this, rectangle);
    }
}
