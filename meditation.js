
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

function setInitialVariables(audio) {
    const duration = Math.round(audio.duration)
    const minutes = Math.floor(duration / 60);
    const seconds = duration - minutes * 60;
    $('.audio-player .total-time').text(`${zeroGenerator(minutes)}:${zeroGenerator(seconds)}`)
}

const zeroGenerator = (time) => time < 10 ? '0' + time : time;

$('.audio-player').addClass(audio.paused ? 'paused' : '')
$('.play-button').click(() => {

});

