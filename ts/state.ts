export type StateMessage = "menu" | "menu->stage1" | "gameover";

export const state: {
    win: boolean;
    scene: string;
    character: "david" | "trevor" | "cotton";
    difficulty: number;
    advance: (message: StateMessage) => void;
    renderScene?: () => void;

    score: number;
    power: number;
    bombs: number;
    lives: number;

    stop_bullets: boolean;
} = {
    win: false,
    scene: "loading",
    character: "david",
    difficulty: 1,
    advance: () => {},

    score: 0,
    power: 0,
    bombs: 0,
    lives: 0,

    stop_bullets: false,
};
