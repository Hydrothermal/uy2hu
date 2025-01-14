import { SpawnPattern } from "../entities/bullet.js";

const chain_shot: SpawnPattern = {
    waves: Infinity,
    interval: 2000,
    targeted: true,
    pattern: {
        rays: 1,
        bullets: [
            { angle: 0, size: 8, speed: 1.0 },
            { angle: 0, size: 8, speed: 1.1 },
            { angle: 0, size: 8, speed: 1.2 },
            { angle: 0, size: 8, speed: 1.3 },
            { angle: 0, size: 8, speed: 1.4 },
        ],
    },
};

const triangle_spread: SpawnPattern = {
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
