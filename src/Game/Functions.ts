const exponentSymbols: string[] = [
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
];

export function numberWithPostfix(num: number): string {
    const split = num.toExponential(3).split("e");
    const exponentNumber = split[0];
    const exponent = parseInt(split[1].replace("+", ""));
    const index = Math.floor(exponent / 3);

    if (index <= 0) {
        return num.toFixed(2);
    }
    if (index > exponentSymbols.length) {
        return exponentNumber + "e" + exponent;
    }

    let numWithTrail = (num / Math.pow(10, (index) * 3)).toFixed(3).substring(0, 4);

    while (numWithTrail.endsWith('0')) {
        numWithTrail = numWithTrail.substring(0, numWithTrail.length - 1);
    }

    if (numWithTrail.endsWith('.')) {
        numWithTrail = numWithTrail.substring(0, numWithTrail.length - 1);
    }

    return numWithTrail + exponentSymbols[index - 1];
}
