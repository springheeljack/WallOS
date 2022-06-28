export class Images {
    private imagesRecord = {} as Record<string, HTMLImageElement>;

    loadImages(enumType: { [enumValue: string]: string }) {
        const imageDiv = document.getElementById('images');

        Object.keys(enumType).map(x => enumType[x]).forEach(imageName => {
            const image = new Image();
            image.src = 'images/' + imageName + '.png';
            image.width = 64;
            image.height = 64;
            imageDiv.append(image);
            this.imagesRecord[imageName] = image;
        });
    }

    getImage(imageName: string) {
        return this.imagesRecord[imageName];
    }
}
