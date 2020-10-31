function $(selectors) {
    return document.querySelector(selectors);
}

function random(min, max) {
    return (Math.random() * (++max - min) + min) | 0
}

function sleep(milis) {
    return new Promise(resolve => setTimeout(resolve, milis));
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get intX() {
        return this.x | 0;
    }

    get intY() {
        return this.y | 0;
    }

}