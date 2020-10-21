
const backgrounds = [
    "assets/pexels-alexander-kovalev-2871478.jpg", "assets/pexels-frans-van-heerden-830829.jpg" , "assets/pexels-johannes-plenio-1102908.jpg", "assets/pexels-lisa-fotios-1125347.jpg" , "assets/pexels-q-hưng-phạm-2922647.jpg", "assets/pexels-skitterphoto-240040.jpg", "assets/pexels-wendy-van-zyl-1112048.jpg"
]
const backgroundsNodes = []

for (const img of backgrounds){
    $(".audio-container .backgrounds").append(`<img src="${img}"/>`)
    const node = $(".audio-container .backgrounds img").last();
    if (backgrounds[0] !== img) {
        node.fadeOut(0)
    }
    backgroundsNodes.push(node)
}
let i = 1;
let until = backgroundsNodes.length - 1;

setInterval(function(){ 
    backgroundsNodes[i].fadeIn(2000);
    backgroundsNodes[i === 0 ? until : i-1].fadeOut(2000);
    if (i == until) {
        i = 0;
    } else {
        i++;
    }
}, 5000);

const audio = document.getElementById('audioPlayer');

audio.ondurationchange = () => setInitialVariables(audio);

function minSecGenerator(totalSeconds) {
    totalSeconds = Math.round(totalSeconds);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;
   return `${zeroGenerator(minutes)}:${zeroGenerator(seconds)}`
}

function setInitialVariables(audio) {
    $('.audio-player .total-time').text(minSecGenerator(audio.duration))
}

const zeroGenerator = (time) => time < 10 ? '0' + time : time;

$('.audio-player').addClass(audio.paused ? 'paused' : '')
$('.play-button').click(() => {
    if (audio.paused) audio.play()
    else audio.pause()
});

audio.onpause = () => $('.audio-player').addClass('paused')
audio.onplay = () => $('.audio-player').removeClass('paused')

audio.ontimeupdate = () => {
    $('.audio-player .current-time').text(minSecGenerator(audio.currentTime));
    $('.audio-player .progress-bar .internal-bar').css({
        width: getCurrentPercentage(audio.currentTime, audio.duration) + '%'
    })
}

const getCurrentPercentage = (currentTime, totalTime) => currentTime/totalTime* 100;

$('.audio-player .progress-bar').click(({ offsetX }) => {
    const { clientWidth } = document.querySelector('.audio-player .progress-bar');
    const per =  getCurrentPercentage(offsetX, clientWidth);
    const currentTime = (per/100) * audio.duration;
    audio.currentTime = currentTime;
})
