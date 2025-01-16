import { Entity } from "./entities/entity.js";
import { initPlayer } from "./entities/player.js";
import { canvas, ctx, wipeDecals } from "./interface.js";
import { delay, game_time, setGameTime, Timer } from "./timer.js";
import * as scenes from "./content/scenes.js";
import { state, StateMessage } from "./state.js";
import { playMusic } from "./content/resources.js";

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

    // menu
    state.renderScene?.();

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

    // next frame
    setGameTime(ts);
    requestAnimationFrame(main);
}

export async function initGame() {
    initPlayer();
    requestAnimationFrame(main);

    // scenes.loading();
    scenes.stage1();
}

state.advance = async (message: StateMessage) => {
    switch (message) {
        case "loading->menu":
            await playMusic("menu");
            scenes.menu();
            break;

        case "menu->stage1":
            await playMusic("stage1");
            wipeDecals();
            scenes.stage1();
            break;
    }
};

state.character = "cotton";
state.scene = "stage1";
