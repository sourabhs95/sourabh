console.log("Site is currently undergoing maintenance. Will be back soon!");

let isMusicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    if (isMusicPlaying) {
        music.pause();
        musicIcon.className = 'fas fa-volume-mute';
        musicBtn.classList.remove('playing');
        musicBtn.title = "Play Music";
    } else {
        music.play();
        musicIcon.className = 'fas fa-music';
        musicBtn.classList.add('playing');
        musicBtn.title = "Pause Music";
    }
    
    isMusicPlaying = !isMusicPlaying;
}
