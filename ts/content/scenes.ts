import { Behavior } from "../behavior.js";
import { Enemy } from "../entities/enemy.js";
import type { Entity } from "../entities/entity.js";
import { Motion } from "../motion.js";
import * as enemies from "./enemies.js";

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
        acceleration: -10,
    }).attach(entity);

    await behavior.delay(2000);
    behavior.restart();
};

export async function testScene() {
    new Enemy(enemies.test_enemy, 250, -30, new Behavior(behavior));
}
