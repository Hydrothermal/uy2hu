import { initResources } from "./content/resources.js";
import { initGame } from "./game.js";

async function start() {
    await initResources();
    initGame();
}

start();
