class Player extends Entity {
    constructor() {
        super(new Vector(50, innerHeight - 130), new Vector(59, 103));
        this.distance = 0;
        this.sprites = null;
        this.state = "";
        this.currentSpriteSize = 0;
        this.currentSpriteIndex = 0;
        this.jumps = 0;
    }

    jump() {
        if (this.state == "dead") return;
        this.vel.y = -20;
        ++this.jumps;
    }

    changeState(state) {
        if (!this.sprites[state] || this.state == state) return;
        this.size.x = state == "dead" ? 90 : 59;

        this.state = state;
        this.distance = 0;
        this.currentSpriteIndex = 0;
        this.currentSpriteSize = this.sprites[this.state].length;
    }

    get isDead() {
        return this.distance - 450 >= this.currentSpriteSize ** 2 && this.state == "dead";
    }

    update(dt) {
        this.distance += dt;
        this.currentSpriteIndex = Math.floor(this.distance / 80) % this.currentSpriteSize;

        this.vel.y += dt * 0.05;
        this.pos.y += this.vel.y * (dt * 0.05);
        if (this.pos.y > innerHeight - 130) {
            this.pos.y = innerHeight - 130;
            this.vel.y = 0;
            if (this.state == "jump") {
                this.changeState("run");
                this.jumps = 0;
            }
        } else {
            if (this.state == "run") this.changeState("jump");
        }

    }

    render(ctx) {

        ctx.drawImage(this.sprites[this.state][this.currentSpriteIndex], this.pos.intX, this.pos.intY, this.size.intX, this.size.intY)
    }
}