
class ParalaxBackground {
    constructor(graphics, width, height) {
        this.graphics = graphics;
        this.backgrounds = new Map();
        this.width = width;
        this.height = height;
        this.speed = 0;
    }

    update(ctx, dt) {
        this.backgrounds.forEach(background => {
            let counter = 0;
            background.offsetX += (background.vel * dt) * this.speed;
            while (background.x * counter + (background.width * counter) - background.offsetX < this.width) {
                ctx.drawImage(background.image, (background.x * counter + ((background.width) * counter) - background.offsetX) | 0, background.y, background.width, background.height);
                counter++;
            }
        });
    }

    add(name, options = {}) {
        const image = this.graphics.get(name);
        options.width = options.width ? image.width : image.width - 50;

        options.height = options.height ? options.height : this.height;

        this.backgrounds.set(name, { image, ...options, offsetX: 0 });
    }
}