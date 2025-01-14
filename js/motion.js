import { angleTo, DEG_TO_RAD } from "./util.js";
// scale speeds to nice numbers
const SPEED_FACTOR = 1000;
export class Motion {
    speed = 0;
    angle = 0;
    rotation = 0;
    minspeed = 0;
    maxspeed = 0;
    acceleration = 0;
    parent;
    target;
    constructor(options) {
        Object.assign(this, options);
        if (options.parent) {
            this.attach(options.parent);
        }
    }
    attach(parent) {
        this.parent = parent;
        if (this.target) {
            this.angle = angleTo(this.parent, this.target);
        }
    }
    apply(dt, entity) {
        this.angle += this.rotation * dt;
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
