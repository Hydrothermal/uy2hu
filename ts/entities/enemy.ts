import { Motion } from "../motion.js";
import { Timer } from "../timer.js";
import { Props } from "../util.js";
import { Bullet, BulletSpawnerTemplate, BulletTemplate } from "./bullet.js";
import { Entity } from "./entity.js";

export class EnemyTemplate {
    public hp = 0;
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

    constructor(
        public template: EnemyTemplate,
        public x: number,
        public y: number,
        public size: number,
        public motion: Motion
    ) {
        super(x, y, size);
        motion.attach(this);

        this.hp = this.maxhp = template.hp;

        if (this.template.bullets) {
            this.template.bullets.spawner.spawn(
                this.template.bullets.template,
                this,
                90,
                150
            );
        }
    }

    destroy() {
        super.destroy();
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
            this.destroy();
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
