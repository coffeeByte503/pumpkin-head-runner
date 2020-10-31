
class Graphics {
    constructor(src, ctx) {
        this.buffer = {};
        this.src = Object.entries(src);
        this.ctx = ctx;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    draw(name, x, y) {
        this.ctx.drawImage(this.buffer[name], x | 0, y | 0);
    }

    get(name) {
        return this.buffer[name];
    }

    async load() {
        const imgLoaded = await Promise.all(
            this.src.map(([name, url]) => {
                return loadImage(url, name);
            })
        )
        imgLoaded.forEach(image => {
            this.buffer[image.name] = image.img;
        })
    }
}


function loadImage(url, name) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ img, name });
        img.src = url;
    })
}