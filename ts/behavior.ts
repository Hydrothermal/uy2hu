import { Entity } from "./entities/entity.js";
import type { Motion } from "./motion.js";
import { game_time, Timer } from "./timer.js";

const TIME = 0;
const MOTION = 1;

export class Behavior {
    public start = 0;
    public step = 0;
    public parent?: Entity;
    public timer?: Timer;

    constructor(public fn: (entity: Entity, behavior: Behavior) => void) {}

    attach(entity: Entity) {
        this.parent = entity;
        this.restart();
    }

    restart() {
        if (this.parent) {
            this.start = game_time;
            this.fn(this.parent, this);
        }
    }

    destroy() {
        this.timer?.destroy();
    }

    delay(ms: number) {
        return new Promise((resolve, reject) => {
            this.timer = new Timer(ms, resolve);
        });
    }
}
