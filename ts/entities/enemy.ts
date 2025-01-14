import { Motion } from "../motion.js";
import { Bullet } from "./bullet.js";
import { Entity } from "./entity.js";

export class Enemy extends Entity {
    public layer = 30;

    constructor(
        public x: number,
        public y: number,
        public size: number,
        public motion: Motion
    ) {
        super(x, y, size);
        motion.attach(this);
    }

    update(dt: number) {
        this.refresh(dt);

        // collision
        for (const entity of Entity.entities) {
            if (entity instanceof Bullet && entity.source === "player") {
                if (this.collides(entity)) {
                    entity.destroy();
                    break;
                }
            }
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
