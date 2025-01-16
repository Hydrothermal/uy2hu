import { Entity } from "./entities/entity.js";
import { Angle, angleTo, DEG_TO_RAD, Point, Props } from "./util.js";

// scale speeds to nice numbers
const SPEED_FACTOR = 1000;

export class Motion {
    public speed = 0;
    public angle = 0;
    public rotation = 0;
    public minspeed = 0;
    public maxspeed = 0;
    public acceleration = 0;

    public parent?: Entity;
    public target?: Entity;
    public homing = false;

    constructor(options: Partial<Props<Motion>>) {
        Object.assign(this, options);

        if (options.parent) {
            this.attach(options.parent);
        }
    }

    attach(parent: Entity, override = false) {
        if (!parent.motion || override) {
            parent.motion = this;
        }

        this.parent = parent;

        if (this.target) {
            this.angle = angleTo(this.parent, this.target);
        }

        return this;
    }

    apply(dt: number, entity: Entity) {
        if (this.homing && this.parent && this.target) {
            this.angle = angleTo(this.parent, this.target);
        }

        this.angle += this.rotation * 0.01 * dt;

        this.speed += (this.acceleration / SPEED_FACTOR) * dt;
        this.speed = Math.max(this.speed, this.minspeed);

        if (this.maxspeed) {
            this.speed = Math.min(this.speed, this.maxspeed);
        }

        // apply speed to position
        const rads = this.angle * DEG_TO_RAD;
        const _x = (this.speed / SPEED_FACTOR) * Math.cos(rads) * dt;
        const _y = (this.speed / SPEED_FACTOR) * Math.sin(rads) * dt;

        entity.x += _x;
        entity.y += _y;
    }
}
