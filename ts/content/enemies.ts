import { BulletSpawnerTemplate, BulletTemplate } from "../entities/bullet.js";
import { EnemyTemplate } from "../entities/enemy.js";
import * as patterns from "./bullet_patterns.js";

export const goblin1 = new EnemyTemplate({
    img: "enemy_goblin",
    hp: 60,
    size: 20,
    bullets: {
        template: new BulletTemplate({ color: "#00a", size: 8 }),
        spawner: new BulletSpawnerTemplate([
            {
                waves: Infinity,
                interval: 1000,
                speed: 150,
                targeted: true,
                patterns: [patterns.single],
            },
        ]),
    },
});

export const goblin2 = new EnemyTemplate({
    img: "enemy_goblin_wizard",
    hp: 200,
    size: 20,
    bullets: {
        template: new BulletTemplate({ color: "#00a", size: 8 }),
        spawner: new BulletSpawnerTemplate([
            {
                waves: Infinity,
                interval: 600,
                speed: 150,
                chance: 50,
                patterns: [patterns.triple],
            },
        ]),
    },
});
