import { Programs } from "../Enums/Programs";

export class StartMenuEntry {
    constructor(
        public id: number,
        public name: string,
        public image: HTMLImageElement,
        public installed: () => boolean,
        public program?: Programs
    ) { }
}
