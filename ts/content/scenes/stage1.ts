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
        angle: 45,
        rotation: -2,
        speed: 150,
    }).attach(entity);
};

const swing_from_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90 + 45,
        rotation: 2,
        speed: 150,
    }).attach(entity);
};

const descend = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 90,
        speed: 100,
        acceleration: -30,
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

const straight_right = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 0,
        speed: 200,
    }).attach(entity);
};

const straight_left = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 180,
        speed: 200,
    }).attach(entity);
};

const straight_right_stop = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 0,
        speed: 145,
        acceleration: -50,
    }).attach(entity);

    await delay(4000);

    new Motion({
        angle: -110,
        speed: 5,
        acceleration: 50,
    }).attach(entity, true);
};

const straight_left_stop = async (entity: Entity, behavior: Behavior) => {
    new Motion({
        angle: 180,
        speed: 145,
        acceleration: -50,
    }).attach(entity);

    await delay(4000);

    new Motion({
        angle: -70,
        speed: 5,
        acceleration: 50,
    }).attach(entity, true);
};

function lizard_trio(y: number, dir: string) {
    const x1 = dir === "right" ? -10 : GAME_WIDTH + 10;
    const x2 = dir === "right" ? -50 : GAME_WIDTH + 50;
    const behavior = dir === "right" ? straight_right_stop : straight_left_stop;
    const flip = dir === "left";

    new Enemy(enemies.lizard_triple_aimed, x1, y, new Behavior(behavior), {
        flip,
    });

    new Enemy(enemies.lizard_triple_aimed, x2, y - 40, new Behavior(behavior), {
        oob_left: false,
        oob_right: false,
        flip,
    });

    new Enemy(enemies.lizard_triple_aimed, x2, y + 40, new Behavior(behavior), {
        oob_left: false,
        oob_right: false,
        flip,
    });
}

export async function stage1() {
    state.scene = "stage1";
    state.renderScene = renderSidebar;
    state.advance("init");

    await delay(2000);

    new Timer(
        500,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                -10,
                100,
                new Behavior(swing_from_left)
            );
        },
        4
    );

    await delay(500);

    await new Timer(
        500,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                GAME_WIDTH + 10,
                50,
                new Behavior(swing_from_right),
                { flip: true }
            );
        },
        4
    ).promise();

    await delay(2000);

    new Timer(
        500,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                -10,
                100,
                new Behavior(swing_from_left)
            );
        },
        10
    );

    await new Timer(
        500,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                GAME_WIDTH + 10,
                50,
                new Behavior(swing_from_right),
                { flip: true }
            );
        },
        10
    ).promise();

    await delay(3000);

    for (let i = 0; i < 4; i++) {
        new Enemy(
            enemies.goblin_wizard,
            90 + 90 * i,
            -30,
            new Behavior(descend)
        );
    }

    await noEnemies(500);

    for (let i = 0; i < 5; i++) {
        new Timer(500 * i, () => {
            new Enemy(
                enemies.goblin_wizard,
                75 + 75 * i,
                -30,
                new Behavior(descend)
            );
        });
    }

    await delay(600);
    await noEnemies();

    new Timer(
        500,
        () => {
            new Enemy(
                enemies.goblin_single_fast,
                HALF,
                -20,
                new Behavior(scatter_descend)
            );
        },
        6
    );

    new Timer(
        900,
        () => {
            new Enemy(
                enemies.goblin_single_slow,
                HALF,
                -20,
                new Behavior(scatter_descend)
            );
        },
        4
    );

    new Timer(
        1200,
        () => {
            new Enemy(
                enemies.goblin_wizard,
                HALF,
                -20,
                new Behavior(scatter_descend)
            );
        },
        4
    );

    await delay(1000);
    await noEnemies();

    for (let i = 0; i < 8; i++) {
        new Timer(i * 500, () => {
            new Enemy(
                enemies.lizard_chain_shot,
                -20,
                80 + i * 40,
                new Behavior(straight_right)
            );
        });

        new Timer(250 + i * 500, () => {
            new Enemy(
                enemies.lizard_chain_shot,
                GAME_WIDTH + 20,
                100 + i * 40,
                new Behavior(straight_left),
                {
                    flip: true,
                }
            );
        });
    }

    await delay(500);

    new Timer(
        500,
        () => {
            new Enemy(
                enemies.goblin_wizard,
                -20,
                50,
                new Behavior(swing_from_left)
            );
        },
        10
    );

    await delay(500);
    await noEnemies(500);

    lizard_trio(60, "right");

    await delay(1000);
    lizard_trio(160, "left");

    await delay(1000);
    lizard_trio(260, "right");

    await delay(1000);
    lizard_trio(360, "left");

    await noEnemies(600);
    playMusic("boss1");
    await delay(1000);

    new Enemy(
        enemies.cube,
        HALF,
        -80,
        new Behavior(descend, (dt, boss) => {
            if (boss.hp <= boss.maxhp / 2 && !boss.phase2) {
                boss.phase2 = true;
                boss.img = "enemy_cube_2";

                boss.addSpawner(
                    enemies.cube_phase2.template,
                    enemies.cube_phase2.spawner
                );
            }
        })
    );

    await noEnemies();
    state.advance("bossdead");
    await delay(2000);
    state.advance("stage2");
}
