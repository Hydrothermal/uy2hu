import type { Behavior } from "../behavior.js";
import { playSound } from "../content/resources.js";
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

    constructor(
        public template: EnemyTemplate,
        public x: number,
        public y: number,
        public behavior: Behavior
    ) {
        super(x, y, template.size);
        behavior.attach(this);

        this.hp = this.maxhp = template.hp;

        const bullets = this.template.bullets;
        if (bullets) {
            this.bullet_spawner = bullets.spawner.spawn(
                bullets.template,
                this,
                90
            );
        }
    }

    destroy() {
        super.destroy();
        this.behavior.destroy();
        this.bullet_spawner?.destroy();
    }

    die() {
        state.score += this.maxhp;
        state.power += 3;

        let coins = Math.floor(this.maxhp / 100) + randRange(0, 1);

        if (this.maxhp >= 100) {
            coins++;
        }

        for (let i = 0; i < coins; i++) {
            new Coin(this.x, this.y);
        }

        playSound("kill");
        this.destroy();
    }

    update(dt: number) {
        super.update(dt);

        // collision
        for (const entity of Entity.entities) {
            if (entity instanceof Bullet && entity.source === "player") {
                if (this.collides(entity)) {
                    entity.destroy();
                    this.hp--;
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

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
