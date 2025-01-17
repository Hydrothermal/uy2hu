import { images, playSound } from "../content/resources.js";
import { ctx, GAME_WIDTH } from "../interface.js";
import { Motion } from "../motion.js";
import { state } from "../state.js";
import { distanceTo, randRange } from "../util.js";
import { Entity } from "./entity.js";

export class Coin extends Entity {
    public layer = 25;
    public oob_top = false;
    public motion = new Motion({
        angle: randRange(-8, 8) - 90,
        speed: randRange(150, 200),
        minspeed: 0,
        acceleration: -5,
    });

    public gravity = new Motion({
        angle: 90,
        speed: randRange(10, 50),
        maxspeed: randRange(500, 700),
        acceleration: randRange(60, 80),
    });

    public homing = new Motion({
        parent: this,
        target: Entity.player,
        homing: true,
        speed: 200,
    });

    constructor(x: number, y: number) {
        super(x, y, 18);
    }

    update(dt: number) {
        super.update(dt);
        this.gravity.apply(dt, this);

        const homing_distance = 100 - state.difficulty * 15;

        if (distanceTo(this, Entity.player) < homing_distance) {
            this.homing.apply(dt, this);
        }

        // wall bounce
        if (this.x <= 5) {
            this.motion.angle = -90 + 20;
        } else if (this.x >= GAME_WIDTH - 5) {
            this.motion.angle = -90 - 20;
        }

        // pickup
        if (this.collides(Entity.player)) {
            state.score += 15;
            state.power += 1;
            playSound("coin");
            this.destroy();
        }

        return this;
    }

    render() {
        ctx.drawCentered(images.coin, this.x, this.y);
    }
}
