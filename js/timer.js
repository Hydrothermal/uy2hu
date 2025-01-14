export let game_time = 0;
export function setGameTime(time) {
    game_time = time;
}
export class Timer {
    delay;
    fn;
    repeat;
    drift = 0;
    start = game_time;
    end;
    iter = 0;
    constructor(delay, fn, repeat = false) {
        this.delay = delay;
        this.fn = fn;
        this.repeat = repeat;
        this.end = this.start + delay;
        Timer.timers.add(this);
    }
    static timers = new Set();
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
                if (typeof this.repeat === "number" &&
                    this.iter === this.repeat) {
                    this.destroy();
                }
            }
            else {
                this.destroy();
            }
        }
    }
}
