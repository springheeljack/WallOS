import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { ImageNames } from "../Enums/ImageNames";
import { ProgramManager } from "./ProgramManager";
import { Resources } from "./Resources";
import { StartMenu } from "./StartMenu";
import { Taskbar } from "./Taskbar";

export class Game extends GameBase {
    constructor() {
        super(ImageNames);
    }

    taskbar: Taskbar;
    startMenu: StartMenu;
    programManager: ProgramManager;
    resources: Resources;

    initialize() {
        this.resources = new Resources();
        this.taskbar = new Taskbar();

        this.startMenu = new StartMenu();
        this.startMenu.initialize(this.images, this.resources);

        this.programManager = new ProgramManager();
        this.programManager.initialize(this.images, this.resources, this.input);
    }

    update() {
        this.programManager.update(this.input);
        this.taskbar.update(this.context);
        this.startMenu.update(this.context, this.input, this.programManager);
    }

    draw() {
        this.programManager.draw(this.context);
        this.taskbar.draw(this.context);
        this.startMenu.draw(this.context);
    }
}
