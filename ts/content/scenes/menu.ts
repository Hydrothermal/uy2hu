import { addDecal, ctx, onKey, WIDTH, wipeDecals } from "../../interface.js";
import { state } from "../../state.js";
import { images, playMusic, playSound } from "../resources.js";

const MENU_Y = 200;
const CHAR_SELECT_Y = MENU_Y + 70;
const DIFF_SELECT_Y = CHAR_SELECT_Y + 240;
const START_BUTTON_Y = DIFF_SELECT_Y + 150;

const menu_cols = [4, 3, 3];
// const menu_selections: number[] = [];
// let menu_cursor = { row: 0, col: 0 };

// auto select
const menu_selections: number[] = [0, 0];
let menu_cursor = { row: 2, col: 0 };

let no_sara = false;
let disabled = false;

function drawDifficulty(
    color: string,
    text1: string,
    text2: string,
    x: number
) {
    ctx.fillStyle = color;

    ctx.font = "24px 'Comic Sans MS'";
    ctx.fillText(text1, x, DIFF_SELECT_Y);

    ctx.font = "18px 'Comic Sans MS'";
    ctx.fillText(`(${text2})`, x, DIFF_SELECT_Y + 30);
}

function menuSelect() {
    const { row, col } = menu_cursor;

    if (row === 0) {
        switch (col) {
            case 0:
                state.character = "david";
                break;

            case 1:
                playSound("imposed");
                no_sara = true;
                return;

            case 2:
                state.character = "trevor";
                break;

            case 3:
                state.character = "cotton";
                break;
        }
    } else if (row === 1) {
        state.difficulty = col + 1;
    } else if (row === 2) {
        if (
            menu_selections[0] === undefined ||
            menu_selections[1] === undefined
        ) {
            playSound("imposed");
        } else {
            playSound("guh_dong");

            // setTimeout(() => {
            state.advance("menu->stage1");
            disabled = true;
            // }, 400);
        }

        return;
    }

    playSound("click");
    menu_selections[row] = col;
}

function menuKey(key: string) {
    const { row: old_row, col: old_col } = menu_cursor;

    if (key === "q") {
        playMusic("menu");
    }

    if (key === "a" || key === "arrowleft") {
        menu_cursor.col--;
    }

    if (key === "d" || key === "arrowright") {
        menu_cursor.col++;
    }

    if (key === "w" || key === "arrowup") {
        menu_cursor.row--;
    }

    if (key === "s" || key === "arrowdown") {
        menu_cursor.row++;
    }

    if (key === "enter" || key === " ") {
        menuSelect();
    }

    menu_cursor.col = Math.max(0, menu_cursor.col);
    menu_cursor.row = Math.max(0, menu_cursor.row);

    menu_cursor.row = Math.min(menu_cols.length - 1, menu_cursor.row);
    menu_cursor.col = Math.min(menu_cols[menu_cursor.row] - 1, menu_cursor.col);

    if (old_row !== menu_cursor.row || old_col !== menu_cursor.col) {
        playSound("touch");
    }
}

function render() {
    const [s_char, s_difficulty] = menu_selections;

    ctx.drawImage(images.controls, WIDTH - images.controls.width, 0);

    // headers
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = "bold 30px 'Comic Sans MS'";
    ctx.fillText("select character:", WIDTH / 2, CHAR_SELECT_Y - 70);
    ctx.fillText("select difficulty:", WIDTH / 2, DIFF_SELECT_Y - 70);

    // character select
    ctx.globalAlpha = s_char === 0 ? 1 : 0.65;
    ctx.drawImage(images.david_face, 40, CHAR_SELECT_Y);

    ctx.globalAlpha = 0.65;
    ctx.drawImage(
        no_sara ? images.sara_face_2 : images.sara_face,
        140 + 40,
        CHAR_SELECT_Y
    );

    ctx.globalAlpha = s_char === 2 ? 1 : 0.65;
    ctx.drawImage(images.trevor_face, 140 * 2 + 40, CHAR_SELECT_Y);

    ctx.globalAlpha = s_char === 3 ? 1 : 0.65;
    ctx.drawImage(images.cotton_face, 140 * 3 + 40, CHAR_SELECT_Y);

    ctx.globalAlpha = 1;

    // difficulty select
    ctx.font = "24px 'Comic Sans MS'";
    drawDifficulty(
        s_difficulty === 0 ? "#080" : "#444",
        "apprentice",
        "easy",
        125
    );
    drawDifficulty(
        s_difficulty === 1 ? "#b50" : "#444",
        "mercy",
        "medium",
        300
    );
    drawDifficulty(s_difficulty === 2 ? "#a00" : "#444", "harry", "hard", 475);

    // start button
    if (s_char === undefined || s_difficulty === undefined) {
        ctx.filter = "brightness(0.8)";
        ctx.globalAlpha = 0.7;
    }

    ctx.drawCentered(images.start_button, WIDTH / 2, START_BUTTON_Y);
    ctx.filter = "none";
    ctx.globalAlpha = 1;

    // cursors
    switch (menu_cursor.row) {
        case 0:
            ctx.drawCentered(images.arrow_right, 26, CHAR_SELECT_Y + 50);
            ctx.drawCentered(
                images.arrow_down,
                90 + 140 * menu_cursor.col,
                CHAR_SELECT_Y - 20
            );
            break;

        case 1:
            ctx.drawCentered(images.arrow_right, 40, DIFF_SELECT_Y + 15);
            ctx.drawCentered(
                images.arrow_down,
                125 + 175 * menu_cursor.col,
                DIFF_SELECT_Y - 20
            );
            break;

        case 2:
            ctx.drawCentered(images.arrow_right, 200, START_BUTTON_Y);
            break;
    }
}

export function menu() {
    state.scene = "menu";
    state.renderScene = render;
    disabled = false;
    addDecal("logo", 15, 15);
}

onKey((key) => {
    if (state.scene === "menu" && !disabled) {
        menuKey(key);
    }
});
