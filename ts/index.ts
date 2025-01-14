import { Enemy, EnemyTemplate } from "./entities/enemy.js";
import { Entity } from "./entities/entity.js";
import { Player } from "./entities/player.js";
import { Motion } from "./motion.js";
import { canvas } from "./interface.js";
import { game_time, setGameTime, Timer } from "./timer.js";
import {
    Bullet,
    BulletSpawnerTemplate,
    BulletTemplate,
} from "./entities/bullet.js";
import * as patterns from "./content/bullet_patterns.js";

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

const et = new EnemyTemplate({
    hp: 300,
    bullets: {
        template: new BulletTemplate({ color: "#00a", size: 8 }),
        spawner: new BulletSpawnerTemplate([
            {
                waves: Infinity,
                interval: 2000,
                targeted: true,
                speed: 200,
                patterns: [patterns.chain_shot],
            },
        ]),
    },
});

function spawn(x: number) {
    const e = new Enemy(
        et,
        x,
        -30,
        20,
        new Motion({
            angle: 90,
            speed: 100,
            acceleration: -20,
        })
    );
}

spawn(250);

const player = (Entity.player = new Player());

const spawner = new BulletSpawnerTemplate([
    {
        waves: Infinity,
        interval: 50,
        speed: 500,
        patterns: [
            {
                startAngle: -10,
                endAngle: 10,
                rays: 4,
                bullets: [{ angle: 0, size: 2 }],
            },
            {
                bullets: [
                    { angle: 0, size: 2, offset: -4 },
                    { angle: 0, size: 2, offset: +4 },
                ],
            },
        ],
    },
]);

const player_bullet = new BulletTemplate({
    color: "#6f6",
    opacity: 0.8,
    size: 1,
    layer: 19,
});
player_bullet.source = "player";

spawner.spawn(player_bullet, player, 270);
