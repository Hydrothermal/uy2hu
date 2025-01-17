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

const spread_descend = async (entity: Entity, behavior: Behavior) => {
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

export async function stage1() {
    initPlayer();
    state.scene = "stage1";
    state.renderScene = renderSidebar;

    // initialize gameplay
    state.advance("init");

    // await delay(2000);

    // new Timer(
    //     500,
    //     () => {
    //         new Enemy(enemies.goblin1, -10, 100, new Behavior(swing_from_left));
    //     },
    //     4
    // );

    // await delay(500);

    // await new Timer(
    //     500,
    //     () => {
    //         new Enemy(
    //             enemies.goblin1,
    //             GAME_WIDTH + 10,
    //             50,
    //             new Behavior(swing_from_right),
    //             { flip: true }
    //         );
    //     },
    //     4
    // ).promise();

    // await delay(2000);

    // new Timer(
    //     500,
    //     () => {
    //         new Enemy(enemies.goblin1, -10, 100, new Behavior(swing_from_left));
    //     },
    //     10
    // );

    // await new Timer(
    //     500,
    //     () => {
    //         new Enemy(
    //             enemies.goblin1,
    //             GAME_WIDTH + 10,
    //             50,
    //             new Behavior(swing_from_right),
    //             { flip: true }
    //         );
    //     },
    //     10
    // ).promise();

    // await delay(3000);

    // for (let i = 0; i < 4; i++) {
    //     new Enemy(enemies.goblin2, 90 + 90 * i, -30, new Behavior(descend));
    // }

    // await noEnemies(500);

    for (let i = 0; i < 5; i++) {
        new Timer(500 * i, () => {
            new Enemy(enemies.goblin2, 75 + 75 * i, -30, new Behavior(descend));
        });
    }

    await noEnemies();

    new Timer(
        500,
        () => {
            new Enemy(enemies.goblin1, HALF, -20, new Behavior(spread_descend));
        },
        6
    );

    new Timer(
        900,
        () => {
            new Enemy(enemies.goblin1, HALF, -20, new Behavior(spread_descend));
        },
        4
    );

    new Timer(
        1200,
        () => {
            new Enemy(enemies.goblin2, HALF, -20, new Behavior(spread_descend));
        },
        4
    );
}
