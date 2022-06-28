import { Align } from "../Enums/Align";
import { Fonts } from "../Enums/Fonts";
import { Circle } from "./Circle";
import { Colour } from "./Colour";
import { Rectangle } from "./Rectangle";
import { Vector2 } from "./Vector2";

export type Context2D = CanvasRenderingContext2D;

declare global {
    interface CanvasRenderingContext2D {
        drawString(text: string, position: Vector2, size: number, font: Fonts, colour: Colour, align: Align): void;
        measureString(text: string, size: number, font: Fonts, align: Align): TextMetrics;
        setAlign(align: Align): void;
        setFont(font: Fonts, size: number): void;

        drawFillRectangle(rectangle: Rectangle, colour: Colour): void;
        drawStrokeRectangle(rectangle: Rectangle, colour: Colour, lineWidth: number): void;
        drawBorderedRectangle(rectangle: Rectangle, fillColour: Colour, borderColour: Colour): void;

        drawFillCircle(circle: Circle, colour: Colour): void;
        drawStrokeCircle(circle: Circle, colour: Colour, lineWidth: number): void;
        drawBorderedCircle(circle: Circle, fillColour: Colour, borderColour: Colour): void;

        drawImageRectangle(image: CanvasImageSource, rectangle: Rectangle): void;

        getCanvasSize(): Vector2;
    }

    interface HTMLCanvasElement {
        getContext2D(): Context2D;
    }
}

HTMLCanvasElement.prototype.getContext2D = function () {
    return this.getContext('2d') as Context2D;
}

CanvasRenderingContext2D.prototype.drawString = function (text: string, position: Vector2, size: number, font: Fonts, colour: Colour, align: Align) {
    this.fillStyle = colour.getHexString();

    this.setFont(font, size);

    this.setAlign(align);

    this.fillText(text, position.x, position.y);
}

CanvasRenderingContext2D.prototype.measureString = function (text: string, size: number, font: string, align: Align) {
    this.setFont(font, size);

    this.setAlign(align);

    return this.measureText(text);
}

CanvasRenderingContext2D.prototype.drawFillRectangle = function (rectangle: Rectangle, colour: Colour) {
    this.fillStyle = colour.getHexString();
    this.fillRect(rectangle.position.x, rectangle.position.y, rectangle.size.x, rectangle.size.y);
}

CanvasRenderingContext2D.prototype.drawStrokeRectangle = function (rectangle: Rectangle, colour: Colour, lineWidth: number = 2) {
    this.strokeStyle = colour.getHexString();
    this.lineWidth = lineWidth;
    this.strokeRect(rectangle.position.x, rectangle.position.y, rectangle.size.x, rectangle.size.y);
}

CanvasRenderingContext2D.prototype.drawBorderedRectangle = function (rectangle: Rectangle, fillColour: Colour, borderColour: Colour, lineWidth: number = 2) {
    this.drawFillRectangle(rectangle, fillColour);
    this.drawStrokeRectangle(rectangle, borderColour, lineWidth);
}

CanvasRenderingContext2D.prototype.drawFillCircle = function (circle: Circle, colour: Colour) {
    this.fillStyle = colour.getHexString();
    this.beginPath();
    this.ellipse(circle.position.x, circle.position.y, circle.radius, circle.radius, 0, 0, 2 * Math.PI);
    this.fill();
}

CanvasRenderingContext2D.prototype.drawStrokeCircle = function (circle: Circle, colour: Colour, lineWidth: number) {
    this.strokeStyle = colour.getHexString();
    this.lineWidth = lineWidth;
    this.beginPath();
    this.ellipse(circle.position.x, circle.position.y, circle.radius, circle.radius, 0, 0, 2 * Math.PI);
    this.stroke();
}

CanvasRenderingContext2D.prototype.drawBorderedCircle = function (circle: Circle, fillColour: Colour, borderColour: Colour, lineWidth: number = 2) {
    this.drawFillCircle(circle.position, circle.radius, fillColour);
    this.drawStrokeCircle(circle.position, circle.radius, borderColour, lineWidth);
}

CanvasRenderingContext2D.prototype.setAlign = function (align: Align) {
    if (align === Align.Bottom
        || align === Align.BottomLeft
        || align === Align.BottomRight)
        this.textBaseline = "bottom";
    else if (align === Align.Top
        || align === Align.TopLeft
        || align === Align.TopRight)
        this.textBaseline = "top";
    else
        this.textBaseline = "middle";

    if (align === Align.Left
        || align === Align.TopLeft
        || align === Align.BottomLeft)
        this.textAlign = "left"
    else if (align === Align.Right
        || align === Align.TopRight
        || align === Align.BottomRight)
        this.textAlign = "right"
    else
        this.textAlign = "center";
}

CanvasRenderingContext2D.prototype.setFont = function (font: Fonts, size: number) {
    this.font = `${size}px ${font}`;
}

CanvasRenderingContext2D.prototype.drawImageRectangle = function (image: CanvasImageSource, rectangle: Rectangle) {
    this.drawImage(image, rectangle.position.x, rectangle.position.y, rectangle.size.x, rectangle.size.y);
}

CanvasRenderingContext2D.prototype.getCanvasSize = function () {
    return new Vector2(this.canvas.width, this.canvas.height);
}
