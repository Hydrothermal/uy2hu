import { Entity } from "./entities/entity.js";
import { initPlayer } from "./entities/player.js";
import { canvas, ctx, onKey, wipeDecals } from "./interface.js";
import { delay, game_time, setGameTime, Timer } from "./timer.js";
import * as scenes from "./content/scenes.js";
import { state, StateMessage } from "./state.js";
import { fadeOutMusic, playMusic, playSound } from "./content/resources.js";
import { useBomb } from "./bomb.js";

ctx.textBaseline = "top";

function main(ts: number) {
    // initial frame delay
    if (game_time === 0) {
        setGameTime(ts);
    }

    let dt = ts - game_time;

    if (dt > 50) {
        setGameTime(game_time + dt);

        for (const timer of Timer.timers) {
            timer.end += dt;
        }

        dt = 0;
    }

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // game loop
    if (state.inGame()) {
        state.playtime += dt;

        if (state.power >= 100) {
            state.power -= 100;
            state.bombs++;
            playSound("good_job");
        }
    }

    for (const timer of Timer.timers) {
        timer.update();
    }

    for (const entity of Entity.entities) {
        entity.update(dt);
    }

    const sorted_entities = Array.from(Entity.entities).sort(
        (a, b) => a.layer - b.layer
    );

    for (const entity of sorted_entities) {
        entity.render(ctx);
    }

    state.renderScene?.();

    // next frame
    setGameTime(ts);
    requestAnimationFrame(main);
}

export async function initGame() {
    requestAnimationFrame(main);

    // scenes.menu();
    scenes.stage1();
    // scenes.gameover();
}

onKey((key) => {
    if ((key === "enter" || key === " ") && state.inGame()) {
        useBomb();
    }
});

state.advance = async (message: StateMessage) => {
    switch (message) {
        case "menu":
            await playMusic("menu");
            scenes.menu();
            break;

        case "init":
            Entity.player.activate();

            if (state.difficulty === 1) {
                Entity.player.graze = 1.5;
            } else {
                Entity.player.graze = 1;
            }

            state.playtime = 0;
            state.score = 0;
            state.power = 35 - state.difficulty * 10;
            state.bombs = state.difficulty === 3 ? 2 : 3;
            state.lives = 4 - state.difficulty;
            break;

        case "menu->stage1":
            playMusic("stage1");
            await delay(500);
            wipeDecals();
            scenes.stage1();
            break;

        case "gameover":
            scenes.gameover();
            break;
    }
};

state.difficulty = 2;
state.character = "david";
// state.invincible = true;
// state.dmg_boost = true;
