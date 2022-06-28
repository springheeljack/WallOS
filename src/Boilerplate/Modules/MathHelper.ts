import { Circle } from "../Classes/Circle";
import { Rectangle } from "../Classes/Rectangle";
import { Vector2 } from "../Classes/Vector2";

export module MathHelper {
    export function intersectsRectanglePoint(rectangle: Rectangle, point: Vector2): boolean {
        return point.x >= rectangle.position.x
            && point.x <= rectangle.position.x + rectangle.size.x
            && point.y >= rectangle.position.y
            && point.y <= rectangle.position.y + rectangle.size.y;
    }

    export function intersectsCirclePoint(circle: Circle, point: Vector2): boolean {
        return circle.position.distanceSquared(point) <= circle.radius ** 2;
    }

    export function intersectsCircleRectangle(circle: Circle, rectangle: Rectangle): boolean {
        return new Vector2(
            Math.max(rectangle.left(), Math.min(rectangle.right(), circle.position.x)),
            Math.max(rectangle.top(), Math.min(rectangle.bottom(), circle.position.y)))
            .distanceSquared(circle.position) <= circle.radius ** 2;
    }

    export function randomInt(lower: number, upper: number): number {
        const difference = (upper + 1) - lower;
        const random = Math.random() * difference;
        return Math.ceil(random + lower) - 1;
    }
}
