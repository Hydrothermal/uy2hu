import { playSound } from "./content/resources.js";
import { Bullet } from "./entities/bullet.js";
import { Entity } from "./entities/entity.js";
import { addDecal } from "./interface.js";
import { state } from "./state.js";
import { Timer } from "./timer.js";

export function useBomb() {
    if (state.bombs > 0) {
        state.bombs--;
        state.stop_bullets = true;

        playSound("bomb");
        addDecal("fray", 0, 0);

        new Timer(500, () => {
            state.stop_bullets = false;
        });

        for (const entity of Entity.entities) {
            if (entity instanceof Bullet && entity.source === "enemy") {
                entity.destroy();
            }
        }
    }
}
