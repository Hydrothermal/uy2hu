import { Motion } from "../motion.js";
import { HEIGHT, keyboard, GAME_WIDTH, HALF } from "../interface.js";
import { Entity } from "./entity.js";
import { DEG_TO_RAD, RAD_TO_DEG } from "../util.js";
import {
    Bullet,
    BulletSpawner,
    BulletSpawnerTemplate,
    BulletTemplate,
} from "./bullet.js";
import {
    cotton_bullets,
    david_bullets,
    trevor_bullets,
} from "../content/bullet_patterns.js";
import { images, playSound } from "../content/resources.js";
import { state } from "../state.js";
import { Timer } from "../timer.js";

const SPEED = {
    david: 240,
    trevor: 190,
    cotton: 280,
};

const spawners = {
    david: new BulletSpawnerTemplate(david_bullets),
    trevor: new BulletSpawnerTemplate(trevor_bullets),
    cotton: new BulletSpawnerTemplate(cotton_bullets),
};

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

    public state: "inactive" | "active" | "respawning" = "inactive";
    public is_player = true;
    public motion: Motion = new Motion({
        angle: 0,
        speed: 0,
        parent: this,
    });
    public tilt = 0;
    public opacity = 0;
    public spawner?: BulletSpawner;

    constructor() {
        const size = 5;
        super(HALF, HEIGHT - 100, size);
    }

    get active() {
        return this.state === "active";
    }

    activate() {
        if (!this.active) {
            this.state = "active";
            this.spawner = spawners[state.character].spawn(
                bullet_template,
                this,
                270
            );
        }
    }

    deactivate() {
        if (this.state === "active") {
            this.state = "inactive";
            this.spawner?.destroy();
        }
    }

    die() {
        this.deactivate();
        playSound("death");

        if (state.lives > 0) {
            state.lives--;

            new Timer(1000, () => {
                this.x = HALF;
                this.y = HEIGHT - 100;
                this.opacity = 0.05;
                this.state = "respawning";
                playSound("respawn");
            });

            new Timer(4000, () => {
                this.activate();
            });
        } else {
            state.win = false;
            state.advance("gameover");
        }
    }

    update(dt: number) {
        super.update(dt);

        if (this.state === "inactive") {
            this.motion.speed = 0;
            this.tilt = 0;
            return this;
        }

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
            this.motion.speed = SPEED[state.character];
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
        if (this.active && !state.invincible) {
            for (const entity of Entity.entities) {
                if (entity instanceof Bullet && entity.source === "enemy") {
                    if (this.collides(entity)) {
                        this.die();
                        break;
                    }
                }
            }
        }

        // fade in
        if (this.opacity < 1) {
            const speed = this.state === "respawning" ? 6000 : 800;
            this.opacity = Math.min(1, this.opacity + dt / speed);
        }

        return this;
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.state === "inactive") {
            return;
        }

        ctx.globalAlpha = this.opacity;

        ctx.rotated(this.x, this.y, this.tilt, () => {
            ctx.drawImage(images[state.character], -30, -50);
        });

        ctx.fillStyle = this.state === "respawning" ? "#fee" : "#6ff";
        ctx.strokeStyle = "#0aa";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.filter = "blur(2px)";
        ctx.fill();
        ctx.filter = "none";
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

export function initPlayer() {
    Entity.player = new Player();
    (window as any).player = Entity.player;
}
