export const images = {
    david: new Image(),
};

function loadImage(name: keyof typeof images) {
    return new Promise((resolve, reject) => {
        images[name].src = `img/${name}.png`;
        images[name].addEventListener("load", resolve);
    });
}

export async function initResources() {
    const promises: Promise<any>[] = [];

    for (const name in images) {
        promises.push(loadImage(name as keyof typeof images));
    }

    await Promise.all(promises);
}
