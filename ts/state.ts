export type StateMessage = "loading->menu" | "menu->stage1";

export const state: {
    scene: string;
    character: "david" | "trevor" | "cotton";
    difficulty: number;
    advance: (message: StateMessage) => void;
    renderScene?: () => void;
} = {
    scene: "loading",
    character: "david",
    difficulty: 1,
    advance: () => {},
};
