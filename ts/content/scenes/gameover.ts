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
