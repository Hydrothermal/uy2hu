import { wipeEntities } from "../../entities/entity.js";
import { ctx, HEIGHT, onKey, WIDTH, wipeDecals } from "../../interface.js";
import { state } from "../../state.js";
import { Timer } from "../../timer.js";
import { playMusic, playSound } from "../resources.js";

const HEADER_Y = 150;
const SCORE_Y = HEADER_Y + 150;
const TIME_Y = SCORE_Y + 40;
const LIVES_Y = TIME_Y + 40;
const DIFFICULTY_Y = LIVES_Y + 40;
const FINAL_Y = DIFFICULTY_Y + 100;

function render() {
    ctx.fillStyle = "#000";
    ctx.font = "bold 40px 'Comic Sans MS'";
    ctx.textAlign = "center";
    ctx.fillText("game over", WIDTH / 2, HEADER_Y);

    if (state.win) {
        ctx.fillText("you won!", WIDTH / 2, HEADER_Y + 50);
    } else {
        ctx.fillText("you lost :(", WIDTH / 2, HEADER_Y + 50);
    }

    ctx.font = "38px 'Comic Sans MS'";
    ctx.fillText(`score: ${state.score}`, WIDTH / 2, SCORE_Y);

    const time_score = Math.floor(state.playtime / 1000);
    ctx.fillText(`time penalty: -${time_score}`, WIDTH / 2, TIME_Y);

    const lives_score = state.lives * 1000;
    ctx.fillText(`life bonus: +${lives_score}`, WIDTH / 2, LIVES_Y);

    const diff_score = 1 + (state.difficulty - 1) / 4;
    ctx.fillText(`difficulty bonus: x${diff_score}`, WIDTH / 2, DIFFICULTY_Y);

    ctx.font = "bold 40px 'Comic Sans MS'";
    const total_score = Math.ceil(
        (state.score - time_score + lives_score) * diff_score
    );
    ctx.fillText(`final score: ${total_score}`, WIDTH / 2, FINAL_Y);
}

export async function gameover() {
    state.scene = "gameover";
    state.renderScene = render;

    wipeEntities();
    wipeDecals();

    for (const timer of Timer.timers) {
        timer.destroy();
    }

    if (state.win) {
        playMusic("win");
    } else {
        playMusic("lose");
    }
}

onKey((key) => {
    if (state.scene === "gameover") {
        if (key === "enter" || key === " ") {
            state.advance("menu");
        }
    }
});
