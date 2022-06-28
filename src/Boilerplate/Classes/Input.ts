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

    private leftUsed = false;
    private rightUsed = false;

    private previousKeyboardState: KeyboardState;
    private currentKeyboardState: KeyboardState;
    private runningKeyboardState: KeyboardState;

    constructor(canvas: HTMLCanvasElement) {
        this.previousMouseState = new MouseState(Vector2.zero(), false, false, Scroll.None);
        this.currentMouseState = new MouseState(Vector2.zero(), false, false, Scroll.None);
        this.runningMouseState = new MouseState(Vector2.zero(), false, false, Scroll.None);

        this.previousKeyboardState = new KeyboardState({});
        this.currentKeyboardState = new KeyboardState({});
        this.runningKeyboardState = new KeyboardState({});

        canvas.addEventListener('mousedown', event => {
            if (event.button === MouseButton.Left) {
                this.runningMouseState.left = true;
            }
            else if (event.button === MouseButton.Right) {
                this.runningMouseState.right = true;
            }
        });

        canvas.addEventListener('mouseup', event => {
            if (event.button === MouseButton.Left) {
                this.runningMouseState.left = false;
                this.leftUsed = false;
            }
            else if (event.button === MouseButton.Right) {
                this.runningMouseState.right = false;
                this.rightUsed = false;
            }
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
        this.previousMouseState = this.currentMouseState;
        this.currentMouseState = new MouseState(
            this.runningMouseState.position.clone(),
            this.runningMouseState.left,
            this.runningMouseState.right,
            this.runningMouseState.scroll);

        this.runningMouseState.scroll = Scroll.None;

        this.previousKeyboardState = this.currentKeyboardState;
        this.currentKeyboardState = this.runningKeyboardState;
        this.runningKeyboardState = new KeyboardState({});
    }

    getMousePosition() {
        return this.currentMouseState.position;
    }

    getLeftUsed() {
        return this.leftUsed;
    }

    getRightUsed() {
        return this.rightUsed;
    }

    setLeftUsed() {
        this.leftUsed = true;
    }

    setRightUsed() {
        this.rightUsed = true;
    }

    isUp(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return !this.currentMouseState.left;
        if (mouseButton === MouseButton.Right)
            return !this.currentMouseState.right;
        return false;
    }

    isDown(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return this.currentMouseState.left;
        if (mouseButton === MouseButton.Right)
            return this.currentMouseState.right;
        return false;
    }

    isClicked(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return this.currentMouseState.left && !this.previousMouseState.left
        if (mouseButton === MouseButton.Right)
            return this.currentMouseState.right && !this.previousMouseState.right;
        return false;
    }

    isReleased(mouseButton: MouseButton) {
        if (mouseButton === MouseButton.Left)
            return !this.currentMouseState.left && this.previousMouseState.left
        if (mouseButton === MouseButton.Right)
            return !this.currentMouseState.right && this.previousMouseState.right;
        return false;
    }

    getScroll() {
        return this.currentMouseState.scroll;
    }

    isKeyDown(key: Keys) {
        return this.currentKeyboardState.isKeyDown(key);
    }
}
