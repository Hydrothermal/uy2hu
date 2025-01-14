import { Enemy } from "./entities/enemy.js";
import { Entity } from "./entities/entity.js";
import { Player } from "./entities/player.js";
import { Motion } from "./motion.js";
import { canvas } from "./interface.js";
import { game_time, setGameTime, Timer } from "./timer.js";
import { Bullet, BulletSpawner, BulletTemplate } from "./entities/bullet.js";

const ctx = canvas.getContext("2d")!;

let offset = 0;

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

requestAnimationFrame(main);

function spawn(x: number) {
    const e = new Enemy(
        x,
        -30,
        20,
        new Motion({
            angle: 90,
            speed: 100,
            acceleration: -20,
        })
    );

    const spawner = new BulletSpawner([
        {
            waves: Infinity,
            interval: 2000,
            targeted: true,
            pattern: {
                rays: 1,
                bullets: [
                    { angle: 0, size: 8, speed: 1.0 },
                    { angle: 0, size: 8, speed: 1.1 },
                    { angle: 0, size: 8, speed: 1.2 },
                    { angle: 0, size: 8, speed: 1.3 },
                    { angle: 0, size: 8, speed: 1.4 },
                ],
            },
        },
    ]);

    // const spawner = new BulletSpawner([
    //     {
    //         waves: Infinity,
    //         interval: 2000,
    //         pattern: {
    //             startAngle: -8,
    //             endAngle: 8,
    //             rays: 4,
    //             waves: 5,
    //             interval: 200,
    //             bullets: [{ angle: 0, size: 8, speed: 1 }],
    //         },
    //     },
    // ]);

    const template = new BulletTemplate("#00a", 1);

    new Timer(1000, () => {
        spawner.spawn(template, e, 90, 150);
    });
}

spawn(250);

const player = (Entity.player = new Player());

const spawner = new BulletSpawner([
    {
        startAngle: -10,
        endAngle: 10,
        rays: 4,
        bullets: [{ angle: 0, size: 2, speed: 1 }],
    },
    {
        startAngle: 0,
        endAngle: 0,
        rays: 1,
        bullets: [
            { angle: 0, size: 2, speed: 1, offset: -4 },
            { angle: 0, size: 2, speed: 1, offset: +4 },
        ],
    },
]);

const template = new BulletTemplate("#6f6", 0.8);
template.source = "player";

const timer = new Timer(
    50,
    (drift: number) => {
        spawner.spawn(template, player, 270, 500, drift);
    },
    true
);
