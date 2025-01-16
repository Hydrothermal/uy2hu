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
    public hp = 0;
    public size = 15;
    public img: keyof typeof images = "card";
    public bullets?: {
        template: BulletTemplate;
        spawner: BulletSpawnerTemplate;
    };

    constructor(options: Partial<Props<EnemyTemplate>>) {
        Object.assign(this, options);
    }
}

export class Enemy extends Entity {
    public layer = 30;
    public maxhp = 0;
    public hp = 0;
    public bullet_spawner?: BulletSpawner;
    public flip = false;
    public tilt = 0;
    public aim_facing = 90;
    public scale = 1;

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

        this.hp = this.maxhp = template.hp;

        const bullets = this.template.bullets;
        if (bullets) {
            this.bullet_spawner = bullets.spawner.spawn(
                bullets.template,
                this,
                this.aim_facing
            );
        }
    }

    destroy() {
        super.destroy();
        this.behavior.destroy();
        this.bullet_spawner?.destroy();
    }

    die() {
        state.score += Math.floor(this.maxhp / 2);
        state.power += 2;

        let coins = randRange(
            Math.floor(this.maxhp / 160),
            Math.floor(this.maxhp / 100)
        );

        if (this.maxhp >= 200) {
            coins++;
        }

        for (let i = 0; i < coins; i++) {
            new Coin(this.x, this.y);
        }

        playSound("kill");
        this.destroy();
    }

    update(dt: number) {
        const { x } = this;
        super.update(dt);

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
                    this.hp -= entity.size;
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

        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        // ctx.fill();
        // ctx.stroke();

        ctx.rotated(this.x, this.y, this.tilt, () => {
            ctx.scale(this.scale, this.scale);

            if (this.flip) {
                ctx.scale(-1, 1);
            }

            ctx.drawCentered(images[this.template.img], 0, 0);

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
