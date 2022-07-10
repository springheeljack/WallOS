import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { MathHelper } from "../../Boilerplate/Modules/MathHelper";
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

export class AutoStonksPanel extends Panel {
    rectangles: { rectangle: Rectangle, colour: Colour }[];

    buttons: TextButton[];
    isTrading = false;

    tradingButton: TextButton;
    economicsButton: TextButton;
    marketPredictionButton: TextButton;
    highFrequencyTradingButton: TextButton;
    insiderTradingButton: TextButton;
    pumpAndDumpButton: TextButton;

    tradingTicks = 300;
    currentTradingTicks = 0;

    dataPoints: number[] = [0];
    maxDataPoints = 20;
    displayWidth = 438;
    displayHeight = 144;
    dataPointDistance = Math.floor((this.displayWidth / this.maxDataPoints) / 2) * 2;
    dataPointSize = new Vector2(6, 6);
    dataPointColour = new Colour(0, 255, 255);
    dataLineDownColour = new Colour(255, 0, 0);
    dataLineUpColour = new Colour(0, 255, 0);
    dataLineFlatColour = new Colour(255, 127, 0);

    constructor(
        images: Images,
        public resources: Resources,
        public input: Input,
    ) {
        super(Programs.AutoStonks, "AutoStonks", images.getImage(ImageNames.AutoStonks), new Vector2(400, 200), new Vector2(480, 526), images);

        this.rectangles = [
            { rectangle: new Rectangle(new Vector2(16, 78), new Vector2(448, 160)), colour: GameColour.greyscale100 },
            { rectangle: new Rectangle(new Vector2(16, 78), new Vector2(446, 158)), colour: GameColour.greyscale50 },
            { rectangle: new Rectangle(new Vector2(18, 80), new Vector2(444, 156)), colour: GameColour.greyscale100 },
            { rectangle: new Rectangle(new Vector2(18, 80), new Vector2(442, 154)), colour: GameColour.greyscale0 }
        ];

        this.tradingButton = new TextButton("Start trading", new Rectangle(new Vector2(16, 16), new Vector2(192, 40)), () => {
            this.isTrading = !this.isTrading;
            this.tradingButton.text = this.isTrading ? "Stop trading" : "Start trading";
        });

        this.economicsButton = new TextButton("Economics 101", new Rectangle(new Vector2(16, 254), new Vector2(240, 40)), () => {
            this.resources.money -= this.economicsCost();
            this.resources.autoStonksEconomicsLevel++;
        }, () => this.resources.money >= this.economicsCost());

        this.marketPredictionButton = new TextButton("Market prediction", new Rectangle(new Vector2(16, 306), new Vector2(240, 40)), () => {
            this.resources.money -= this.marketPredictionCost();
            this.resources.autoStonksMarketPredictionLevel++;
        }, () => this.resources.money >= this.marketPredictionCost());

        this.highFrequencyTradingButton = new TextButton("HiFreq trading", new Rectangle(new Vector2(16, 358), new Vector2(240, 40)), () => {
            this.resources.money -= this.highFrequencyTradingCost();
            this.resources.autoStonksHighFrequencyTradingLevel++;
        }, () => this.resources.money >= this.highFrequencyTradingCost());

        this.insiderTradingButton = new TextButton("Insider trading", new Rectangle(new Vector2(16, 410), new Vector2(240, 40)), () => {
            this.resources.money -= this.insiderTradingCost();
            this.resources.autoStonksInsiderTradingLevel++;
        }, () => this.resources.money >= this.insiderTradingCost());

        this.pumpAndDumpButton = new TextButton("Pump and dump", new Rectangle(new Vector2(16, 462), new Vector2(240, 40)), () => {
            this.resources.money -= this.pumpAndDumpCost();
            this.resources.autoStonksPumpAndDumpLevel++;
        }, () => this.resources.money >= this.pumpAndDumpCost());

        this.buttons = [
            this.tradingButton,
            this.economicsButton,
            this.marketPredictionButton,
            this.highFrequencyTradingButton,
            this.insiderTradingButton,
            this.pumpAndDumpButton,
        ];
    }

    updatePanel(panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.update(this.input, panelRectangle.topLeft()));

        if (this.isTrading) {
            this.resources.money += this.moneyPerTick();

            while (this.currentTradingTicks >= this.tradingTicks) {
                this.currentTradingTicks -= this.tradingTicks;
                this.updateTradingDisplay();
            }

            this.currentTradingTicks +=
                this.resources.autoStonksEconomicsLevel +
                this.resources.autoStonksMarketPredictionLevel +
                this.resources.autoStonksHighFrequencyTradingLevel +
                this.resources.autoStonksInsiderTradingLevel +
                this.resources.autoStonksPumpAndDumpLevel;
        }
    }

    drawPanel(context: Context2D, panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.draw(context, panelRectangle.topLeft()));

        context.drawString("$" + numberWithPostfix(this.moneyPerTick() * GameBase.updatesPerSecond) + "/s", panelRectangle.topLeft().add(new Vector2(224, 24)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);

        context.drawString("Cost: $" + numberWithPostfix(this.economicsCost()), panelRectangle.topLeft().add(new Vector2(272, 262)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.marketPredictionCost()), panelRectangle.topLeft().add(new Vector2(272, 314)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.highFrequencyTradingCost()), panelRectangle.topLeft().add(new Vector2(272, 366)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.insiderTradingCost()), panelRectangle.topLeft().add(new Vector2(272, 418)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);
        context.drawString("Cost: $" + numberWithPostfix(this.pumpAndDumpCost()), panelRectangle.topLeft().add(new Vector2(272, 470)), 32,
            Fonts.PixelOperator, GameColour.text, Align.TopLeft);

        this.rectangles.forEach(x => context.drawFillRectangle(new Rectangle(x.rectangle.position.add(panelRectangle.topLeft()), x.rectangle.size), x.colour));

        this.drawTradingDisplay(context, this.rectangles[this.rectangles.length - 1].rectangle.position.add(panelRectangle.topLeft().addNumber(2)));
    }

    economicsCost() {
        return Math.pow(3.3, this.resources.autoStonksEconomicsLevel - 1) * 10_000_000_000;
    }

    marketPredictionCost() {
        return Math.pow(4.4, this.resources.autoStonksMarketPredictionLevel) * 10_000_000_000;
    }

    highFrequencyTradingCost() {
        return Math.pow(5.5, this.resources.autoStonksHighFrequencyTradingLevel + 1) * 10_000_000_000;
    }

    insiderTradingCost() {
        return Math.pow(6.6, this.resources.autoStonksInsiderTradingLevel + 2) * 10_000_000_000;
    }

    pumpAndDumpCost() {
        return Math.pow(7.7, this.resources.autoStonksPumpAndDumpLevel + 3) * 10_000_000_000;
    }

    moneyPerTick() {
        return 1_000_000_000 * GameBase.updateTime *
            this.resources.autoStonksEconomicsLevel *
            this.resources.autoStonksMarketPredictionLevel *
            this.resources.autoStonksHighFrequencyTradingLevel *
            this.resources.autoStonksInsiderTradingLevel *
            this.resources.autoStonksPumpAndDumpLevel;
    }

    updateTradingDisplay() {
        this.dataPoints.push(this.dataPoints[this.dataPoints.length - 1] + MathHelper.randomInt(-10, 10));

        if (this.dataPoints.length > this.maxDataPoints)
            this.dataPoints.shift();
    }

    //This all needs sorting as it can display rectangles between the 2x pixel limit
    drawTradingDisplay(context: Context2D, offset: Vector2) {
        let min = Math.min(...this.dataPoints);
        let max = Math.max(...this.dataPoints);

        if (min == max) {
            min -= 10;
            max += 10;
        }

        const difference = max - min;

        this.dataPoints.slice(0, this.dataPoints.length - 1).forEach((dataPoint, index) => {
            this.drawLine(index * this.dataPointDistance, (((dataPoint - max) * -1) / difference) * this.displayHeight,
                (index + 1) * this.dataPointDistance, (((this.dataPoints[index + 1] - max) * -1) / difference) * this.displayHeight,
                context, offset);
        });

        this.dataPoints.forEach((dataPoint, index) => {
            const y = (((dataPoint - max) * -1) / difference) * this.displayHeight;
            const x = index * this.dataPointDistance;

            context.drawFillRectangle(new Rectangle(new Vector2(x, y).add(offset), this.dataPointSize), this.dataPointColour);
        });
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, context: Context2D, offset: Vector2) {
        const xDiff = Math.ceil((x2 - x1) / 2);
        const yDiff = Math.ceil((y2 - y1) / 2);

        if (y1 < y2) {
            for (let i = 0; i < xDiff; i++) {
                const yStart = Math.floor((i / xDiff) * yDiff) * 2;
                const yEnd = Math.ceil(((i + 1) / xDiff) * yDiff) * 2;

                const rect = new Rectangle(
                    new Vector2(x1 + (i * 2), y1 + (yStart)).add(offset).addNumber(2),
                    new Vector2(2, Math.ceil(yEnd - yStart))
                );

                context.drawFillRectangle(rect, this.dataLineDownColour);
            }
        } else if (y1 > y2) {
            for (let i = 0; i < xDiff; i++) {
                const yStart = Math.ceil((i / xDiff) * yDiff) * 2;
                const yEnd = Math.floor(((i + 1) / xDiff) * yDiff) * 2;

                const rect = new Rectangle(
                    new Vector2(x1 + (i * 2), y1 + (yStart)).add(offset).addNumber(2),
                    new Vector2(2, Math.floor(yEnd - yStart))
                );

                context.drawFillRectangle(rect, this.dataLineUpColour);
            }
        } else {
            context.drawFillRectangle(new Rectangle(
                new Vector2(x1, y1).add(offset).addNumber(2),
                new Vector2(x2 - x1, 2)
            ), this.dataLineFlatColour);
        }
    }
}
