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

const swing_out_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        rotation: 3,
        speed: 150,
        acceleration: 20,
    }).attach(entity);
};

const swing_out_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        rotation: -3,
        speed: 150,
        acceleration: 20,
    }).attach(entity);
};

const straight_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 0,
        speed: 150,
    }).attach(entity);
};

const descend = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 150,
        acceleration: -30,
    }).attach(entity);
};

const slow_descend = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 100,
        acceleration: -20,
    }).attach(entity);
};

const scatter_descend = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: randRange(90 - 70, 90 + 70),
        speed: randRange(100, 130),
        acceleration: -10,
    }).attach(entity);

    entity.motion2 = new Motion({
        angle: 90,
        speed: 30,
        acceleration: -10,
    }).attach(entity);

    await delay(randRange(400, 1200));

    entity.motion!.acceleration = -80;

    await delay(randRange(4500, 5500));

    new Motion({
        angle: entity.x < HALF ? 0 : 180,
        speed: 10,
        acceleration: 60,
    }).attach(entity, true);
};

const scatter_from_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: randRange(-10, 20),
        speed: randRange(50, 140),
        acceleration: randRange(-20, -10),
    }).attach(entity);
};

const scatter_from_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: randRange(170, 190),
        speed: randRange(50, 140),
        acceleration: randRange(-20, -10),
    }).attach(entity);
};

export async function stage2() {
    state.scene = "stage2";
    state.renderScene = renderSidebar;
    state.advance("init");

    await delay(2000);

    new Timer(
        600,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                HALF,
                -15,
                new Behavior(swing_out_left)
            );
        },
        5
    );

    await delay(600 * 5);

    new Timer(
        600,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                HALF,
                -15,
                new Behavior(swing_out_right)
            );
        },
        5
    );

    await delay(600);
    await noEnemies(500);

    new Timer(
        600,
        () => {
            new Enemy(enemies.pixie_1, -15, 80, new Behavior(straight_right));
        },
        state.difficulty === 3 ? 30 : 25
    );

    await delay(2000);

    const a = 2 + state.difficulty;
    const b = GAME_WIDTH / (a + 1);

    for (let i = 0; i < a; i++) {
        new Timer(500 * i, () => {
            new Enemy(enemies.pixie_2, b + b * i, -30, new Behavior(descend));
        });
    }

    await delay(4400 - state.difficulty * 400);

    new Timer(
        150,
        () => {
            new Enemy(enemies.shade, HALF, -30, new Behavior(scatter_descend), {
                flip: Math.random() < 0.5,
            });
        },
        4
    );

    await delay(9000);

    new Timer(
        150,
        () => {
            new Enemy(enemies.shade, HALF, -30, new Behavior(scatter_descend), {
                flip: Math.random() < 0.5,
            });
        },
        6
    );

    await delay(160);
    await noEnemies(500);
    new Enemy(enemies.mummy, HALF, -30, new Behavior(slow_descend));
    await delay(state.difficulty === 3 ? 1500 : 4000);
    new Enemy(enemies.mummy, HALF / 2, -30, new Behavior(slow_descend));
    await delay(state.difficulty === 3 ? 1500 : 4000);
    new Enemy(enemies.mummy, HALF * 1.5, -30, new Behavior(slow_descend));

    if (state.difficulty >= 2) {
        await delay(4000);
    } else {
        await noEnemies(1000);
    }

    const c = state.difficulty === 3 ? 4 : 3;

    new Timer(
        200,
        () => {
            new Enemy(enemies.shade, -15, 100, new Behavior(scatter_from_left));
        },
        c
    );

    await delay(2000);

    new Timer(
        200,
        () => {
            new Enemy(
                enemies.shade,
                GAME_WIDTH + 15,
                100,
                new Behavior(scatter_from_right),
                { flip: true }
            );
        },
        c
    );

    await delay(3500);

    new Timer(
        200,
        () => {
            new Enemy(enemies.shade, -15, 200, new Behavior(scatter_from_left));
        },
        c
    );

    await delay(2000);

    new Timer(
        200,
        () => {
            new Enemy(
                enemies.shade,
                GAME_WIDTH + 15,
                200,
                new Behavior(scatter_from_right),
                { flip: true }
            );
        },
        c
    );

    await delay(250);
    await noEnemies(600);
    playMusic("boss2");
    await delay(1000);

    new Enemy(
        enemies.golem,
        HALF,
        -80,
        new Behavior(descend, (dt, boss) => {
            if (boss.hp <= boss.maxhp / 2 && !boss.phase2) {
                boss.phase2 = true;
                boss.img = "enemy_golem_2";

                boss.addSpawner(
                    enemies.golem_phase2.template,
                    enemies.golem_phase2.spawner
                );
            }
        })
    );

    await delay(4000);

    new Timer(
        600,
        () => {
            new Enemy(enemies.pixie_1, HALF, -15, new Behavior(swing_out_left));
        },
        5
    );

    await delay(4000);

    new Timer(
        600,
        () => {
            new Enemy(
                enemies.pixie_1,
                HALF,
                -15,
                new Behavior(swing_out_right)
            );
        },
        5
    );

    await noEnemies();
    state.advance("bossdead");
    await delay(2000);
    state.advance("stage3");
}
