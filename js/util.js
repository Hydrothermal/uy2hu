export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export function randRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function angleTo(a, b) {
    const angle_rads = Math.atan2(a.x - b.x, b.y - a.y);
    return angle_rads * RAD_TO_DEG + 90;
}
export function distanceTo(a, b) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}
export function vectorTo(a, b) {
    return [angleTo(a, b), distanceTo(a, b)];
}
export function pad(n, len = 2) {
    return `0${n}`.slice(-len);
}
