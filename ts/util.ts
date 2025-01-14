export type Props<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

// math stuff
export type Angle = number & { __type?: "angle" };
export type Length = number & { __type?: "length" };
export type Vector = [Angle, Length];
export type Point = { x: number; y: number };

export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

export function randRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function angleTo(a: Point, b: Point): Angle {
    const angle_rads = Math.atan2(a.x - b.x, b.y - a.y);
    return angle_rads * RAD_TO_DEG + 90;
}

export function distanceTo(a: Point, b: Point): Length {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

export function vectorTo(a: Point, b: Point): Vector {
    return [angleTo(a, b), distanceTo(a, b)];
}

export function pad(n: number | string, len = 2) {
    return `0${n}`.slice(-len);
}
