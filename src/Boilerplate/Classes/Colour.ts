export class Colour {
    private r: number;
    private g: number;
    private b: number;
    private hexString: string;

    getR() { return this.r; }
    getG() { return this.g; }
    getB() { return this.b; }
    getHexString() { return this.hexString; }

    constructor(
        r: number,
        g: number,
        b: number
    ) {
        this.r = Math.round(this.boundValue(r));
        this.g = Math.round(this.boundValue(g));
        this.b = Math.round(this.boundValue(b));

        this.setHexString();
    }

    private setHexString() {
        const rHex = this.r.toString(16);
        const gHex = this.g.toString(16);
        const bHex = this.b.toString(16);

        this.hexString = '#';

        if (rHex.length === 1)
            this.hexString += '0';
        this.hexString += rHex;

        if (gHex.length === 1)
            this.hexString += '0';
        this.hexString += gHex;

        if (bHex.length === 1)
            this.hexString += '0';
        this.hexString += bHex;
    }

    private boundValue(value: number) {
        if (value < 0)
            return 0;
        if (value > 255)
            return 255;
        return value;
    }

    public multiply(number: number) {
        return new Colour(this.r * number, this.g * number, this.b * number);
    }

    public add(number: number) {
        return new Colour(this.r + number, this.g + number, this.b + number);
    }

    public static black = new Colour(0, 0, 0);
    public static white = new Colour(255, 255, 255);

    public static red = new Colour(255, 0, 0);
    public static yellow = new Colour(255, 255, 0);
    public static green = new Colour(0, 255, 0);
    public static cyan = new Colour(0, 255, 255);
    public static blue = new Colour(0, 0, 255);
    public static magenta = new Colour(255, 0, 255);
}
