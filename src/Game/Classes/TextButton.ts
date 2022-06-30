import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Input } from "../../Boilerplate/Classes/Input";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { GameColour } from "../Modules/GameColour";

export class TextButton {
    private isEnabled: boolean;

    constructor(
        public text: string,
        public rectangle: Rectangle,
        public onClick: () => void,
        public enabled: boolean | (() => boolean) = true,
        private onEnable?: () => void,
        private onDisable?: () => void,
    ) {

    }

    setIsEnabled() {
        this.isEnabled = typeof this.enabled === "boolean" ? this.enabled : this.enabled();

        if (this.isEnabled) {
            if (this.onEnable != null) {
                this.onEnable();
            }
        }
        else {
            if (this.onDisable != null) {
                this.onDisable();
            }
        }
    }

    update(input: Input, offset: Vector2) {
        this.setIsEnabled();

        if (this.isEnabled && input.hasUnusedClick(MouseButton.Left) && input.getMousePosition().intersectsRectangle(
            new Rectangle(offset.add(this.rectangle.position), this.rectangle.size.addNumber(8)))) {
            input.setClickUsed(MouseButton.Left);
            this.onClick();
        }
    }

    draw(context: Context2D, offset: Vector2) {
        context.drawFillRectangle(new Rectangle(offset.add(this.rectangle.position), this.rectangle.size.addNumber(8)), GameColour.greyscale0);
        context.drawFillRectangle(new Rectangle(offset.add(this.rectangle.position), this.rectangle.size.addNumber(6)), GameColour.greyscale100);
        context.drawFillRectangle(new Rectangle(offset.add(this.rectangle.position).addNumber(2), this.rectangle.size.addNumber(4)), GameColour.greyscale50);
        context.drawFillRectangle(new Rectangle(offset.add(this.rectangle.position).addNumber(2), this.rectangle.size.addNumber(2)), GameColour.greyscale100);
        context.drawFillRectangle(new Rectangle(offset.add(this.rectangle.position).addNumber(4), this.rectangle.size), GameColour.greyscale75);

        context.drawString(this.text, offset.add(this.rectangle.center().addNumber(4)), 32, Fonts.PixelOperator, this.isEnabled ? GameColour.text : GameColour.textDisabled, Align.Center);
    }
}
