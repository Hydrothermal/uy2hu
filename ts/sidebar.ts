import { images } from "./content/resources.js";
import { Enemy } from "./entities/enemy.js";
import { Entity } from "./entities/entity.js";
import { ctx, GAME_WIDTH, WIDTH as FULL_WIDTH, HEIGHT } from "./interface.js";
import { state } from "./state.js";

const WIDTH = FULL_WIDTH - GAME_WIDTH;
const LEFT = GAME_WIDTH + 7;

const SCORE_Y = 10;
const TIMER_Y = SCORE_Y + 80;
const POWER_Y = TIMER_Y + 80;
const BOMBS_Y = POWER_Y + 80;
const LIVES_Y = BOMBS_Y + 160;

export function renderSidebar() {
    ctx.drawImage(images.sidebar, GAME_WIDTH - 6, 0);

    // boss hp
    const boss = Array.from(Entity.entities).find(
        (e) => e instanceof Enemy && e.template.boss
    ) as Enemy;

    if (boss) {
        const frac = boss.hp / boss.maxhp;
        ctx.fillStyle = boss.phase2 ? "#f00" : "#c39";
        ctx.fillRect(0, 0, GAME_WIDTH * frac, 8);
    }

    // headers
    ctx.font = "bold 28px 'Comic Sans MS'";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.fillText("score", LEFT, SCORE_Y);
    ctx.fillText("time", LEFT, TIMER_Y);
    ctx.fillText("power", LEFT, POWER_Y);
    ctx.fillText("bombs", LEFT, BOMBS_Y);
    ctx.fillText("lives", LEFT, LIVES_Y);

    ctx.font = "20px 'Comic Sans MS'";
    ctx.fillText(state.score.toString(), LEFT, SCORE_Y + 35);

    const time = (state.playtime / 1000).toFixed(2);
    ctx.fillText(`${time}s`, LEFT, TIMER_Y + 35);

    ctx.fillText(`${state.power}%`, LEFT, POWER_Y + 35);

    // bombs
    for (let i = 0; i < state.bombs; i++) {
        const x = 48 * (i % 3);
        const y = Math.floor(i / 3) * 60;

        ctx.drawImage(images.card, LEFT + x, BOMBS_Y + 30 + y);
    }

    // lives
    for (let i = 0; i < state.lives; i++) {
        const x = 47 * (i % 3);
        const y = Math.floor(i / 3) * 45;

        ctx.drawImage(images.life, LEFT + x, LIVES_Y + 30 + y);
    }

    if (state.lives === 0) {
        ctx.fillText("last chance!", LEFT, LIVES_Y + 35);
    }
}
