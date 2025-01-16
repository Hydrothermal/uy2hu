import { images } from "./content/resources.js";
import { ctx, GAME_WIDTH, WIDTH as FULL_WIDTH, HEIGHT } from "./interface.js";
import { state } from "./state.js";

const WIDTH = FULL_WIDTH - GAME_WIDTH;
const LEFT = GAME_WIDTH + 7;

const SCORE_Y = 10;
const POWER_Y = SCORE_Y + 110;
const BOMBS_Y = POWER_Y + 110;
const LIVES_Y = BOMBS_Y + 140;

export function renderSidebar() {
    // border
    // ctx.strokeStyle = "#000";
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(GAME_WIDTH, 0);
    // ctx.lineTo(GAME_WIDTH, HEIGHT);
    // ctx.stroke();
    // ctx.translate(-0.5, -0.5);
    ctx.drawImage(images.sidebar, GAME_WIDTH - 6, 0);

    // headers
    ctx.font = "bold 28px 'Comic Sans MS'";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.fillText("score", LEFT, SCORE_Y);
    ctx.fillText("power", LEFT, POWER_Y);
    ctx.fillText("bombs", LEFT, BOMBS_Y);
    ctx.fillText("lives", LEFT, LIVES_Y);

    ctx.font = "20px 'Comic Sans MS'";
    ctx.fillText(state.score.toString(), LEFT, SCORE_Y + 35);
    ctx.fillText(`${state.power}%`, LEFT, POWER_Y + 35);

    // bombs
    for (let i = 0; i < state.bombs; i++) {
        ctx.drawImage(images.card, LEFT + 48 * i, BOMBS_Y + 30);
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
