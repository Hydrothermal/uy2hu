import { Motion } from "../motion.js";
import { HEIGHT, keyboard, WIDTH } from "../interface.js";
import { Entity } from "./entity.js";
import { DEG_TO_RAD, RAD_TO_DEG } from "../util.js";
import { Bullet, BulletSpawnerTemplate, BulletTemplate } from "./bullet.js";
import { player_bullets } from "../content/bullet_patterns.js";
import { images } from "../content/resources.js";

const spawner = new BulletSpawnerTemplate([player_bullets]);
const bullet_template = new BulletTemplate({
    color: "#6f6",
    opacity: 0.8,
    size: 1,
    layer: 14,
});
bullet_template.source = "player";

export class Player extends Entity {
    public layer = 15;
    public graze = 1;

    public active = false;
    public speed = 200;
    public is_player = true;
    public motion: Motion = new Motion({
        angle: 0,
        speed: 0,
        parent: this,
    });
    public colliding = false;
    public tilt = 0;

    constructor() {
        const size = 5;
        super(WIDTH / 2, HEIGHT - 50, size);
    }

    activate() {
        this.active = true;
        spawner.spawn(bullet_template, this, 270);
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

        // tilt
        const max_tilt = 15;
        const tilt_strength = 0.3;

        if (x > 0) {
            this.tilt = Math.min(max_tilt, this.tilt + dt * tilt_strength);
        } else if (x < 0) {
            this.tilt = Math.max(-max_tilt, this.tilt - dt * tilt_strength);
        } else {
            this.tilt -= Math.sign(this.tilt);
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
        if (this.active) {
            ctx.rotated(this.x, this.y, this.tilt, () => {
                ctx.drawImage(images.david, -25, -40);
            });

            ctx.fillStyle = this.colliding ? "#f00" : "#6ff";
            ctx.strokeStyle = "#0aa";
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.filter = "blur(2px)";
            ctx.fill();
            ctx.filter = "none";
            ctx.stroke();
        }
    }
}

export function initPlayer() {
    Entity.player = new Player();
}
