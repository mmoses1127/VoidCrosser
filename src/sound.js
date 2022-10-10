export default class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.setAttribute("muted", "muted")
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
            this.sound.currentTime = 0;
        }
        this.restart = function(){
            this.sound.currentTime = 0;
            this.play();
        }
        this.loop = function(){
            this.sound.addEventListener('ended', (e) => {
                this.restart();
            });
        }
        this.muteToggle = () => {
            (this.sound.muted) ? this.sound.muted = false : this.sound.muted = true;
        }

    }
}