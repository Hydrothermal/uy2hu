export const game_scenes = ["stage1", "stage2", "stage3"];
export const scenes = [
    "loading",
    "menu",
    "stage1",
    "stage2",
    "stage3",
    "gameover",
] as const;
export type Scene = (typeof scenes)[number];
export type StateMessage =
    | "init"
    | "menu"
    | "stage1"
    | "stage2"
    | "stage3"
    | "bossdead"
    | "gameover";

export const state: {
    win: boolean;
    running: boolean;
    scene: Scene;
    character: "david" | "trevor" | "cotton";
    difficulty: number;
    advance: (message: StateMessage) => void;
    renderScene?: () => void;
    inGame: () => boolean;

    playtime: number;
    score: number;
    power: number;
    bombs: number;
    lives: number;

    invincible: boolean;
    dmg_boost: boolean;
    stop_bullets: boolean;
} = {
    win: false,
    running: false,
    scene: "loading",
    character: "david",
    difficulty: 1,
    advance: () => {},
    inGame: () => {
        return game_scenes.includes(state.scene);
    },

    playtime: 0,
    score: 0,
    power: 0,
    bombs: 0,
    lives: 0,

    invincible: false,
    dmg_boost: false,
    stop_bullets: false,
};
