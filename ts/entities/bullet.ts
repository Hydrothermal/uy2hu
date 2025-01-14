import { Motion } from "../motion.js";
import { Timer } from "../timer.js";
import { Angle, angleTo, Point } from "../util.js";
import { Entity } from "./entity.js";

export class BulletTemplate {
    public source: "enemy" | "player" = "enemy";
    constructor(public color: string, public opacity = 1) {}
}

export class Bullet extends Entity {
    public layer = 20;

    constructor(
        public x: number,
        public y: number,
        public size: number,
        public template: BulletTemplate,
        public motion: Motion
    ) {
        super(x, y, size);
        motion.attach(this);
    }

    get source() {
        return this.template.source;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.template.opacity;
        ctx.fillStyle = this.template.color;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

        ctx.globalAlpha = this.template.opacity * 0.8;
        ctx.stroke();

        ctx.globalAlpha = 1;
    }
}

export type SpawnPattern = {
    startAngle?: Angle;
    endAngle?: Angle;
    rays?: number;
    waves?: number;
    interval?: number;
    pattern?: SpawnPattern;
    targeted?: true;
    bullets?: {
        angle: Angle;
        size: number;
        speed: number;
        offset?: number;
    }[];
};

export class BulletSpawner {
    constructor(public patterns: SpawnPattern[]) {}

    spawnPattern(
        pattern: SpawnPattern,
        template: BulletTemplate,
        origin: Point,
        facing: Angle,
        speed: number,
        drift = 0
    ) {
        if (pattern.waves && pattern.interval) {
            new Timer(
                pattern.interval,
                (drift) => {
                    this.spawnPatternWave(
                        pattern,
                        template,
                        origin,
                        facing,
                        speed,
                        drift
                    );
                },
                pattern.waves
            );
        } else {
            this.spawnPatternWave(
                pattern,
                template,
                origin,
                facing,
                speed,
                drift
            );
        }
    }

    spawnPatternWave(
        pattern: SpawnPattern,
        template: BulletTemplate,
        origin: Point,
        facing: Angle,
        speed: number,
        drift = 0
    ) {
        const startAngle = pattern.startAngle || 0;
        const endAngle = pattern.endAngle || 0;
        const rays = pattern.rays || 1;

        if (pattern.targeted) {
            facing = angleTo(origin, Entity.player);
        }

        // calculate cluster angles
        const pattern_arc = endAngle - startAngle;
        let interval_count = rays - 1;

        if (pattern_arc % 360 === 0) {
            interval_count++;
        }

        const interval = pattern_arc / interval_count;

        // fire rays
        for (let i = 0; i < rays; i++) {
            const angle = facing + startAngle + interval * i;

            if (pattern.pattern) {
                this.spawnPattern(
                    pattern.pattern,
                    template,
                    origin,
                    angle,
                    speed,
                    drift
                );
            } else if (pattern.bullets) {
                for (const bullet of pattern.bullets) {
                    const b = new Bullet(
                        origin.x + (bullet.offset || 0),
                        origin.y,
                        bullet.size,
                        template,
                        new Motion({
                            angle: angle + bullet.angle,
                            speed: speed * bullet.speed,
                        })
                    ).update(drift);
                }
            }
        }
    }

    spawn(
        template: BulletTemplate,
        origin: Point,
        facing: Angle,
        speed: number,
        drift = 0
    ) {
        for (const pattern of this.patterns) {
            this.spawnPattern(pattern, template, origin, facing, speed, drift);
        }
    }
}
