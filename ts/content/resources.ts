export const images = {
    // menu
    logo: new Image(),
    controls: new Image(),
    arrow_right: new Image(),
    arrow_down: new Image(),
    start_button: new Image(),

    // sidebar
    sidebar: new Image(),
    life: new Image(),
    card: new Image(),

    // characters
    david: new Image(),
    david_face: new Image(),
    trevor: new Image(),
    trevor_face: new Image(),
    cotton: new Image(),
    cotton_face: new Image(),
    sara_face: new Image(),
    sara_face_2: new Image(),

    // enemies
    enemy_goblin: new Image(),
    enemy_goblin_wizard: new Image(),
    enemy_lizard: new Image(),
    enemy_pixie: new Image(),
    enemy_shade: new Image(),
    enemy_mummy: new Image(),
    enemy_frog: new Image(),
    enemy_frog_harry: new Image(),
    enemy_topfrog: new Image(),

    // bosses
    enemy_cube: new Image(),
    enemy_cube_2: new Image(),
    enemy_golem: new Image(),
    enemy_golem_2: new Image(),
    enemy_harry: new Image(),
    enemy_harry_2: new Image(),

    pop: new Image(),
    coin: new Image(),
    fray: new Image(),
};

export const bgm = {
    boss1: new Audio(),
    boss2: new Audio(),
    boss3: new Audio(),
    menu: new Audio(),
    stage1: new Audio(),
    stage2: new Audio(),
    stage3: new Audio(),
    win: new Audio(),
    lose: new Audio(),
};

const audioContext = new AudioContext();
const sfx = {
    good_job: null as AudioBuffer | null,
    imposed: null as AudioBuffer | null,
    click: null as AudioBuffer | null,
    touch: null as AudioBuffer | null,
    guh_dong: null as AudioBuffer | null,
    bomb: null as AudioBuffer | null,
    coin: null as AudioBuffer | null,
    kill: null as AudioBuffer | null,
    respawn: null as AudioBuffer | null,
    death: null as AudioBuffer | null,
    oneup: null as AudioBuffer | null,
};

let playing_bgm: HTMLAudioElement | null = null;

function loadImage(name: keyof typeof images) {
    return new Promise((resolve, reject) => {
        images[name].src = `img/${name}.${name === "logo" ? "gif" : "png"}`;
        images[name].addEventListener("load", resolve);
    });
}

function loadMusic(name: keyof typeof bgm) {
    return new Promise((resolve, reject) => {
        bgm[name].src = `bgm/${name}.mp3`;
        bgm[name].addEventListener("canplaythrough", resolve);
    });
}

async function loadSfx(path: string, name: keyof typeof sfx) {
    const response = await fetch(`${path}/${name}.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    sfx[name] = audioBuffer;
}

export async function playSound(name: keyof typeof sfx) {
    if (sfx[name]) {
        const source = audioContext.createBufferSource();
        source.buffer = sfx[name];
        source.connect(audioContext.destination);
        source.start(0);
    }
}

export async function fadeOutMusic(fade_speed = 0.1) {
    return new Promise<void>((resolve) => {
        if (playing_bgm) {
            const audio = playing_bgm;
            const interval = setInterval(() => {
                audio.volume = Math.max(0, audio.volume - fade_speed);
                if (audio.volume === 0) {
                    resolve();
                    clearInterval(interval);
                }
            }, 100);
        } else {
            resolve();
        }
    });
}

export async function playMusic(name: keyof typeof bgm, fade_speed?: number) {
    await fadeOutMusic(fade_speed);
    playing_bgm = bgm[name];
    playing_bgm.volume = 1;
    playing_bgm.currentTime = 0;
    playing_bgm.play();
}

export async function initResources() {
    const promises: Promise<any>[] = [];

    for (const name in images) {
        promises.push(loadImage(name as keyof typeof images));
    }

    for (const name in bgm) {
        promises.push(loadMusic(name as keyof typeof bgm));
    }

    for (const name in sfx) {
        promises.push(loadSfx("sfx", name as keyof typeof sfx));
    }

    await Promise.all(promises);
}
