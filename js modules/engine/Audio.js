function loadAudio(url) {
    return new Promise(resolve => {
        const audio = new Audio();
        audio.oncanplay = () => resolve(audio);
        audio.src = url;
    })
}