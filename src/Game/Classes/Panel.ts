import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Images } from "../../Boilerplate/Classes/Images";
import { Input } from "../../Boilerplate/Classes/Input";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { ImageNames } from "../Enums/ImageNames";
import { Programs } from "../Enums/Programs";
import { GameColour } from "../Modules/GameColour";

export abstract class Panel {
    private panelInnerRectangle: Rectangle;

    private panelOuterRectangle1: Rectangle;
    private panelOuterRectangle2: Rectangle;
    private panelOuterRectangle3: Rectangle;
    private panelOuterRectangle4: Rectangle;
    private panelOuterRectangle5: Rectangle;

    private panelTitleRectangle: Rectangle;

    private closeButtonRectangle1: Rectangle;
    private closeButtonRectangle2: Rectangle;
    private closeButtonRectangle3: Rectangle;
    private closeButtonRectangle4: Rectangle;
    private closeButtonRectangle5: Rectangle;

    private closeImage: HTMLImageElement;

    private toClose = false;
    private toFocus = false;
    private hasFocus = false;
    private isDragging = false;
    private dragOffset = Vector2.zero();

    constructor(
        public program: Programs,
        public name: string,
        public icon: HTMLImageElement,
        panelPosition: Vector2,
        panelSize: Vector2,
        images: Images
    ) {
        this.panelOuterRectangle1 = new Rectangle(panelPosition, panelSize.add(new Vector2(16, 56)));
        this.panelOuterRectangle2 = new Rectangle(panelPosition, panelSize.add(new Vector2(14, 54)));
        this.panelOuterRectangle3 = new Rectangle(panelPosition.addNumber(2), panelSize.add(new Vector2(12, 52)));
        this.panelOuterRectangle4 = new Rectangle(panelPosition.addNumber(2), panelSize.add(new Vector2(10, 50)));
        this.panelOuterRectangle5 = new Rectangle(panelPosition.addNumber(4), panelSize.add(new Vector2(8, 48)));
        this.panelTitleRectangle = new Rectangle(panelPosition.addNumber(8), new Vector2(panelSize.x, 36));
        this.panelInnerRectangle = new Rectangle(panelPosition.add(new Vector2(8, 48)), panelSize);

        this.closeButtonRectangle1 = new Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2(36, 32)), new Vector2(32, 28));
        this.closeButtonRectangle2 = new Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2(36, 32)), new Vector2(30, 26));
        this.closeButtonRectangle3 = new Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2(34, 30)), new Vector2(28, 24));
        this.closeButtonRectangle4 = new Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2(34, 30)), new Vector2(26, 22));
        this.closeButtonRectangle5 = new Rectangle(this.panelTitleRectangle.bottomRight().subtract(new Vector2(32, 28)), new Vector2(24, 20));

        this.closeImage = images.getImage(ImageNames.Close);
    }

    update(input: Input) {
        this.toFocus = false;

        this.updatePanel(this.panelInnerRectangle);
        this.toFocus = input.isButtonStartOfClick(MouseButton.Left)
            && input.getMousePosition().intersectsRectangle(this.panelOuterRectangle1);

        if (input.hasUnusedClick(MouseButton.Left)) {
            if (input.getMousePosition().intersectsRectangle(this.closeButtonRectangle1)) {
                this.toClose = true;
                input.setClickUsed(MouseButton.Left);
            }
            else if (input.getMousePosition().intersectsRectangle(this.panelOuterRectangle1)) {
                input.setClickUsed(MouseButton.Left);
            }
        }

        if (input.hasUnusedDown(MouseButton.Left)
            && input.getMousePosition().intersectsRectangle(this.panelTitleRectangle)
            && !input.getMousePosition().intersectsRectangle(this.closeButtonRectangle1)) {
            this.isDragging = true;
            this.dragOffset = input.getMousePosition().subtract(this.panelOuterRectangle1.position);
            this.toFocus = true;
            input.setDownUsed(MouseButton.Left);
        }
        else if (this.isDragging) {
            this.updatePosition(input.getMousePosition().subtract(this.dragOffset));

            if (input.isButtonEndOfClick(MouseButton.Left)) {
                this.isDragging = false;
            }
        }
    }

    draw(context: Context2D) {
        context.drawFillRectangle(this.panelOuterRectangle1, GameColour.greyscale0);
        context.drawFillRectangle(this.panelOuterRectangle2, GameColour.greyscale87);
        context.drawFillRectangle(this.panelOuterRectangle3, GameColour.greyscale50);
        context.drawFillRectangle(this.panelOuterRectangle4, GameColour.greyscale100);
        context.drawFillRectangle(this.panelOuterRectangle5, GameColour.greyscale75);

        context.drawFillRectangle(this.panelTitleRectangle, this.hasFocus ? GameColour.focusedWindowTitleRectangle : GameColour.unfocusedWindowTitleRectangle);

        context.drawFillRectangle(this.closeButtonRectangle1, GameColour.greyscale0);
        context.drawFillRectangle(this.closeButtonRectangle2, GameColour.greyscale100);
        context.drawFillRectangle(this.closeButtonRectangle3, GameColour.greyscale50);
        context.drawFillRectangle(this.closeButtonRectangle4, GameColour.greyscale87);
        context.drawFillRectangle(this.closeButtonRectangle5, GameColour.greyscale75);

        context.drawImageRectangle(this.icon, new Rectangle(this.panelTitleRectangle.position.add(new Vector2(4, 2)), new Vector2(32, 32)));
        context.drawString(this.name, this.panelTitleRectangle.leftCenter().add(new Vector2(42, 0)), 32, Fonts.PixelOperator,
            this.hasFocus ? GameColour.focusedWindowTitleText : GameColour.unfocusedWindowTitleText, Align.Left);
        context.drawImageRectangle(this.closeImage, new Rectangle(this.closeButtonRectangle5.position.add(new Vector2(4, 2)), new Vector2(16, 14)));

        context.save();
        context.beginPath();
        context.rect(this.panelInnerRectangle.position.x, this.panelInnerRectangle.position.y, this.panelInnerRectangle.size.x, this.panelInnerRectangle.size.y);
        context.clip();

        this.drawPanel(context, this.panelInnerRectangle);

        context.restore();
    }

    updatePosition(position: Vector2) {
        this.panelInnerRectangle.position = position.add(new Vector2(8, 48));
        this.panelOuterRectangle1.position = position;
        this.panelOuterRectangle2.position = position;
        this.panelOuterRectangle3.position = position.addNumber(2);
        this.panelOuterRectangle4.position = position.addNumber(2);
        this.panelOuterRectangle5.position = position.addNumber(4);
        this.panelTitleRectangle.position = position.addNumber(8);
        this.closeButtonRectangle1.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2(36, 32));
        this.closeButtonRectangle2.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2(36, 32));
        this.closeButtonRectangle3.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2(34, 30));
        this.closeButtonRectangle4.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2(34, 30));
        this.closeButtonRectangle5.position = this.panelTitleRectangle.bottomRight().subtract(new Vector2(32, 28));
    }

    getToClose() {
        return this.toClose;
    }

    getToFocus = () => this.toFocus;
    getHasFocus = () => this.hasFocus;

    setFocus = (focus: boolean) => this.hasFocus = focus;

    protected abstract drawPanel(context: Context2D, panelRectangle: Rectangle): void;
    protected abstract updatePanel(panelRectangle: Rectangle): void;
}
