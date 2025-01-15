export let game_time = 0;

export function setGameTime(time: number) {
    game_time = time;
}

export class Timer {
    public drift = 0;
    public start = game_time;
    public end: number;
    public iter = 0;

    constructor(
        public delay: number,
        public fn: (drift: number) => any,
        public repeat: boolean | number = false
    ) {
        this.end = this.start + delay;
        Timer.timers.add(this);
    }

    static timers = new Set<Timer>();

    destroy() {
        Timer.timers.delete(this);
    }

    update() {
        if (game_time >= this.end) {
            this.iter++;
            this.drift = game_time - this.end;
            this.fn(this.drift);

            if (this.repeat) {
                this.end += this.delay;

                if (
                    typeof this.repeat === "number" &&
                    this.iter === this.repeat
                ) {
                    this.destroy();
                }
            } else {
                this.destroy();
            }
        }
    }
}

export function delay(ms: number) {
    return new Promise((resolve, reject) => {
        new Timer(ms, resolve);
    });
}
