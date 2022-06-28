import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Images } from "../../Boilerplate/Classes/Images";
import { Input } from "../../Boilerplate/Classes/Input";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { ImageNames } from "../Enums/ImageNames";
import { Programs } from "../Enums/Programs";
import { GameColour } from "../Modules/GameColour";
import { Panel } from "./Panel";
import { Resources } from "./Resources";
import { TextButton } from "./TextButton";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { numberWithPostfix } from "../Functions";
import { Colour } from "../../Boilerplate/Classes/Colour";

export class HackinatorPanel extends Panel {
    rectangles: { rectangle: Rectangle, colour: Colour }[];

    buttons: TextButton[];
    isHacking = false;

    hackingButton: TextButton;
    passwordCrackerButton: TextButton;
    sqlInjectionButton: TextButton;
    keyDecryptorButton: TextButton;
    botnetButton: TextButton;
    ransomwareButton: TextButton;

    codeStrings: string[] = [">_", "", "", "", ""];
    hackingTicks = 50;
    currentHackingTicks = 0;
    currentCodeStringPosition = -1;
    displayLength = 30;
    displayHeight = 5;

    fullCodeString: string = null;

    constructor(
        images: Images,
        public resources: Resources,
        public input: Input,
    ) {
        super(Programs.Hackinator, "Hackinator", images.getImage(ImageNames.Hackinator), new Vector2(400, 200), new Vector2(480, 526), images);

        this.rectangles = [
            { rectangle: new Rectangle(new Vector2(16, 78), new Vector2(448, 160)), colour: GameColour.greyscale100 },
            { rectangle: new Rectangle(new Vector2(16, 78), new Vector2(446, 158)), colour: GameColour.greyscale50 },
            { rectangle: new Rectangle(new Vector2(18, 80), new Vector2(444, 156)), colour: GameColour.greyscale100 },
            { rectangle: new Rectangle(new Vector2(18, 80), new Vector2(442, 154)), colour: GameColour.greyscale0 }
        ];

        fetch("scripts/Main.js")
            .then(x => x.text())
            .then(x => this.fullCodeString = this.formatCodeString(x));

        this.hackingButton = new TextButton("Start hacking", new Rectangle(new Vector2(16, 16), new Vector2(192, 40)), () => {
            this.isHacking = !this.isHacking;
            this.hackingButton.text = this.isHacking ? "Stop hacking" : "Start hacking";
        });

        this.passwordCrackerButton = new TextButton("Password cracker", new Rectangle(new Vector2(16, 254), new Vector2(240, 40)), () => {
            this.resources.money -= this.passwordCrackerCost();
            this.resources.hackinatorPasswordCrackerLevel++;
        }, () => this.resources.money >= this.passwordCrackerCost());

        this.sqlInjectionButton = new TextButton("SQL Injection", new Rectangle(new Vector2(16, 306), new Vector2(240, 40)), () => {
            this.resources.money -= this.sqlInjectionCost();
            this.resources.hackinatorSqlInjectionLevel++;
        }, () => this.resources.money >= this.sqlInjectionCost());

        this.keyDecryptorButton = new TextButton("Key Decryptor", new Rectangle(new Vector2(16, 358), new Vector2(240, 40)), () => {
            this.resources.money -= this.keyDecryptorCost();
            this.resources.hackinatorKeyDecryptor++;
        }, () => this.resources.money >= this.keyDecryptorCost());

        this.botnetButton = new TextButton("Botnet", new Rectangle(new Vector2(16, 410), new Vector2(240, 40)), () => {
            this.resources.money -= this.botnetCost();
            this.resources.hackinatorBotnetLevel++;
        }, () => this.resources.money >= this.botnetCost());

        this.ransomwareButton = new TextButton("Ransomware", new Rectangle(new Vector2(16, 462), new Vector2(240, 40)), () => {
            this.resources.money -= this.ransomwareCost();
            this.resources.hackinatorRansomwareLevel++;
        }, () => this.resources.money >= this.ransomwareCost());

        this.buttons = [
            this.hackingButton,
            this.passwordCrackerButton,
            this.sqlInjectionButton,
            this.keyDecryptorButton,
            this.botnetButton,
            this.ransomwareButton,
        ];
    }

    updatePanel(panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.update(this.input, panelRectangle.topLeft()));

        if (this.isHacking) {
            this.resources.money += this.moneyPerTick();

            while (this.currentHackingTicks >= this.hackingTicks) {
                this.currentHackingTicks -= this.hackingTicks;
                this.currentCodeStringPosition++;
                this.setCodeStringDisplay();
            }

            this.currentHackingTicks +=
                this.resources.hackinatorPasswordCrackerLevel +
                this.resources.hackinatorSqlInjectionLevel +
                this.resources.hackinatorKeyDecryptor +
                this.resources.hackinatorBotnetLevel +
                this.resources.hackinatorRansomwareLevel;
        }
    }

    drawPanel(context: Context2D, panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.draw(context, panelRectangle.topLeft()));

        context.drawString("$" + numberWithPostfix(this.moneyPerTick() * GameBase.updatesPerSecond) + "/s", panelRectangle.topLeft().add(new Vector2(224, 24)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);

        context.drawString("Cost: $" + numberWithPostfix(this.passwordCrackerCost()), panelRectangle.topLeft().add(new Vector2(272, 262)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.sqlInjectionCost()), panelRectangle.topLeft().add(new Vector2(272, 314)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.keyDecryptorCost()), panelRectangle.topLeft().add(new Vector2(272, 366)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.botnetCost()), panelRectangle.topLeft().add(new Vector2(272, 418)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.ransomwareCost()), panelRectangle.topLeft().add(new Vector2(272, 470)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);

        this.rectangles.forEach(x => context.drawFillRectangle(new Rectangle(x.rectangle.position.add(panelRectangle.topLeft()), x.rectangle.size), x.colour));

        this.drawCodeStringDisplay(context, panelRectangle.topLeft());
    }

    passwordCrackerCost() {
        return Math.pow(2.2, this.resources.hackinatorPasswordCrackerLevel - 1) * 100_000;
    }

    sqlInjectionCost() {
        return Math.pow(3.3, this.resources.hackinatorSqlInjectionLevel) * 100_000;
    }

    keyDecryptorCost() {
        return Math.pow(4.4, this.resources.hackinatorKeyDecryptor + 1) * 100_000;
    }

    botnetCost() {
        return Math.pow(5.5, this.resources.hackinatorBotnetLevel + 2) * 100_000;
    }

    ransomwareCost() {
        return Math.pow(6.6, this.resources.hackinatorRansomwareLevel + 3) * 100_000;
    }

    moneyPerTick() {
        return 100 *
            this.resources.hackinatorPasswordCrackerLevel *
            this.resources.hackinatorSqlInjectionLevel *
            this.resources.hackinatorKeyDecryptor *
            this.resources.hackinatorBotnetLevel *
            this.resources.hackinatorRansomwareLevel;
    }

    formatCodeString(codeString: string): string {
        let formattedCodeString = codeString.replaceAll("\n", " ").replaceAll("\r", " ");

        let preReplaceLength: number;
        do {
            preReplaceLength = formattedCodeString.length;
            formattedCodeString = formattedCodeString.replaceAll("  ", " ");
        }
        while (preReplaceLength > formattedCodeString.length)

        return formattedCodeString;
    }

    setCodeStringDisplay() {
        let currentLine = 0;

        for (let i = 0; i < this.displayHeight; i++) {
            if (this.codeStrings[i] != "")
                currentLine = i;
        }

        this.codeStrings[currentLine] = ">" + this.fullCodeString.substring(
            (this.currentCodeStringPosition - (this.currentCodeStringPosition % this.displayLength)) % this.fullCodeString.length,
            (this.currentCodeStringPosition + 1) % this.fullCodeString.length);

        if (this.codeStrings[currentLine].length === this.displayLength + 1) {
            if (currentLine === 4) {
                for (let i = 0; i < this.displayHeight - 1; i++) {
                    this.codeStrings[i] = this.codeStrings[i + 1];
                }

                this.codeStrings[4] = ">_";
            }
            else {
                this.codeStrings[currentLine + 1] = ">_";
            }
        }
        else {
            this.codeStrings[currentLine] += "_";
        }
    }

    drawCodeStringDisplay(context: Context2D, offset: Vector2) {
        for (let i = 0; i < this.displayHeight; i++)
            for (let j = 0; j < this.codeStrings[i].length; j++)
                context.drawString(this.codeStrings[i][j], offset.add(new Vector2(27 + (j * 14), 90 + (i * 32))), 32,
                    Fonts.PixelOperator, GameColour.textConsole, Align.Center);
    }
}
