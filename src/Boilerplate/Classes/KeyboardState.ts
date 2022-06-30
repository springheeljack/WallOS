import { Keys } from "../Enums/Keys";

export class KeyboardState {
    public keyStates: Record<string, boolean> = {} as Record<string, boolean>;

    public isKeyDown(key: Keys): boolean {
        return this.keyStates[key] === true;
    }

    public isKeyUp(key: Keys): boolean {
        return !this.isKeyDown(key);
    }

    public setKeyDown(key: string) {
        this.keyStates[key] = true;
    }

    public setKeyUp(key: string) {
        this.keyStates[key] = false;
    }
}
