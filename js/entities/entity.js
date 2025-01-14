import { HEIGHT, WIDTH } from "../interface.js";
import { distanceTo } from "../util.js";
export class Entity {
    x;
    y;
    size;
    layer = 10;
    motion;
    is_player = false;
    graze = 0;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        Entity.entities.add(this);
    }
    static entities = new Set();
    static player;
    get oob() {
        const edge = this.size + 20;
        return (this.x < -edge ||
            this.y < -edge ||
            this.x > WIDTH + edge ||
            this.y > HEIGHT + edge);
    }
    refresh(dt) {
        this.motion?.apply(dt, this);
        if (this.is_player) {
            this.x = Math.min(Math.max(this.x, this.size), WIDTH - this.size);
            this.y = Math.min(Math.max(this.y, this.size), HEIGHT - this.size);
        }
        else if (this.oob) {
            this.destroy();
        }
    }
    collides(target) {
        const distance = distanceTo(this, target);
        return distance + this.graze < this.size + target.size;
    }
    destroy() {
        Entity.entities.delete(this);
    }
    update(dt) {
        this.refresh(dt);
        return this;
    }
}
window.entities = Entity.entities;
