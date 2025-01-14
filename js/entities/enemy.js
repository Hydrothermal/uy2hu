import { Bullet } from "./bullet.js";
import { Entity } from "./entity.js";
export class Enemy extends Entity {
    x;
    y;
    size;
    motion;
    layer = 30;
    constructor(x, y, size, motion) {
        super(x, y, size);
        this.x = x;
        this.y = y;
        this.size = size;
        this.motion = motion;
        motion.attach(this);
    }
    update(dt) {
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
    render(ctx) {
        ctx.fillStyle = "#ddd";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
