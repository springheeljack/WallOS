import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Images } from "../../Boilerplate/Classes/Images";
import { Input } from "../../Boilerplate/Classes/Input";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { ImageNames } from "../Enums/ImageNames";
import { Programs } from "../Enums/Programs";
import { numberWithPostfix } from "../Functions";
import { Panel } from "./Panel";
import { Picture } from "./Picture";
import { Resources } from "./Resources";
import { Text } from "./Text";
import { TextButton } from "./TextButton";

export class ProgramShopPanel extends Panel {
    buttons: TextButton[];
    pictures: Picture[];
    text: Text[];

    cryptCoinMinerCost = 1;
    purchaseCryptCoinMinerButton: TextButton;
    hackinatorCost = 100_000;
    purchaseHackinatorButton: TextButton;
    autoStonksCost = 10_000_000_000;
    purchaseAutoStonksButton: TextButton;

    constructor(
        images: Images,
        public resources: Resources,
        public input: Input,
    ) {
        super(Programs.ProgramShop, "Program Shop", images.getImage(ImageNames.ProgramShop), new Vector2(900, 0), new Vector2(664, 400), images);

        this.purchaseCryptCoinMinerButton = new TextButton("Purchase", new Rectangle(new Vector2(480, 16), new Vector2(160, 40)),
            () => {
                this.resources.money -= this.cryptCoinMinerCost;
                this.resources.programCryptCoinMinerUnlocked = true;
            },
            () => !this.resources.programCryptCoinMinerUnlocked && this.resources.money >= this.cryptCoinMinerCost,
            () => this.purchaseCryptCoinMinerButton.text = this.resources.programCryptCoinMinerUnlocked ? "Purchased" : "Purchase",
            () => this.purchaseCryptCoinMinerButton.text = this.resources.programCryptCoinMinerUnlocked ? "Purchased" : "Purchase");

        this.purchaseHackinatorButton = new TextButton("Purchase", new Rectangle(new Vector2(480, 68), new Vector2(160, 40)),
            () => {
                this.resources.money -= this.hackinatorCost;
                this.resources.programHackinatorUnlocked = true;
            },
            () => !this.resources.programHackinatorUnlocked && this.resources.money >= this.hackinatorCost,
            () => this.purchaseHackinatorButton.text = this.resources.programHackinatorUnlocked ? "Purchased" : "Purchase",
            () => this.purchaseHackinatorButton.text = this.resources.programHackinatorUnlocked ? "Purchased" : "Purchase");

        this.purchaseAutoStonksButton = new TextButton("Purchase", new Rectangle(new Vector2(480, 120), new Vector2(160, 40)),
            () => {
                this.resources.money -= this.autoStonksCost;
                this.resources.programAutoStonksUnlocked = true;
            },
            () => !this.resources.programAutoStonksUnlocked && this.resources.money >= this.autoStonksCost,
            () => this.purchaseAutoStonksButton.text = this.resources.programAutoStonksUnlocked ? "Purchased" : "Purchase",
            () => this.purchaseAutoStonksButton.text = this.resources.programAutoStonksUnlocked ? "Purchased" : "Purchase");

        this.buttons = [
            this.purchaseCryptCoinMinerButton,
            this.purchaseHackinatorButton,
            this.purchaseAutoStonksButton,
        ];

        this.pictures = [
            new Picture(images.getImage(ImageNames.CryptCoinMiner), new Rectangle(new Vector2(16, 24), new Vector2(32, 32))),
            new Picture(images.getImage(ImageNames.Hackinator), new Rectangle(new Vector2(16, 76), new Vector2(32, 32))),
            new Picture(images.getImage(ImageNames.AutoStonks), new Rectangle(new Vector2(16, 128), new Vector2(32, 32))),
        ];

        this.text = [
            new Text("CryptCoin Miner", new Vector2(56, 24), Align.TopLeft),
            new Text("Cost: $" + numberWithPostfix(this.cryptCoinMinerCost), new Vector2(280, 24), Align.TopLeft),
            new Text("Hackinator", new Vector2(56, 76), Align.TopLeft),
            new Text("Cost: $" + numberWithPostfix(this.hackinatorCost), new Vector2(280, 76), Align.TopLeft),
            new Text("AutoStonks", new Vector2(56, 128), Align.TopLeft),
            new Text("Cost: $" + numberWithPostfix(this.autoStonksCost), new Vector2(280, 128), Align.TopLeft),
        ];
    }

    updatePanel(panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.update(this.input, panelRectangle.topLeft()));
    }

    drawPanel(context: Context2D, panelRectangle: Rectangle) {
        this.buttons.forEach(x => x.draw(context, panelRectangle.topLeft()));
        this.pictures.forEach(x => x.draw(context, panelRectangle.topLeft()));
        this.text.forEach(x => x.draw(context, panelRectangle.topLeft()));
    }
}
