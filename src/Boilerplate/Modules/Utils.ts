export module Utils {
    export function createMultidimensionalArray<TType>(width: number, height: number, defaultValue: TType) {
        let multiArray: TType[][] = [];

        for (let x = 0; x < width; x++) {
            const array: TType[] = [];
            for (let y = 0; y < height; y++) {
                array.push(defaultValue);
            }
            multiArray.push(array);
        }

        return multiArray;
    }
}
