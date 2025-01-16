import { Behavior } from "../../behavior.js";
import { Enemy } from "../../entities/enemy.js";
import { Entity } from "../../entities/entity.js";
import { Motion } from "../../motion.js";
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
    state.scene = "stage1";
    state.renderScene = undefined;

    Entity.player.activate();
    new Enemy(enemies.test_enemy, 250, 0, new Behavior(behavior));
}
