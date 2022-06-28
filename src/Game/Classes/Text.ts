import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { GameColour } from "../Modules/GameColour";

export class Text {
    constructor(
        public text: string | (() => string),
        public position: Vector2,
        public align: Align
    ) { }

    draw(context: Context2D, offset: Vector2) {
        context.drawString(typeof this.text === "string" ? this.text : this.text(), this.position.add(offset), 32, Fonts.PixelOperator, GameColour.text, this.align)
    }
}
