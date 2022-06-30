import { Colour } from "../../Boilerplate/Classes/Colour";
import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Images } from "../../Boilerplate/Classes/Images";
import { Input } from "../../Boilerplate/Classes/Input";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { MouseButton } from "../../Boilerplate/Enums/MouseButton";
import { ImageNames } from "../Enums/ImageNames";
import { Programs } from "../Enums/Programs";
import { GameColour } from "../Modules/GameColour";
import { ProgramManager } from "./ProgramManager";
import { Resources } from "./Resources";
import { StartMenuEntry } from "./StartMenuEntry";

export class StartMenu {
    private startMenuOpen = false;

    private startButtonRect1 = new Rectangle(new Vector2(4, 0), new Vector2(114, 44));
    private startButtonRect2 = new Rectangle(new Vector2(4, 0), new Vector2(112, 42));
    private startButtonRect3 = new Rectangle(new Vector2(6, 0), new Vector2(110, 40));
    private startButtonRect4 = new Rectangle(new Vector2(6, 0), new Vector2(108, 38));
    private startButtonRect5 = new Rectangle(new Vector2(8, 0), new Vector2(106, 36));
    private startButtonOffset1 = 48;
    private startButtonOffset2 = 48;
    private startButtonOffset3 = 46;
    private startButtonOffset4 = 46;
    private startButtonOffset5 = 44;

    private startTextOffset = new Vector2(4, 0);

    private startImage: HTMLImageElement;
    private startImageRect = new Rectangle(new Vector2(0, 0), new Vector2(32, 32));

    private startMenuRectangle1 = new Rectangle(new Vector2(4, 0), new Vector2(328, 480));
    private startMenuRectangle2 = new Rectangle(new Vector2(4, 0), new Vector2(326, 478));
    private startMenuRectangle3 = new Rectangle(new Vector2(6, 0), new Vector2(324, 476));
    private startMenuRectangle4 = new Rectangle(new Vector2(6, 0), new Vector2(322, 474));
    private startMenuRectangle5 = new Rectangle(new Vector2(8, 0), new Vector2(320, 472));
    private startMenuOffset1 = 528;
    private startMenuOffset2 = 528;
    private startMenuOffset3 = 526;
    private startMenuOffset4 = 526;
    private startMenuOffset5 = 524;

    private startMenuEntries: StartMenuEntry[] = [];
    private selectedEntries: number[] = [];

    initialize(images: Images, resources: Resources) {
        this.startImage = images.getImage(ImageNames.Start);

        this.setupStartMenu(images, resources);
    }

    update(context: Context2D, input: Input, runner: ProgramManager) {
        const canvasSize = context.getCanvasSize();

        this.startButtonRect1.position.y = canvasSize.y - this.startButtonOffset1;
        this.startButtonRect2.position.y = canvasSize.y - this.startButtonOffset2;
        this.startButtonRect3.position.y = canvasSize.y - this.startButtonOffset3;
        this.startButtonRect4.position.y = canvasSize.y - this.startButtonOffset4;
        this.startButtonRect5.position.y = canvasSize.y - this.startButtonOffset5;

        this.startMenuRectangle1.position.y = canvasSize.y - this.startMenuOffset1;
        this.startMenuRectangle2.position.y = canvasSize.y - this.startMenuOffset2;
        this.startMenuRectangle3.position.y = canvasSize.y - this.startMenuOffset3;
        this.startMenuRectangle4.position.y = canvasSize.y - this.startMenuOffset4;
        this.startMenuRectangle5.position.y = canvasSize.y - this.startMenuOffset5;

        this.startImageRect.position = this.startButtonRect5.position.addNumber(2);

        const newSelectedEntries: number[] = [];

        const installed = this.getInstalledPrograms();

        if (this.startMenuOpen) {
            for (let i = 0; i < installed.length; i++) {
                const entryRectangle = new Rectangle(new Vector2(this.startMenuRectangle5.position.x + 42, this.startMenuRectangle5.position.y + 64 * i), new Vector2(276, 64));
                if (entryRectangle.intersectsPoint(input.getMousePosition())) {
                    newSelectedEntries.push(installed[i].id);
                }
            }
        }

        this.selectedEntries = newSelectedEntries;

        if (input.hasUnusedClick(MouseButton.Left)) {
            if (this.startButtonRect1.intersectsPoint(input.getMousePosition())) {
                this.startMenuOpen = !this.startMenuOpen;
                input.setClickUsed(MouseButton.Left);
            }
            else {
                for (let i = 0; i < installed.length; i++) {
                    const entryRectangle = new Rectangle(new Vector2(this.startMenuRectangle5.position.x + 42, this.startMenuRectangle5.position.y + 64 * i), new Vector2(276, 64));
                    if (entryRectangle.intersectsPoint(input.getMousePosition())) {
                        const entry = installed[i];
                        if (entry.program != null) {
                            runner.runProgram(entry.program);
                            this.startMenuOpen = false;
                            input.setClickUsed(MouseButton.Left);
                        }
                    }
                }
            }

            if (this.startMenuRectangle1.intersectsPoint(input.getMousePosition()))
                input.setClickUsed(MouseButton.Left);
        }
    }

    draw(context: Context2D) {
        context.drawFillRectangle(this.startButtonRect1, GameColour.greyscale0);
        context.drawFillRectangle(this.startButtonRect2, GameColour.greyscale100);
        context.drawFillRectangle(this.startButtonRect3, GameColour.greyscale50);
        context.drawFillRectangle(this.startButtonRect4, GameColour.greyscale87);
        context.drawFillRectangle(this.startButtonRect5, GameColour.greyscale75);

        context.drawString("Start", this.startButtonRect5.rightCenter().subtract(this.startTextOffset), 32, Fonts.PixelOperator, GameColour.text, Align.Right);
        context.drawImageRectangle(this.startImage, this.startImageRect);

        if (this.startMenuOpen) {
            context.drawFillRectangle(this.startMenuRectangle1, GameColour.greyscale0);
            context.drawFillRectangle(this.startMenuRectangle2, GameColour.greyscale87);
            context.drawFillRectangle(this.startMenuRectangle3, GameColour.greyscale50);
            context.drawFillRectangle(this.startMenuRectangle4, GameColour.greyscale100);
            context.drawFillRectangle(this.startMenuRectangle5, GameColour.greyscale75);

            const installed = this.getInstalledPrograms();

            for (let i = 0; i < installed.length; i++) {
                let textColour = GameColour.text;
                if (this.selectedEntries.some(x => x === installed[i].id)) {
                    context.drawFillRectangle(new Rectangle(new Vector2(this.startMenuRectangle5.position.x + 42, this.startMenuRectangle5.position.y + 64 * i), new Vector2(276, 64)), GameColour.selected);
                    textColour = GameColour.selectedText;
                }
                context.drawImageRectangle(installed[i].image,
                    new Rectangle(new Vector2(this.startMenuRectangle5.position.x + 62, this.startMenuRectangle5.position.y + 8 + 64 * i), new Vector2(48, 48)));
                context.drawString(installed[i].name,
                    new Vector2(this.startMenuRectangle5.position.x + 130, this.startMenuRectangle5.position.y + 32 + 64 * i),
                    32, Fonts.PixelOperator, textColour, Align.Left);
            }
        }
    }

    setupStartMenu(images: Images, resources: Resources) {
        this.startMenuEntries = [];

        this.startMenuEntries.push(new StartMenuEntry(
            1, "Wallet", images.getImage(ImageNames.Wallet), () => true, Programs.Wallet
        ));
        this.startMenuEntries.push(new StartMenuEntry(
            2, "Program Shop", images.getImage(ImageNames.ProgramShop), () => true, Programs.ProgramShop
        ));
        this.startMenuEntries.push(new StartMenuEntry(
            3, "CryptCoin Miner", images.getImage(ImageNames.CryptCoinMiner), () => resources.programCryptCoinMinerUnlocked, Programs.CryptCoinMiner
        ));
        this.startMenuEntries.push(new StartMenuEntry(
            4, "Hackinator", images.getImage(ImageNames.Hackinator), () => resources.programHackinatorUnlocked, Programs.Hackinator
        ));
    }

    getInstalledPrograms() {
        return this.startMenuEntries.filter(x => x.installed());
    }
}
