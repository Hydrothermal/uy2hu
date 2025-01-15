import { Motion } from "../motion.js";
import { HEIGHT, WIDTH } from "../interface.js";
import { distanceTo } from "../util.js";
import type { Player } from "./player.js";

// layers
// 30: enemies
// 20: bullets
// 19: player bullets
// 10: player

export abstract class Entity {
    public layer = 10;
    public motion?: Motion;
    public is_player = false;
    public graze = 0;

    constructor(public x: number, public y: number, public size: number) {
        Entity.entities.add(this);
    }

    static entities = new Set<Entity>();
    static player: Player;

    get oob() {
        const edge = this.size + 20;

        return (
            this.x < -edge ||
            this.y < -edge ||
            this.x > WIDTH + edge ||
            this.y > HEIGHT + edge
        );
    }

    refresh(dt: number) {
        this.motion?.apply(dt, this);

        if (this.is_player) {
            this.x = Math.min(Math.max(this.x, this.size), WIDTH - this.size);
            this.y = Math.min(Math.max(this.y, this.size), HEIGHT - this.size);
        } else if (this.oob) {
            this.destroy();
        }
    }

    collides(target: Entity) {
        const distance = distanceTo(this, target);
        return distance + this.graze < this.size + target.size;
    }

    destroy() {
        Entity.entities.delete(this);
    }

    update(dt: number) {
        this.refresh(dt);
        return this;
    }

    abstract render(ctx: CanvasRenderingContext2D): void;
}

(window as any).entities = Entity.entities;
