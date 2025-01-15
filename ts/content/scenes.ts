import { Enemy } from "../entities/enemy.js";
import { Motion } from "../motion.js";
import * as enemies from "./enemies.js";

export function testScene() {
    new Enemy(
        enemies.test_enemy,
        250,
        -30,
        20,
        new Motion({
            angle: 90,
            speed: 100,
            acceleration: -20,
        })
    );
}
