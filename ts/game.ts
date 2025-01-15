import { Entity } from "./entities/entity.js";
import { initPlayer } from "./entities/player.js";
import { canvas } from "./interface.js";
import { game_time, setGameTime, Timer } from "./timer.js";
import * as scenes from "./content/scenes.js";

const ctx = canvas.getContext("2d")!;

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

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

export function initGame() {
    initPlayer();
    scenes.testScene();

    requestAnimationFrame(main);
}
