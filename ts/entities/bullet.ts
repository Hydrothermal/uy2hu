import { Motion } from "../motion.js";
import { Timer } from "../timer.js";
import { Angle, angleTo, Point, Props } from "../util.js";
import { Entity } from "./entity.js";

export class BulletTemplate {
    public source: "enemy" | "player" = "enemy";
    public color = "#fff";
    public opacity = 1;
    public size = 5;
    public layer?: number;

    constructor(options: Partial<Props<BulletTemplate>>) {
        Object.assign(this, options);
    }
}

export class Bullet extends Entity {
    public layer = 20;

    constructor(
        public template: BulletTemplate,
        public x: number,
        public y: number,
        public motion: Motion,
        public size = template.size
    ) {
        super(x, y, size);
        motion.attach(this);

        if (template.layer) {
            this.layer = template.layer;
        }
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
    speed?: number;
    rays?: number;
    waves?: number;
    interval?: number;
    targeted?: true;

    patterns?: SpawnPattern[];
    bullets?: {
        angle?: Angle;
        offset?: number;
        size?: number;
        speed?: number;
    }[];
};

export class BulletSpawnerTemplate {
    public timers: WeakRef<Timer>[] = [];

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
            const timer = new Timer(
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

            this.timers.push(new WeakRef(timer));
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

            if (pattern.patterns) {
                for (const subpattern of pattern.patterns) {
                    this.spawnPattern(
                        subpattern,
                        template,
                        origin,
                        angle,
                        speed,
                        drift
                    );
                }
            } else if (pattern.bullets) {
                for (const bullet of pattern.bullets) {
                    const b = new Bullet(
                        template,
                        origin.x + (bullet.offset || 0),
                        origin.y,
                        new Motion({
                            angle: angle + (bullet.angle || 0),
                            speed: speed * (bullet.speed || 1),
                        })
                    ).update(drift);

                    if (bullet.size) {
                        b.size *= bullet.size;
                    }
                }
            }
        }
    }

    spawn(template: BulletTemplate, origin: Point, facing: Angle, drift = 0) {
        for (const pattern of this.patterns) {
            this.spawnPattern(
                pattern,
                template,
                origin,
                facing,
                pattern.speed || 0,
                drift
            );
        }
    }

    destroy() {
        for (const timer of this.timers) {
            timer.deref()?.destroy();
        }
    }
}

export class BulletSpawner {
    constructor(
        public template: BulletSpawnerTemplate,
        public origin: Point,
        public facing: Angle
    ) {}

    spawn(drift = 0) {}
}
