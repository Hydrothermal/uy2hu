const $ = document.querySelector.bind(document);

export const WIDTH = 500;
export const HEIGHT = 800;
export const canvas = $("#canvas") as HTMLCanvasElement;
export const keyboard = new Set<string>();

document.addEventListener("keydown", (event) => {
    keyboard.add(event.key.toLowerCase());
});

document.addEventListener("keyup", (event) => {
    keyboard.delete(event.key.toLowerCase());
});

// set canvas dimensions
canvas.width = WIDTH;
canvas.height = HEIGHT;
