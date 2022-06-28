import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { GameColour } from "../Modules/GameColour";

export class Taskbar {
    private taskbarRect1 = new Rectangle(Vector2.zero(), new Vector2(0, 52));
    private taskbarRect2 = new Rectangle(Vector2.zero(), new Vector2(0, 2));
    private taskbarRect3 = new Rectangle(Vector2.zero(), new Vector2(0, 2));
    private taskbarOffset1 = 52;
    private taskbarOffset2 = 54;
    private taskbarOffset3 = 56;

    private timeRect1 = new Rectangle(Vector2.zero(), new Vector2(128, 44));
    private timeRect2 = new Rectangle(Vector2.zero(), new Vector2(126, 42));
    private timeRect3 = new Rectangle(Vector2.zero(), new Vector2(124, 40));
    private timeOffset1 = new Vector2(132, 48);
    private timeOffset2 = new Vector2(132, 48);
    private timeOffset3 = new Vector2(130, 46);

    private timeString = "";

    update(context: Context2D) {
        const canvasSize = context.getCanvasSize();

        this.taskbarRect1.position.y = canvasSize.y - this.taskbarOffset1;
        this.taskbarRect2.position.y = canvasSize.y - this.taskbarOffset2;
        this.taskbarRect3.position.y = canvasSize.y - this.taskbarOffset3;
        this.taskbarRect1.size.x = canvasSize.x;
        this.taskbarRect2.size.x = canvasSize.x;
        this.taskbarRect3.size.x = canvasSize.x;

        this.timeRect1.position = canvasSize.subtract(this.timeOffset1);
        this.timeRect2.position = canvasSize.subtract(this.timeOffset2);
        this.timeRect3.position = canvasSize.subtract(this.timeOffset3);

        const now = new Date(Date.now());
        let minutes = now.getMinutes().toString();
        if (minutes.length === 1)
            minutes = "0" + minutes;

        let hour = now.getHours();
        let meridiem = "AM";
        if (hour === 0)
            hour = 12;
        else if (hour > 12) {
            hour -= 12;
            meridiem = "PM";
        }

        this.timeString = `${hour}:${minutes} ${meridiem}`
    }

    draw(context: Context2D) {
        context.drawFillRectangle(this.taskbarRect1, GameColour.greyscale75);
        context.drawFillRectangle(this.taskbarRect2, GameColour.greyscale87);
        context.drawFillRectangle(this.taskbarRect3, GameColour.greyscale100);

        context.drawFillRectangle(this.timeRect1, GameColour.greyscale100);
        context.drawFillRectangle(this.timeRect2, GameColour.greyscale50);
        context.drawFillRectangle(this.timeRect3, GameColour.greyscale75);

        context.drawString(this.timeString, this.timeRect3.center(), 32, Fonts.PixelOperator, GameColour.text, Align.Center);
    }
}
