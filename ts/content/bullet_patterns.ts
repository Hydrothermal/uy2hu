import { SpawnPattern } from "../entities/bullet.js";

// player patterns
export const david_bullets: SpawnPattern[] = [
    {
        waves: Infinity,
        interval: 150,
        speed: 700,
        patterns: [
            {
                startAngle: -12,
                endAngle: 12,
                rays: 4,
                bullets: [{ size: 3 }],
            },
        ],
    },
    {
        waves: Infinity,
        interval: 50,
        speed: 500,
        patterns: [
            {
                startAngle: -3,
                endAngle: 3,
                rays: 3,
                bullets: [{ size: 2, offset: 0 }],
            },
        ],
    },
    {
        waves: Infinity,
        interval: 50,
        speed: 500,
        patterns: [
            {
                startAngle: -10,
                endAngle: 10,
                rays: 2,
                bullets: [{ size: 2, offset: 0 }],
            },
        ],
    },
];

export const trevor_bullets: SpawnPattern[] = [
    {
        waves: Infinity,
        interval: 50,
        speed: 500,
        patterns: [
            {
                startAngle: -10,
                endAngle: 10,
                rays: 4,
                bullets: [{ size: 2 }],
            },
            {
                bullets: [
                    { size: 2, offset: -4 },
                    { size: 2, offset: +4 },
                ],
            },
        ],
    },
    {
        waves: Infinity,
        interval: 150,
        speed: 500,
        patterns: [
            {
                startAngle: -25,
                endAngle: 25,
                rays: 2,
                bullets: [{ size: 6 }],
            },
        ],
    },
];

export const cotton_bullets: SpawnPattern[] = [
    {
        waves: Infinity,
        interval: 40,
        speed: 600,
        patterns: [
            {
                startAngle: -1,
                endAngle: 1,
                rays: 2,
                bullets: [{ size: 1 }],
            },
            {
                bullets: [
                    { angle: -1, size: 2, offset: -8, speed: 1.2 },
                    { size: 2, offset: -3 },
                    { size: 2, offset: +3 },
                    { angle: +1, size: 2, offset: +8, speed: 1.2 },
                ],
            },
        ],
    },
];

// enemy patterns
export const single: SpawnPattern = {
    bullets: [{ angle: 0 }],
};

export const triple: SpawnPattern = {
    startAngle: -10,
    endAngle: 10,
    rays: 3,
    bullets: [{ angle: 0 }],
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

export const arrow_burst: SpawnPattern = {
    startAngle: 0,
    endAngle: 360,
    rays: 10,
    bullets: [
        {
            angle: -6,
            speed: 0.91,
        },
        {
            angle: -4,
            speed: 0.94,
        },
        {
            angle: -2,
            speed: 0.97,
        },
        {
            angle: 0,
            speed: 1,
        },
        {
            angle: 2,
            speed: 0.97,
        },
        {
            angle: 4,
            speed: 0.94,
        },
        {
            angle: 6,
            speed: 0.91,
        },
    ],
};
