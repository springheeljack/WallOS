import { MouseButton } from "../Enums/MouseButton";
import { Scroll } from "../Enums/Scroll";
import { Vector2 } from "./Vector2";

export class MouseState {
    public position: Vector2 = Vector2.zero();
    public scroll: Scroll = Scroll.None;
    public buttonDown: Record<MouseButton, boolean> = {} as Record<MouseButton, boolean>;
    public unusedClick: Record<MouseButton, boolean> = {} as Record<MouseButton, boolean>;

    public isButtonDown(mouseButton: MouseButton): boolean {
        return this.buttonDown[mouseButton] === true;
    }

    public isButtonUp(mouseButton: MouseButton): boolean {
        return !this.isButtonDown(mouseButton);
    }

    public hasUnusedClick(mouseButton: MouseButton): boolean {
        return this.unusedClick[mouseButton] === true;
    }

    public setClickUsed(mouseButton: MouseButton) {
        this.unusedClick[mouseButton] = false;
    }
}
