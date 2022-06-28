import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Images } from "../../Boilerplate/Classes/Images";
import { Rectangle } from "../../Boilerplate/Classes/Rectangle";
import { Vector2 } from "../../Boilerplate/Classes/Vector2";
import { Align } from "../../Boilerplate/Enums/Align";
import { Fonts } from "../../Boilerplate/Enums/Fonts";
import { ImageNames } from "../Enums/ImageNames";
import { Programs } from "../Enums/Programs";
import { numberWithPostfix } from "../Functions";
import { GameColour } from "../Modules/GameColour";
import { Panel } from "./Panel";
import { Resources } from "./Resources";

export class WalletPanel extends Panel {
    constructor(images: Images, public resources: Resources) {
        super(Programs.Wallet, "Wallet", images.getImage(ImageNames.Wallet), Vector2.zero(), new Vector2(200, 34), images);
    }

    updatePanel() { }

    drawPanel(context: Context2D, panelRectangle: Rectangle) {
        context.drawString("$" + numberWithPostfix(this.resources.money), panelRectangle.topLeft(), 32, Fonts.PixelOperator, GameColour.text, Align.TopLeft);
    }
}
