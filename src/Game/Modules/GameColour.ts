import { Colour } from "../../Boilerplate/Classes/Colour";

export module GameColour {
    export const background = new Colour(0, 128, 128);

    export const greyscale0 = new Colour(0, 0, 0);
    export const greyscale50 = new Colour(128, 128, 128);
    export const greyscale75 = new Colour(192, 192, 192);
    export const greyscale87 = new Colour(224, 224, 224);
    export const greyscale100 = new Colour(255, 255, 255);

    export const selected = new Colour(0, 0, 128);
    export const selectedText = new Colour(255, 255, 255);

    export const focusedWindowTitleRectangle = new Colour(0, 0, 128);
    export const focusedWindowTitleText = new Colour(255, 255, 255);
    export const unfocusedWindowTitleRectangle = new Colour(128, 128, 128);
    export const unfocusedWindowTitleText = new Colour(192, 192, 192);

    export const text = new Colour(0, 0, 0);
    export const textDisabled = new Colour(128, 128, 128);
    export const textConsole = new Colour(0, 255, 0);
}
