import { Behavior } from "../../behavior.js";
import { Enemy } from "../../entities/enemy.js";
import { Entity } from "../../entities/entity.js";
import { initPlayer } from "../../entities/player.js";
import { Motion } from "../../motion.js";
import { renderSidebar } from "../../sidebar.js";
import { state } from "../../state.js";
import * as enemies from "../enemies.js";

const behavior = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 100,
        acceleration: -10,
    }).attach(entity);

    await behavior.delay(2000);

    new Motion({
        angle: 270,
        speed: 100,
        acceleration: -50,
    }).attach(entity);

    await behavior.delay(2000);
    behavior.restart();
};

export async function stage1() {
    initPlayer();
    state.scene = "stage1";
    state.renderScene = renderSidebar;

    // initialize gameplay
    Entity.player.activate();

    state.power = 35 - state.difficulty * 10;
    state.bombs = state.difficulty === 3 ? 2 : 3;
    state.lives = 4 - state.difficulty;

    new Enemy(enemies.test_enemy, 250, 0, new Behavior(behavior));
}
