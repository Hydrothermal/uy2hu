import { SpawnPattern } from "../entities/bullet.js";

export const player_bullets: SpawnPattern = {
    waves: Infinity,
    interval: 50,
    speed: 500,
    patterns: [
        {
            startAngle: -10,
            endAngle: 10,
            rays: 4,
            bullets: [{ angle: 0, size: 2 }],
        },
        {
            bullets: [
                { angle: 0, size: 2, offset: -4 },
                { angle: 0, size: 2, offset: +4 },
            ],
        },
    ],
};

export const chain_shot: SpawnPattern = {
    rays: 1,
    bullets: [
        { angle: 0, speed: 1.0 },
        { angle: 0, speed: 1.1 },
        { angle: 0, speed: 1.2 },
        { angle: 0, speed: 1.3 },
        { angle: 0, speed: 1.4 },
    ],
};

export const triangle_spread: SpawnPattern = {
    startAngle: 0,
    endAngle: 360,
    rays: 10,
    bullets: [
        {
            angle: -6,
            size: 4,
            speed: 0.91,
        },
        {
            angle: -4,
            size: 4,
            speed: 0.94,
        },
        {
            angle: -2,
            size: 4,
            speed: 0.97,
        },
        {
            angle: 0,
            size: 4,
            speed: 1,
        },
        {
            angle: 2,
            size: 4,
            speed: 0.97,
        },
        {
            angle: 4,
            size: 4,
            speed: 0.94,
        },
        {
            angle: 6,
            size: 4,
            speed: 0.91,
        },
    ],
};
