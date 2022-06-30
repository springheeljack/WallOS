import { MouseState } from "./MouseState";
import { MouseButton } from "../Enums/MouseButton";
import { Vector2 } from "./Vector2";
import { Scroll } from "../Enums/Scroll";
import { KeyboardState } from "./KeyboardState";
import { Keys } from "../Enums/Keys";

export class Input {
    private previousMouseState: MouseState;
    private currentMouseState: MouseState;
    private runningMouseState: MouseState;

    private previousKeyboardState: KeyboardState;
    private currentKeyboardState: KeyboardState;
    private runningKeyboardState: KeyboardState;

    constructor(canvas: HTMLCanvasElement) {
        this.previousMouseState = new MouseState();
        this.currentMouseState = new MouseState();
        this.runningMouseState = new MouseState();

        this.previousKeyboardState = new KeyboardState();
        this.currentKeyboardState = new KeyboardState();
        this.runningKeyboardState = new KeyboardState();

        canvas.addEventListener('mousedown', event => {
            this.runningMouseState.buttonDown[event.button] = true;
            this.runningMouseState.unusedDown[event.button] = true;
        });

        canvas.addEventListener('mouseup', event => {
            this.runningMouseState.buttonDown[event.button] = false;
            this.runningMouseState.unusedClick[event.button] = true;
        });

        canvas.addEventListener('mousemove', event => {
            const target = event.currentTarget as Element;
            const rect = target.getBoundingClientRect();
            this.runningMouseState.position.x = event.clientX - rect.left;
            this.runningMouseState.position.y = event.clientY - rect.top;
        });

        canvas.addEventListener('contextmenu', event => event.preventDefault());

        canvas.addEventListener('wheel', event => {
            if (event.deltaY < 0)
                this.runningMouseState.scroll = Scroll.Up;
            else if (event.deltaY > 0)
                this.runningMouseState.scroll = Scroll.Down;
        });

        window.addEventListener('keydown', event => {
            this.runningKeyboardState.setKeyDown(event.code)
        });

        window.addEventListener('keyup', event => {
            this.runningKeyboardState.setKeyUp(event.code)
        });
    }

    update() {
        //Update mouse states
        this.previousMouseState = this.currentMouseState;
        this.currentMouseState = this.runningMouseState.clone();
        this.runningMouseState.scroll = Scroll.None;
        this.runningMouseState.unusedClick = {} as Record<MouseButton, boolean>;
        this.runningMouseState.unusedDown = {} as Record<MouseButton, boolean>;

        //Update keyboard states
        this.previousKeyboardState = this.currentKeyboardState;
        this.currentKeyboardState = this.runningKeyboardState;
        this.runningKeyboardState = new KeyboardState();
    }

    getMousePosition() {
        return this.currentMouseState.position;
    }

    getMouseScroll() {
        return this.currentMouseState.scroll;
    }

    isButtonUp(mouseButton: MouseButton) {
        return this.currentMouseState.isButtonUp(mouseButton);
    }

    isButtonDown(mouseButton: MouseButton) {
        return this.currentMouseState.isButtonDown(mouseButton);
    }

    isButtonStartOfClick(mouseButton: MouseButton) {
        return this.currentMouseState.isButtonDown(mouseButton) && this.previousMouseState.isButtonUp(mouseButton);
    }

    isButtonEndOfClick(mouseButton: MouseButton) {
        return this.currentMouseState.isButtonUp(mouseButton) && this.previousMouseState.isButtonDown(mouseButton);
    }

    hasUnusedClick(mouseButton: MouseButton) {
        return this.currentMouseState.hasUnusedClick(mouseButton);
    }

    setClickUsed(mouseButton: MouseButton) {
        this.currentMouseState.setClickUsed(mouseButton);
    }

    hasUnusedDown(mouseButton: MouseButton) {
        return this.currentMouseState.hasUnusedDown(mouseButton);
    }

    setDownUsed(mouseButton: MouseButton) {
        this.currentMouseState.setDownUsed(mouseButton);
    }

    isKeyDown(key: Keys) {
        return this.currentKeyboardState.isKeyDown(key);
    }
}
