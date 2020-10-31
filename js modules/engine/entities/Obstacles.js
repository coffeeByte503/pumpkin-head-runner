class Obstacle extends Entity {
    constructor(pos) {
        super(pos, new Vector(32, 32));
    }

    update(dt) {
        this.pos.x += this.vel.x * dt;
    }

    render(ctx) {
        ctx.drawImage(this.sprites, this.pos.intX, this.pos.intY, this.size.intX, this.size.intY);
    }
}