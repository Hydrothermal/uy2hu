import type { Behavior } from "../behavior.js";
import { images, playSound } from "../content/resources.js";
import { Motion } from "../motion.js";
import { state } from "../state.js";
import { Timer } from "../timer.js";
import { Props, randRange } from "../util.js";
import {
    Bullet,
    BulletSpawner,
    BulletSpawnerTemplate,
    BulletTemplate,
} from "./bullet.js";
import { Coin } from "./coin.js";
import { Entity } from "./entity.js";

export class EnemyTemplate {
    public boss = false;
    public hp = 0;
    public size = 15;
    public img: keyof typeof images = "card";
    public bullets: {
        template: BulletTemplate;
        spawner: BulletSpawnerTemplate;
    }[] = [];

    constructor(options: Partial<Props<EnemyTemplate>>) {
        Object.assign(this, options);
    }
}

export class Enemy extends Entity {
    public layer = 30;
    public maxhp = 0;
    public hp = 0;
    public bullet_spawners: BulletSpawner[] = [];
    public flip = false;
    public tilt = 0;
    public aim_facing = 90;
    public scale = 1;
    public phase2 = false;
    public img: EnemyTemplate["img"];

    constructor(
        public template: EnemyTemplate,
        public x: number,
        public y: number,
        public behavior: Behavior,
        options?: Partial<Props<Enemy>>
    ) {
        super(x, y, template.size);
        behavior.attach(this);
        Object.assign(this, options);

        const hp_scale = 1 + (state.difficulty - 1) / 20;
        this.hp = this.maxhp = Math.floor(template.hp * hp_scale);
        this.img = this.template.img;

        for (const bullets of this.template.bullets) {
            this.addSpawner(bullets.template, bullets.spawner);
        }
    }

    destroy() {
        super.destroy();
        this.behavior.destroy();

        for (const spawner of this.bullet_spawners) {
            spawner.destroy();
        }
    }

    die() {
        state.score += Math.floor(this.maxhp / 2);
        state.power += 2;

        let coins = randRange(
            Math.floor(this.maxhp / 160),
            Math.floor(this.maxhp / 100) + 1
        );

        if (this.maxhp >= 200) {
            coins++;
        }

        if (this.template.boss) {
            coins = Math.floor(coins / 2);
            state.power += 10;
        }

        for (let i = 0; i < coins; i++) {
            new Coin(this.x, this.y);
        }

        playSound("kill");
        this.destroy();
    }

    addSpawner(bullet: BulletTemplate, spawner: BulletSpawnerTemplate) {
        this.bullet_spawners.push(spawner.spawn(bullet, this, this.aim_facing));
    }

    update(dt: number) {
        const { x } = this;
        super.update(dt);
        this.behavior.update?.(dt, this);

        const dx = this.x - x;
        const max_tilt = 15;
        const tilt_strength = 20;
        const tilt = Math.max(
            -max_tilt,
            Math.min(max_tilt, dx * tilt_strength)
        );

        if (dx !== 0) {
            this.tilt = tilt;
        } else {
            this.tilt -= Math.sign(this.tilt) * 0.5;

            if (Math.abs(this.tilt) < 0.5) {
                this.tilt = 0;
            }
        }

        this.scale = Math.min(1, this.scale + 0.001 * dt);

        // collision
        for (const entity of Entity.entities) {
            if (entity instanceof Bullet && entity.source === "player") {
                if (this.collides(entity)) {
                    entity.destroy();
                    this.hp -= entity.size * (state.dmg_boost ? 5 : 1);
                    this.scale = Math.max(0.9, this.scale - 0.04);
                    break;
                }
            }
        }

        if (this.hp < 0) {
            this.die();
        }

        return this;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#ddd";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;

        ctx.rotated(this.x, this.y, this.tilt, () => {
            ctx.scale(this.scale, this.scale);

            if (this.flip) {
                ctx.scale(-1, 1);
            }

            ctx.drawCentered(images[this.img], 0, 0);

            if (this.flip) {
                ctx.scale(-1, 1);
            }
            ctx.scale(1, 1);
        });
    }
}

export function noEnemies(delay = 0) {
    return new Promise<number | void>((resolve, reject) => {
        const timer = new Timer(
            50,
            () => {
                if (!state.inGame()) {
                    timer.destroy();
                    return;
                }

                const enemies = Array.from(Entity.entities).filter(
                    (e) => e instanceof Enemy
                );

                if (enemies.length === 0) {
                    timer.destroy();

                    if (delay) {
                        new Timer(delay, resolve);
                    } else {
                        resolve();
                    }
                }
            },
            true
        );
    });
}
