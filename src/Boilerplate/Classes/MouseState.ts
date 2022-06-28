import { Scroll } from "../Enums/Scroll";
import { Vector2 } from "./Vector2";

export class MouseState {
    constructor(
        public position: Vector2,
        public left: boolean,
        public right: boolean,
        public scroll: Scroll
    ) { }
}
