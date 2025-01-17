import { Behavior } from "../../behavior.js";
import { Enemy, noEnemies } from "../../entities/enemy.js";
import { Entity } from "../../entities/entity.js";
import { initPlayer } from "../../entities/player.js";
import { GAME_WIDTH, HALF } from "../../interface.js";
import { Motion } from "../../motion.js";
import { renderSidebar } from "../../sidebar.js";
import { state } from "../../state.js";
import { delay, Timer } from "../../timer.js";
import { randRange } from "../../util.js";
import * as enemies from "../enemies.js";
import { playMusic } from "../resources.js";

const swing_from_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 0,
        rotation: 4,
        speed: 150,
    }).attach(entity);
};

const swing_from_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 180,
        rotation: -4,
        speed: 150,
    }).attach(entity);
};

const straight_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 0,
        speed: 100,
    }).attach(entity);
};

const straight_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 180,
        speed: 100,
    }).attach(entity);
};

const straight_down = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 180,
    }).attach(entity);
};

const descend = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 65,
        acceleration: -8,
    }).attach(entity);
};

const descend_crawl = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 100,
        minspeed: 20,
        acceleration: -30,
    }).attach(entity);
};

const angled_from_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 20,
        speed: 150,
        acceleration: -50,
    }).attach(entity);
};

const angled_from_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 160,
        speed: 150,
        acceleration: -50,
    }).attach(entity);
};

const scatter_from_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: randRange(-10, 40),
        speed: randRange(80, 110),
        acceleration: -randRange(30, 40),
    }).attach(entity);
};

const scatter_from_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: randRange(190, 140),
        speed: randRange(80, 110),
        acceleration: -randRange(30, 40),
    }).attach(entity);
};

async function frog_circle(dir: string) {
    const x = dir === "right" ? -20 : GAME_WIDTH + 20;
    const behavior = dir === "right" ? swing_from_left : swing_from_right;
    const flip = dir === "left";

    new Timer(
        500,
        () => {
            new Enemy(enemies.frog_slow, x, 100, new Behavior(behavior), {
                flip,
            });
        },
        4
    );
}

async function frog_clusters() {
    const n = state.difficulty >= 2 ? 4 : 3;

    for (let i = 0; i < n; i++) {
        new Timer(100 * i, () => {
            new Enemy(
                enemies.frog_harry_2,
                -20,
                250,
                new Behavior(scatter_from_left)
            );
        });
    }

    for (let i = 0; i < n; i++) {
        new Timer(100 * i, () => {
            new Enemy(
                enemies.frog_harry_2,
                GAME_WIDTH + 20,
                250,
                new Behavior(scatter_from_right),
                { flip: true }
            );
        });
    }
}

export async function stage3() {
    state.scene = "stage3";
    state.renderScene = renderSidebar;
    state.advance("init");

    await delay(2000);

    frog_circle("right");
    frog_circle("left");

    await delay(4000);

    frog_circle("right");
    frog_circle("left");

    await delay(2000);

    new Timer(
        1000,
        () => {
            new Enemy(enemies.frog_slow, -20, 40, new Behavior(straight_right));
        },
        4 + state.difficulty * 2
    );

    await delay(2000);

    new Timer(
        500,
        () => {
            new Enemy(
                enemies.frog_fast,
                HALF,
                -20,
                new Behavior(swing_from_left),
                { flip: true }
            );
        },
        4
    );

    await delay(2000);

    new Enemy(enemies.frog_harry, HALF, -20, new Behavior(descend_crawl));

    await delay(2000);
    new Enemy(enemies.frog_harry, 75 * 1, -20, new Behavior(descend_crawl));

    await delay(2000);
    new Enemy(enemies.frog_harry, 75 * 2, -20, new Behavior(descend_crawl));

    await delay(2000);
    new Enemy(enemies.frog_harry, 75 * 4, -20, new Behavior(descend_crawl));

    await delay(2000);
    new Enemy(enemies.frog_harry, 75 * 5, -20, new Behavior(descend_crawl));

    await noEnemies(500);

    for (let i = 0; i < 4 + state.difficulty; i++) {
        new Timer(750 * i, () => {
            new Enemy(
                enemies.topfrog,
                randRange(20, GAME_WIDTH - 20),
                -20,
                new Behavior(straight_down)
            );
        });
    }

    await delay(6000 - state.difficulty * 200);

    frog_circle("right");

    await delay(3000);
    frog_circle("left");

    await delay(3000);
    frog_circle("right");

    await delay(3000);
    frog_circle("left");

    await noEnemies();

    for (let i = 0; i < 8 + state.difficulty * 4; i++) {
        new Timer(500 * i, () => {
            new Enemy(
                enemies.frog_slow,
                randRange(20, GAME_WIDTH - 20),
                -20,
                new Behavior(descend_crawl),
                { flip: Math.random() < 0.5 }
            );
        });
    }

    await delay(5000 - state.difficulty * 200);

    const a = state.difficulty === 3 ? 4 : 3;
    for (let i = 0; i < a; i++) {
        new Timer(250 * i, () => {
            new Enemy(
                enemies.frog_harry,
                -(20 + 20 * i),
                50 + 60 * i,
                new Behavior(angled_from_left),
                { oob_left: false, flip: true }
            );
            new Enemy(
                enemies.frog_harry,
                GAME_WIDTH + (20 + 20 * i),
                50 + 60 * i,
                new Behavior(angled_from_right),
                { oob_right: false }
            );
        });
    }

    await noEnemies(600);
    playMusic("boss3");
    await delay(1000);

    new Enemy(
        enemies.harry,
        HALF,
        -90,
        new Behavior(descend, async (dt, boss) => {
            if (boss.hp <= boss.maxhp / 2 && !boss.phase2) {
                boss.phase2 = true;
                boss.img = "enemy_harry_2";

                boss.addSpawner(
                    enemies.harry_phase2.template,
                    enemies.harry_phase2.spawner
                );

                frog_clusters();

                await delay(6000);
                if (state.difficulty >= 2) {
                    frog_clusters();
                }
            }
        }),
        { oob_top: false }
    );

    await delay(5000);
    frog_clusters();

    await delay(6000);
    if (state.difficulty >= 2) {
        frog_clusters();
    }

    await delay(6000);
    frog_clusters();

    await delay(6000);
    if (state.difficulty >= 2) {
        frog_clusters();
    }

    await noEnemies();
    await delay(1000);
    state.win = true;
    state.advance("gameover");
}
