import { BulletSpawnerTemplate, BulletTemplate } from "../entities/bullet.js";
import { EnemyTemplate } from "../entities/enemy.js";
import * as patterns from "./bullet_patterns.js";

////////////////////////////////////////
// stage 1 /////////////////////////////
////////////////////////////////////////
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

export const goblin_wizard = new EnemyTemplate({
    img: "enemy_goblin_wizard",
    hp: 150,
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
        {
            template: new BulletTemplate({ color: "#00a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: 3,
                    interval: 300,
                    speed: 150,
                    delay: 1500,
                    targeted: true,
                    min_difficulty: 3,
                    patterns: [patterns.single],
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

////////////////////////////////////////
// stage 2 /////////////////////////////
////////////////////////////////////////
export const pixie_1 = new EnemyTemplate({
    img: "enemy_pixie",
    hp: 40,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#08f", size: 4 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: 4,
                    interval: 50,
                    speed: 200,
                    delay: 2000,
                    targeted: true,
                    patterns: [patterns.single],
                },
            ]),
        },
    ],
});

export const pixie_2 = new EnemyTemplate({
    img: "enemy_pixie",
    hp: 80,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 1500,
                    speed: 180,
                    delay: 1000,
                    patterns: [patterns.quad],
                },
            ]),
        },
    ],
});

export const shade = new EnemyTemplate({
    img: "enemy_shade",
    hp: 120,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 2000,
                    speed: 180,
                    delay: 500,
                    targeted: true,
                    patterns: [patterns.double],
                },
            ]),
        },
    ],
});

export const mummy = new EnemyTemplate({
    img: "enemy_mummy",
    hp: 300,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#138", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 2000,
                    speed: 200,
                    delay: 500,
                    targeted: true,
                    patterns: [patterns.chain_shot],
                },
                {
                    waves: Infinity,
                    interval: 1000,
                    speed: 200,
                    targeted: true,
                    patterns: [patterns.double_wide],
                },
            ]),
        },
        {
            template: new BulletTemplate({ color: "#00a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 500,
                    speed: 90,
                    delay: 1000,
                    targeted: true,
                    min_difficulty: 2,
                    patterns: [patterns.double],
                },
            ]),
        },
    ],
});

export const golem = new EnemyTemplate({
    boss: true,
    img: "enemy_golem",
    hp: 6000,
    size: 75,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    delay: 1000,
                    waves: Infinity,
                    interval: 1000,
                    speed: 200,
                    patterns: [patterns.penta],
                },
                {
                    delay: 500,
                    waves: Infinity,
                    interval: 1000,
                    speed: 200,
                    patterns: [patterns.triple],
                },
            ]),
        },
        {
            template: new BulletTemplate({ color: "#138", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    min_difficulty: 2,
                    waves: Infinity,
                    interval: 2000,
                    speed: 100,
                    targeted: true,
                    patterns: [patterns.double_wide],
                },
            ]),
        },
    ],
});

export const golem_phase2 = {
    template: new BulletTemplate({ color: "#08f", size: 4 }),
    spawner: new BulletSpawnerTemplate([
        {
            waves: Infinity,
            interval: 500,
            speed: 100,
            targeted: true,
            startAngle: -4,
            endAngle: 4,
            rays: 2,
            patterns: [patterns.double],
        },
    ]),
};

////////////////////////////////////////
// stage 3 /////////////////////////////
////////////////////////////////////////
export const frog_slow = new EnemyTemplate({
    img: "enemy_frog",
    hp: 40,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 8 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 800,
                    speed: 150,
                    targeted: true,
                    patterns: [patterns.single],
                },
            ]),
        },
    ],
});

export const frog_fast = new EnemyTemplate({
    img: "enemy_frog",
    hp: 60,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 600,
                    speed: 200,
                    patterns: [patterns.double],
                },
            ]),
        },
    ],
});

export const frog_harry = new EnemyTemplate({
    img: "enemy_frog_harry",
    hp: 60,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#08f", size: 4 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 1000,
                    speed: 150,
                    delay: 1000,
                    targeted: true,
                    patterns: [patterns.arrow],
                },
            ]),
        },
    ],
});

export const frog_harry_2 = new EnemyTemplate({
    img: "enemy_frog_harry",
    hp: 35,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#08f", size: 4 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 800,
                    speed: 150,
                    delay: 1000,
                    chance: 20,
                    targeted: true,
                    patterns: [patterns.arrow],
                },
            ]),
        },
    ],
});

export const topfrog = new EnemyTemplate({
    img: "enemy_topfrog",
    hp: 100,
    size: 20,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00c", size: 10 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 1500,
                    speed: 120,
                    delay: 500,
                    patterns: [patterns.star],
                },
            ]),
        },
    ],
});

export const harry = new EnemyTemplate({
    boss: true,
    img: "enemy_harry",
    hp: 10000,
    size: 60,
    bullets: [
        {
            template: new BulletTemplate({ color: "#00a", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    waves: Infinity,
                    interval: 3000,
                    speed: 150,
                    startAngle: -30,
                    endAngle: 30,
                    rays: 4,
                    patterns: [patterns.chain_shot],
                },
                {
                    delay: 1500,
                    waves: Infinity,
                    interval: 3000,
                    speed: 150,
                    startAngle: -60,
                    endAngle: 60,
                    rays: 5,
                    patterns: [patterns.triple],
                },
            ]),
        },
        {
            template: new BulletTemplate({ color: "#0af", size: 4 }),
            spawner: new BulletSpawnerTemplate([
                {
                    delay: 1000,
                    waves: Infinity,
                    interval: 800,
                    speed: 200,
                    targeted: true,
                    patterns: [patterns.double_wide],
                },
            ]),
        },
        {
            template: new BulletTemplate({ color: "#08f", size: 6 }),
            spawner: new BulletSpawnerTemplate([
                {
                    delay: 1000,
                    waves: Infinity,
                    interval: 800,
                    speed: 200,
                    min_difficulty: 2,
                    targeted: true,
                    patterns: [patterns.single],
                },
            ]),
        },
    ],
});

export const harry_phase2 = {
    template: new BulletTemplate({ color: "#06a", size: 8 }),
    spawner: new BulletSpawnerTemplate([
        {
            waves: Infinity,
            interval: 3000,
            speed: 200,
            startAngle: -30,
            endAngle: -30,
            patterns: [patterns.quad],
        },
        {
            delay: 1000,
            waves: Infinity,
            interval: 3000,
            speed: 200,
            patterns: [patterns.quad],
        },
        {
            delay: 2000,
            waves: Infinity,
            interval: 3000,
            speed: 200,
            startAngle: 30,
            endAngle: 30,
            patterns: [patterns.quad],
        },
        {
            waves: Infinity,
            interval: 3000,
            speed: 150,
            startAngle: -60,
            endAngle: 60,
            rays: 5,
            patterns: [patterns.triple],
        },
    ]),
};
