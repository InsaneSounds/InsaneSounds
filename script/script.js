window.addEventListener('load', () => {
    // const playTrack = document.getElementById('firstTrack');
    const Soundintro = new Audio("../audio/sun.mp3");
    const djMiko = new Audio("../audio/DJMiko.mp3");
    const djChrisinator = new Audio("../audio/DJChrisinator.mp3");

    intro.addEventListener('click', () => {
        Soundintro.play();
    })

    miko.addEventListener('click', () => {
        djMiko.play();
    })

    chrisi.addEventListener('click', () => {
        djChrisinator.play();
    })
    
    // function playSong() {
    //     audio.play();
    // }

    // var audio = new Audio(),
    // i = 0;
    // var playlist = new Array('http://www.w3schools.com/htmL/horse.mp3', 'http://demos.w3avenue.com/html5-unleashed-tips-tricks-and-techniques/demo-audio.mp3');

    // audio.addEventListener('ended', function () {
    //     i = ++i < playlist.length ? i : 0;
    //     console.log(i)
    //     audio.src = playlist[i];
    //     audio.play();
    // }, true);
    // audio.volume = 0.3;
    // audio.loop = false;
    // audio.src = playlist[0];
    // audio.play();
})