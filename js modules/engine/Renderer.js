class Renderer {
    constructor(callback, minFPS) {
        this.req = null;
        this.minFPS = minFPS;
        this.lastTime = 0;
        this.running = false;
        this.loop = ms => {
            if (ms && this.running && ((1000 / (ms - this.lastTime)) | 0) > this.minFPS) callback(ms - this.lastTime);
            this.lastTime = ms;
            this.req = requestAnimationFrame(this.loop)
        }
    }

    resume() {
        this.running = true;

    }

    pause() {
        this.running = false;
    }

    start() {
        this.loop(0);
        this.resume();
    }
}