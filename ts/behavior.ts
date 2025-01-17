import type { Enemy } from "./entities/enemy.js";
import type { Entity } from "./entities/entity.js";
import { game_time, Timer } from "./timer.js";

export class Behavior {
    public parent?: Entity;
    public timer?: Timer;

    constructor(
        public fn: (entity: Entity, behavior: Behavior) => void,
        public update?: (dt: number, entity: Enemy) => void
    ) {}

    attach(entity: Entity) {
        this.parent = entity;
        this.fn(entity, this);
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
