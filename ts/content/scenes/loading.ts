import { ctx, HEIGHT, onKey, WIDTH } from "../../interface.js";
import { state } from "../../state.js";

function render() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 40px 'Comic Sans MS'";
    ctx.textAlign = "center";
    ctx.fillText("press any key", WIDTH / 2, HEIGHT / 2);
}

export function loading() {
    state.scene = "loading";
    state.renderScene = render;
}

onKey((key) => {
    if (state.scene === "loading") {
        state.advance("menu");
    }
});
