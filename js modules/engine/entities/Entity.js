class Entity {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this.vel = new Vector();
        this.sprites = null;
        this.state = "";
    }

    get left() {
        return this.pos.x;
    }

    get right() {
        return this.pos.x + this.size.x;
    }
    get top() {
        return this.pos.y;
    }
    get bottom() {
        return this.pos.y + this.size.y;
    }

    set left(value) {
        this.pos.x = value;
    }
    set right(value) {
        this.pos.x = value - this.size.x;
    }
    set top(value) {
        this.pos.y = value;
    }
    set bottom(value) {
        this.pos.y = value - this.size.y;
    }

    setSprites(sprites) {
        this.sprites = sprites;
    }

    update(dt) { }

    render(ctx) { }
}