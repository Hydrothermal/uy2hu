import { ctx, HEIGHT, onKey, WIDTH } from "../../interface.js";
import { state } from "../../state.js";

function render() {
    ctx.fillStyle = "#000";
    ctx.font = "bold 40px 'Comic Sans MS'";
    ctx.textAlign = "center";
    ctx.fillText("game over", WIDTH / 2, 200);

    if (state.win) {
        ctx.fillText("you won!", WIDTH / 2, 250);
    } else {
        ctx.fillText("you lost :(", WIDTH / 2, 250);
    }

    ctx.font = "38px 'Comic Sans MS'";
    ctx.fillText(`score: ${state.score}`, WIDTH / 2, 400);

    const time_score = Math.floor(state.playtime / 1000);
    ctx.fillText(`time penalty: -${time_score}`, WIDTH / 2, 440);

    const lives_score = state.lives * 100;
    ctx.fillText(`life bonus: +${lives_score}`, WIDTH / 2, 480);

    ctx.font = "bold 40px 'Comic Sans MS'";
    const total_score = state.score + time_score + lives_score;
    ctx.fillText(`final score: ${total_score}`, WIDTH / 2, 540);
}

export async function gameover() {
    state.scene = "gameover";
    state.renderScene = render;
}

onKey((key) => {
    if (state.scene === "gameover") {
        if (key === "enter" || key === " ") {
            state.advance("menu");
        }
    }
});
