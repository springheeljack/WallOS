import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";

export class Picture {
    constructor(
        public image: HTMLImageElement,
        public rectangle: Rectangle
    ) { }

    draw(context: Context2D, offset: Vector2) {
        context.drawImageRectangle(this.image, this.rectangle.offset(offset));
    }
}
