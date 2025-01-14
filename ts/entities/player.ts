import { Motion } from "../motion.js";
import { HEIGHT, keyboard, WIDTH } from "../interface.js";
import { Entity } from "./entity.js";
import { RAD_TO_DEG } from "../util.js";
import { Bullet } from "./bullet.js";

export class Player extends Entity {
    public layer = 10;
    public graze = 1;

    public speed = 200;
    public is_player = true;
    public motion: Motion = new Motion({
        angle: 0,
        speed: 0,
        parent: this,
    });
    public colliding = false;

    constructor() {
        const size = 5;
        super(WIDTH / 2, HEIGHT - 50, size);
    }

    update(dt: number) {
        super.update(dt);

        // movement
        const left = keyboard.has("a") || keyboard.has("arrowleft");
        const right = keyboard.has("d") || keyboard.has("arrowright");
        const up = keyboard.has("w") || keyboard.has("arrowup");
        const down = keyboard.has("s") || keyboard.has("arrowdown");

        const x = (right ? 1 : 0) + (left ? -1 : 0);
        const y = (down ? 1 : 0) + (up ? -1 : 0);

        const angle = Math.atan2(y, x) * RAD_TO_DEG;
        this.motion.angle = angle;

        if (!x && !y) {
            this.motion.speed = 0;
        } else {
            this.motion.speed = this.speed;
        }

        // collision
        this.colliding = false;
        for (const entity of Entity.entities) {
            if (entity instanceof Bullet && entity.source === "enemy") {
                if (this.collides(entity)) {
                    this.colliding = true;
                    break;
                }
            }
        }

        return this;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "#ccc";
        ctx.strokeStyle = "#000";

        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = this.colliding ? "#f00" : "#0ff";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
