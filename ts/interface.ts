import { images } from "./content/resources.js";

const $ = document.querySelector.bind(document);

export const WIDTH = 600;
export const HEIGHT = 800;
export const canvas = $("#canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d")!;
export const keyboard = new Set<string>();

const key_listeners: ((key: string) => void)[] = [];

export function onKey(callback: (key: string) => void) {
    key_listeners.push(callback);
}

const decals = new Set<HTMLImageElement>();

export function addDecal(image: keyof typeof images, x: number, y: number) {
    const node = images[image].cloneNode() as HTMLImageElement;

    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.className = image;

    decals.add(node);
    $("#decals")?.appendChild(node);
}

export function wipeDecals() {
    for (const node of document.querySelectorAll("#decals img")) {
        node.remove();
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    keyboard.add(key);

    for (const fn of key_listeners) {
        fn(key);
    }
});

document.addEventListener("keyup", (event) => {
    keyboard.delete(event.key.toLowerCase());
});

// set canvas dimensions
canvas.width = WIDTH;
canvas.height = HEIGHT;
