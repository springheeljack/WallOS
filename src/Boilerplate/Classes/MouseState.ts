import { MouseButton } from "../Enums/MouseButton";
import { Scroll } from "../Enums/Scroll";
import { Vector2 } from "./Vector2";

export class MouseState {
    public position: Vector2 = Vector2.zero();
    public scroll: Scroll = Scroll.None;
    public buttonDown: Record<MouseButton, boolean> = {} as Record<MouseButton, boolean>;
    public unusedClick: Record<MouseButton, boolean> = {} as Record<MouseButton, boolean>;
    public unusedDown: Record<MouseButton, boolean> = {} as Record<MouseButton, boolean>;

    public isButtonDown(mouseButton: MouseButton): boolean {
        return this.buttonDown[mouseButton] === true;
    }

    public isButtonUp(mouseButton: MouseButton): boolean {
        return !this.isButtonDown(mouseButton);
    }

    public hasUnusedClick(mouseButton: MouseButton): boolean {
        return this.unusedClick[mouseButton] === true;
    }

    public hasUnusedDown(mouseButton: MouseButton): boolean {
        return this.unusedDown[mouseButton] === true;
    }

    public setClickUsed(mouseButton: MouseButton) {
        this.unusedClick[mouseButton] = false;
    }

    public setDownUsed(mouseButton: MouseButton) {
        this.unusedDown[mouseButton] = false;
    }

    public clone(): MouseState {
        const clone = new MouseState();
        clone.position = this.position.clone();
        clone.scroll = this.scroll;
        clone.buttonDown = Object.assign({}, this.buttonDown);
        clone.unusedClick = Object.assign({}, this.unusedClick);
        clone.unusedDown = Object.assign({}, this.unusedDown);

        return clone;
    }
}
