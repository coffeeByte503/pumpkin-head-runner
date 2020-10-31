class SpriteSheet {
    constructor(sheet) {
        this.sheet = sheet;
    }

    defineByColumns(columns) {
        const frames = [];

        const size = {
            x: this.sheet.width / columns,
            y: this.sheet.height
        };

        for (let c = 0; c < columns; ++c) {
            const [canvas, context] = createLayer(size.x, size.y);
            context.drawImage(
                this.sheet,
                size.x * c, 0,
                size.x, size.y,
                0, 0,
                size.x, size.y
            );
            frames.push(canvas);
        }

        return frames;
    }
}