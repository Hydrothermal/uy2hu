import { Motion } from "../motion.js";
import { GAME_WIDTH, HEIGHT } from "../interface.js";
import { distanceTo } from "../util.js";
import type { Player } from "./player.js";

// layers
// 30: enemies
// 25: coins
// 20: bullets
// 15: player
// 14: player bullets

export abstract class Entity {
    public layer = 10;
    public motion?: Motion;
    public is_player = false;
    public graze = 0;

    public oob_left = true;
    public oob_right = true;
    public oob_top = true;
    public oob_bottom = true;

    constructor(public x: number, public y: number, public size: number) {
        Entity.entities.add(this);
    }

    static entities = new Set<Entity>();
    static player: Player;

    get oob() {
        const edge = this.size + 20;

        return (
            (this.oob_left && this.x < -edge) ||
            (this.oob_top && this.y < -edge) ||
            (this.oob_right && this.x > GAME_WIDTH + edge) ||
            (this.oob_bottom && this.y > HEIGHT + edge)
        );
    }

    refresh(dt: number) {
        this.motion?.apply(dt, this);

        if (this.is_player) {
            this.x = Math.min(
                Math.max(this.x, this.size),
                GAME_WIDTH - this.size
            );
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
