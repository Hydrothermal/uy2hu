export const images = {
    title: new Image(),
    david: new Image(),
    david_face: new Image(),
    trevor: new Image(),
    trevor_face: new Image(),
    cotton: new Image(),
    cotton_face: new Image(),
    sara_face: new Image(),
    sara_face_2: new Image(),
    arrow_right: new Image(),
    arrow_down: new Image(),
    start_button: new Image(),
};

export const bgm = {
    boss1: new Audio(),
    boss2: new Audio(),
    boss3: new Audio(),
    menu: new Audio(),
    stage1: new Audio(),
    stage2: new Audio(),
    stage3: new Audio(),
};

export const sfx = {
    good_job: new Audio(),
    imposed: new Audio(),
    click: new Audio(),
    touch: new Audio(),
    guh_dong: new Audio(),
};

let playing_bgm: HTMLAudioElement | null = null;

function loadImage(name: keyof typeof images) {
    return new Promise((resolve, reject) => {
        images[name].src = `img/${name}.png`;
        images[name].addEventListener("load", resolve);
    });
}

function loadAudio(
    record: Record<string, HTMLAudioElement>,
    path: string,
    name: string
) {
    return new Promise((resolve, reject) => {
        record[name].src = `${path}/${name}.mp3`;
        record[name].addEventListener("canplaythrough", resolve);
    });
}

export async function playSound(name: keyof typeof sfx) {
    sfx[name].currentTime = 0;
    sfx[name].play();
}

export async function playMusic(name: keyof typeof bgm) {
    playing_bgm?.pause();
    playing_bgm = bgm[name];
    playing_bgm.currentTime = 0;
    playing_bgm.play();
}

export async function initResources() {
    const promises: Promise<any>[] = [];

    for (const name in images) {
        promises.push(loadImage(name as keyof typeof images));
    }

    for (const name in bgm) {
        promises.push(loadAudio(bgm, "bgm", name));
    }

    for (const name in sfx) {
        promises.push(loadAudio(sfx, "sfx", name));
    }

    await Promise.all(promises);
}
