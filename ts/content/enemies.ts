import { BulletSpawnerTemplate, BulletTemplate } from "../entities/bullet.js";
import { EnemyTemplate } from "../entities/enemy.js";
import * as patterns from "./bullet_patterns.js";

export const test_enemy = new EnemyTemplate({
    hp: 500,
    size: 20,
    bullets: {
        template: new BulletTemplate({ color: "#00a", size: 8 }),
        spawner: new BulletSpawnerTemplate([
            {
                waves: Infinity,
                interval: 1000,
                speed: 400,
                patterns: [patterns.chain_shot],
            },
        ]),
    },
});
