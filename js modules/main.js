let canvas,
    context,
    graphics,
    backgrounds,
    renderer,
    player,
    obstacles = [],
    attemps = 0,
    bestScore = 0,
    currentScore = 0,
    scoreMultiplier = 0.1,
    screamAU,
    auBG;

let playerSprites = {
    idle: null,
    dead: null,
    run: null,
    jump: null
}


async function main() {
    [canvas, context] = createLayer(innerWidth, innerHeight);
    self.app.appendChild(canvas);

    graphics = new Graphics({
        stone: "img/Stone.png",
        crate: "img/Crate.png",
        ground: "img/14.png",
        trunk: "img/tree_1.png",
        bgDecor: "img/BG_Decor2.png",
        foreground: "img/Foreground2.png",
        middleDecor: "img/Middle_Decor2.png",
        sky: "img/Sky2.png",
        player_idle: "img/idle2.png",
        player_run: "img/Run2.png",
        player_jump: "img/Jump2.png",
        player_dead: "img/Dead2.png"

    }, context);

    await graphics.load();


    backgrounds = new ParalaxBackground(graphics, innerWidth, innerHeight);
    backgrounds.speed = 0;


    backgrounds.add("sky", {
        vel: 0,
        x: 0,
        y: 0
    });
    backgrounds.add("bgDecor", {
        vel: 0.02,
        x: 0,
        y: 0
    });
    backgrounds.add("middleDecor", {
        vel: 0.04,
        x: 0,
        y: 0
    });
    backgrounds.add("foreground", {
        vel: 0.07,
        x: 0,
        y: 0
    });
    backgrounds.add("ground", {
        vel: 0.12,
        width: 88,
        height: 53,
        x: 0,
        y: innerHeight - 40
    });
    context.fillStyle = "#fff";
    context.font = "20px sans-serif"


    playerSprites = {
        idle: new SpriteSheet(graphics.get("player_idle")).defineByColumns(10),
        dead: new SpriteSheet(graphics.get("player_dead")).defineByColumns(10),
        run: new SpriteSheet(graphics.get("player_run")).defineByColumns(8),
        jump: new SpriteSheet(graphics.get("player_jump")).defineByColumns(10)
    }


    renderer = new Renderer(dt => {
        backgrounds.update(context, dt);

        player.update(dt);
        player.render(context);

        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            obstacle.render(context);
            obstacle.update(dt);
            if (obstacle.right < 0) {
                obstacles.splice(i, 1);
                createObstacle(random(obstacles[obstacles.length - 1].size.x + 200, obstacles[obstacles.length - 1].size.x + 400));
            }
            if (player.right - 30 > obstacle.left &&
                player.left + 10 < obstacle.right &&
                player.bottom - 30 > obstacle.top &&
                player.top + 20 < obstacle.bottom) {

                player.changeState("dead");
            }
            if (player.isDead) {
                gameOver();
            }
        }
        currentScore += scoreMultiplier * backgrounds.speed;
        context.fillText(`score: ${currentScore | 0}`, 30, 30)
    }, 0);

    auBG = await loadAudio("audio/En la gruta del rey2.mp3");
    screamAU = await loadAudio("audio/grito.mp3");



    initGame();
    $("#start-btn").onclick = async () => {
        initGame();
        backgrounds.speed = 2;
        player.changeState("run");
        $("#home").style.display = "none";
        auBG.play();
        updateObstaclesSpeed();
        canvas.onclick = () => {
            if (player.jumps < 2) player.jump();
        }
        obstacles = [];
        await howToPlay();
        createObstaclesChain();

    }


    renderer.start();
    $("#loading").remove();
    renderer.minFPS = 5;
    alert("please, use headphones for a better experience");
}

function updateDashboard() {
    if (currentScore >= bestScore) {
        bestScore = currentScore;
    }
    $("#bestScore").innerHTML = bestScore | 0;
    $("#currentScore").innerHTML = currentScore | 0;
    $("#attemps").innerHTML = attemps;
}

async function gameOver() {
    ++attemps;
    renderer.pause();
    player.changeState("idle");
    player.pos.x = 0;
    backgrounds.speed = 0;
    updateObstaclesSpeed();
    updateDashboard();
    if (attemps == 2) {
        await message("Be careful!!", 2000);

        await message("there is something strange around here!!", 2000);
    } else if (attemps % 3 == 0) {
        auBG.pause();
        $("#terror").style.display = "flex";
        screamAU.play();
        await sleep(1000)
        $("#terror").style.display = "none";
        auBG.play();
    }
    $("#home").style.display = "block";
}

function createObstaclesChain() {
    obstacles = [];
    for (let i = 0; i < 4; ++i) {
        createObstacle(random(i * 400, i * 200 + 400));
    }

}

function initGame() {
    createObstaclesChain();
    //
    player = new Player();
    player.sprites = playerSprites;
    player.changeState("idle");
    currentScore = 0;
    renderer.resume();
}

function createObstacle(distance = 0) {
    const sprite = graphics.get(["stone", "crate", "trunk"][random(0, 2)]);
    const obstacle = new Obstacle(new Vector(innerWidth + sprite.width + distance, innerHeight - 60));
    obstacle.vel.x = -backgrounds.backgrounds.get("ground").vel * backgrounds.speed;
    obstacle.setSprites(sprite);
    obstacles.push(obstacle);
}

function updateObstaclesSpeed() {
    for (let obstacle of obstacles) {
        obstacle.vel.x = obstacle.vel.x = -backgrounds.backgrounds.get("ground").vel * backgrounds.speed;
    }
}


async function message(msg, duration) {
    $("#message").innerHTML = msg;
    $("#message-container").classList.add("active");
    await sleep(duration);
    $("#message-container").classList.remove("active");
    await sleep(1000);
}

async function howToPlay() {
    if (attemps != 0) return;
    scoreMultiplier = 0;
    await message("Hey, it's your assistant.", 4000);
    await message("Tap the screen to jump", 2000);
    await message("you can jump twice at the same time.", 3000);
    await message("jump over obstacles", 2000);
    await message("let's play", 1000);
    await message("Don't forget your upvote :)", 3000);
    scoreMultiplier = 0.1;
}

main();
