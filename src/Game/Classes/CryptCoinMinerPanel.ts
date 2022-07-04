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
import { MathHelper } from "../../Boilerplate/Modules/MathHelper";
import { GameBase } from "../../Boilerplate/Classes/GameBase";
import { numberWithPostfix } from "../Functions";

export class CryptCoinMinerPanel extends Panel {
    buttons: TextButton[];
    isMining = false;

    miningButton: TextButton;
    algorithmButton: TextButton;
    hashButton: TextButton;
    cpuButton: TextButton;
    parallelButton: TextButton;
    seedButton: TextButton;

    miningStringStart = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
    miningStringEnd = "00000000000000000000000000000000";
    miningString = "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";
    miningStringLength = 32;
    miningStringChars = "0123456789ABCDEF";
    miningTicks = 50;
    currentMiningTicks = 0;

    constructor(
        images: Images,
        public resources: Resources,
        public input: Input,
    ) {
        super(Programs.CryptCoinMiner, "CryptCoin Miner", images.getImage(ImageNames.CryptCoinMiner), new Vector2(400, 0), new Vector2(480, 400), images);

        this.miningButton = new TextButton("Start mining", new Rectangle(new Vector2(16, 16), new Vector2(192, 40)), () => {
            this.isMining = !this.isMining;
            this.miningButton.text = this.isMining ? "Stop mining" : "Start mining";
        });

        this.algorithmButton = new TextButton("Improve algorithm", new Rectangle(new Vector2(16, 128), new Vector2(240, 40)), () => {
            this.resources.money -= this.algorithmCost();
            this.resources.cryptCoinMinerAlgorithmLevel++;
        }, () => this.resources.money >= this.algorithmCost());

        this.hashButton = new TextButton("Hash storage", new Rectangle(new Vector2(16, 180), new Vector2(240, 40)), () => {
            this.resources.money -= this.hashCost();
            this.resources.cryptCoinMinerHashLevel++;
        }, () => this.resources.money >= this.hashCost());

        this.cpuButton = new TextButton("More CPU cores", new Rectangle(new Vector2(16, 232), new Vector2(240, 40)), () => {
            this.resources.money -= this.cpuCost();
            this.resources.cryptCoinMinerCpuLevel++;
        }, () => this.resources.money >= this.cpuCost());

        this.parallelButton = new TextButton("Parallelization", new Rectangle(new Vector2(16, 284), new Vector2(240, 40)), () => {
            this.resources.money -= this.parallelCost();
            this.resources.cryptCoinMinerParallelLevel++;
        }, () => this.resources.money >= this.parallelCost());

        this.seedButton = new TextButton("Seed prediction", new Rectangle(new Vector2(16, 336), new Vector2(240, 40)), () => {
            this.resources.money -= this.seedCost();
            this.resources.cryptCoinMinerSeedLevel++;
        }, () => this.resources.money >= this.seedCost());

        this.buttons = [
            this.miningButton,
            this.algorithmButton,
            this.hashButton,
            this.cpuButton,
            this.parallelButton,
            this.seedButton,
        ];
    }

    updatePanel(panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.update(this.input, panelRectangle.topLeft()));

        if (this.isMining) {
            this.resources.money += this.moneyPerTick();

            if (this.currentMiningTicks >= this.miningTicks) {
                this.currentMiningTicks -= this.miningTicks;

                if (this.miningString == this.miningStringEnd) {
                    this.miningString = this.miningStringStart;
                }
                else {
                    for (let i = 0; i < this.miningStringLength; i++) {
                        if (this.miningString[i] !== "0") {
                            this.miningString = this.miningString.substring(0, i);
                            for (; i < this.miningStringLength; i++) {
                                this.miningString = this.miningString.concat(this.miningStringChars[MathHelper.randomInt(0, this.miningStringChars.length - 1)]);
                            }
                            break;
                        }
                    }
                }
            }
            else {
                this.currentMiningTicks +=
                    this.resources.cryptCoinMinerAlgorithmLevel +
                    this.resources.cryptCoinMinerHashLevel +
                    this.resources.cryptCoinMinerCpuLevel +
                    this.resources.cryptCoinMinerParallelLevel +
                    this.resources.cryptCoinMinerSeedLevel;
            }
        }
    }

    drawPanel(context: Context2D, panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.draw(context, panelRectangle.topLeft()));

        context.drawString(this.miningString, panelRectangle.topLeft().add(new Vector2(16, 78)), 32,
            Fonts.PixelOperator, this.isMining ? GameColour.text : GameColour.textDisabled, Align.TopLeft);
        context.drawString("$" + numberWithPostfix(this.moneyPerTick() * GameBase.updatesPerSecond) + "/s", panelRectangle.topLeft().add(new Vector2(224, 24)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);

        context.drawString("Cost: $" + numberWithPostfix(this.algorithmCost()), panelRectangle.topLeft().add(new Vector2(272, 136)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.hashCost()), panelRectangle.topLeft().add(new Vector2(272, 188)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.cpuCost()), panelRectangle.topLeft().add(new Vector2(272, 240)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.parallelCost()), panelRectangle.topLeft().add(new Vector2(272, 292)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.seedCost()), panelRectangle.topLeft().add(new Vector2(272, 344)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
    }

    algorithmCost() {
        return Math.pow(2, this.resources.cryptCoinMinerAlgorithmLevel - 1);
    }

    hashCost() {
        return Math.pow(2.4, this.resources.cryptCoinMinerHashLevel);
    }

    cpuCost() {
        return Math.pow(2.8, this.resources.cryptCoinMinerCpuLevel + 1);
    }

    parallelCost() {
        return Math.pow(3.2, this.resources.cryptCoinMinerParallelLevel + 2);
    }

    seedCost() {
        return Math.pow(3.6, this.resources.cryptCoinMinerSeedLevel + 3);
    }

    moneyPerTick() {
        return 0.1 * GameBase.updateTime *
            this.resources.cryptCoinMinerAlgorithmLevel *
            this.resources.cryptCoinMinerHashLevel *
            this.resources.cryptCoinMinerCpuLevel *
            this.resources.cryptCoinMinerParallelLevel *
            this.resources.cryptCoinMinerSeedLevel;
    }
}
