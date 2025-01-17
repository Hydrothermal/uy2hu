import { BulletSpawnerTemplate, BulletTemplate } from "../entities/bullet.js";
import { EnemyTemplate } from "../entities/enemy.js";
import * as patterns from "./bullet_patterns.js";

export const goblin_single_fast = new EnemyTemplate({
    img: "enemy_goblin",
    hp: 60,
    size: 20,
    bullets: [
        {
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
    ],
});

export const goblin_single_slow = new EnemyTemplate({
    img: "enemy_goblin",
    hp: 60,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 1500,
                    speed: 140,
                    targeted: true,
                    patterns: [patterns.single],
                },
            ]),
        },
    ],
});

export const goblin_wizard_triple = new EnemyTemplate({
    img: "enemy_goblin_wizard",
    hp: 200,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00c", size: 10 }),
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
    ],
});

export const lizard_chain_shot = new EnemyTemplate({
    img: "enemy_lizard",
    hp: 30,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#018", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: 2,
                    interval: 400,
                    speed: 200,
                    chance: 20,
                    targeted: true,
                    patterns: [patterns.chain_shot],
                },
            ]),
        },
    ],
});

export const lizard_triple_aimed = new EnemyTemplate({
    img: "enemy_lizard",
    hp: 60,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    delay: 400,
                    speed: 200,
                    targeted: true,
                    patterns: [patterns.triple],
                },
            ]),
        },
    ],
});

export const cube = new EnemyTemplate({
    boss: true,
    img: "enemy_cube",
    hp: 4000,
    size: 75,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 2000,
                    speed: 200,
                    patterns: [patterns.arrow_burst],
                },
                {
                    delay: 1000,
                    waves: Infinity,
                    interval: 2000,
                    speed: 200,
                    startAngle: -90,
                    endAngle: -90,
                    patterns: [patterns.arrow_burst],
                },
            ]),
        },
        {
            template: new BulletTemplate({ color: "#06a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    min_difficulty: 2,
                    waves: Infinity,
                    interval: 400,
                    speed: 200,
                    targeted: true,
                    patterns: [patterns.triple],
                },
            ]),
        },
    ],
});

export const cube_phase2 = {
    template: new BulletTemplate({ color: "#06a", size: 4 }),
    spawner: new BulletSpawnerTemplate([
        {
            waves: Infinity,
            interval: 3000,
            speed: 100,
            startAngle: -30,
            endAngle: 30,
            rays: 4,
            patterns: [patterns.chain_shot],
        },
    ]),
};
