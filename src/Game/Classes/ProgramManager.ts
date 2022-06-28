import { Context2D } from "../../Boilerplate/Classes/Context2D";
import { Images } from "../../Boilerplate/Classes/Images";
import { Input } from "../../Boilerplate/Classes/Input";
import { Programs } from "../Enums/Programs";
import { CryptCoinMinerPanel } from "./CryptCoinMinerPanel";
import { HackinatorPanel } from "./HackinatorPanel";
import { Panel } from "./Panel";
import { ProgramShopPanel } from "./ProgramShopPanel";
import { Resources } from "./Resources";
import { WalletPanel } from "./WalletPanel";

export class ProgramManager {
    private panels: Panel[] = [];
    private panelCreators: Map<Programs, () => Panel> = new Map<Programs, () => Panel>();

    initialize(images: Images, resources: Resources, input: Input) {
        this.panelCreators.set(Programs.Wallet, () => new WalletPanel(images, resources));
        this.panelCreators.set(Programs.ProgramShop, () => new ProgramShopPanel(images, resources, input));
        this.panelCreators.set(Programs.CryptCoinMiner, () => new CryptCoinMinerPanel(images, resources, input));
        this.panelCreators.set(Programs.Hackinator, () => new HackinatorPanel(images, resources, input));
    }

    runProgram(program: Programs) {
        if (this.panels.every(x => x.program !== program)) {
            this.panels.push(this.panelCreators.get(program)());
        }
    }

    update(input: Input) {
        this.panels.forEach(panel => {
            panel.update(input);
        });

        const toClose = this.panels.filter(x => x.getToClose());
        this.panels = this.panels.filter(x => toClose.every(y => y !== x));
    }

    draw(context: Context2D) {
        this.panels.forEach(panel => {
            panel.draw(context);
        });
    }
}
