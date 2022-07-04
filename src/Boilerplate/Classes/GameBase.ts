import { Context2D } from "./Context2D";
import { Images } from "./Images";
import { Input } from "./Input";

export abstract class GameBase {
    static updatesPerSecond = 60;
    static drawsPerSecond = 60;
    static updateInterval = 1000 / GameBase.updatesPerSecond;
    static drawInterval = 1000 / GameBase.drawsPerSecond;
    static updateTime = 1 / GameBase.updatesPerSecond;
    static drawTime = 1 / GameBase.drawsPerSecond;

    canvas: HTMLCanvasElement;
    context: Context2D;

    input: Input;

    windowWidth: number;
    windowHeight: number;

    images: Images;

    constructor(enumType: { [enumValue: string]: string }) {
        this.images = new Images();
        this.images.loadImages(enumType);

        this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;

        this.context = this.canvas.getContext2D();
        this.context.imageSmoothingEnabled = false;

        this.input = new Input(this.canvas);

        this.updateWindowSize();
        window.addEventListener('resize', () => this.updateWindowSize());
    }

    run() {
        this.initialize();
        this.startUpdating();
        this.startDrawing();
    }

    abstract initialize(): void;

    abstract update(): void;

    abstract draw(): void;

    private baseUpdate() {
        this.input.update();
        this.update();
    }

    private baseDraw() {
        this.context.clearRect(0, 0, this.windowWidth, this.windowHeight);
        this.draw();
    }

    private startUpdating() {
        setInterval(() => this.baseUpdate(), GameBase.updateInterval);
    }

    private startDrawing() {
        setInterval(() => this.baseDraw(), GameBase.drawInterval);
    }

    private updateWindowSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.context.imageSmoothingEnabled = false;
    }
}
