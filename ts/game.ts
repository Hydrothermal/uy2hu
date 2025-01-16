import { Entity } from "./entities/entity.js";
import { initPlayer } from "./entities/player.js";
import { canvas, ctx, onKey, wipeDecals } from "./interface.js";
import { delay, game_time, setGameTime, Timer } from "./timer.js";
import * as scenes from "./content/scenes.js";
import { state, StateMessage } from "./state.js";
import { fadeOutMusic, playMusic } from "./content/resources.js";
import { useBomb } from "./bomb.js";

ctx.textBaseline = "top";

function wipeEntities() {
    for (const entity of Entity.entities) {
        entity.destroy();
    }
}

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

    scenes.menu();
    // scenes.stage1();
}

const game_scenes = ["stage1", "stage2", "stage3", "boss1", "boss2", "boss3"];

onKey((key) => {
    if ((key === "enter" || key === " ") && game_scenes.includes(state.scene)) {
        useBomb();
    }
});

state.advance = async (message: StateMessage) => {
    switch (message) {
        case "menu":
            await playMusic("menu");
            scenes.menu();
            break;

        case "menu->stage1":
            playMusic("stage1");
            await delay(500);
            wipeDecals();
            scenes.stage1();
            break;

        case "gameover":
            fadeOutMusic(0.2);
            wipeEntities();
            wipeDecals();
            scenes.gameover();
            break;
    }
};

state.character = "cotton";
state.scene = "stage1";
