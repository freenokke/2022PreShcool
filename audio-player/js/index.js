import playList from "./playList.js";

//объявление переменных
const audio = new Audio(playList[0].src);
// console.log("🚀 ~ file: index.js ~ line 5 ~ playList[0].src", playList[0].src)
const progressBar = document.querySelector('input');
const prevBtn = document.querySelector('.toolbar__previous-btn')
const playBtn = document.querySelector('.toolbar__play-btn')
const nextBtn = document.querySelector('.toolbar__next-btn')

const totalTimeMinutes = document.querySelector('.total-time__minutes')
const totalTimeSeconds = document.querySelector('.total-time__seconds')
const currentTimeMinutes = document.querySelector('.current-time__minutes')
const currentTimeSeconds = document.querySelector('.current-time__seconds')

function togglePlayAudio() {
    let method = audio.paused ? 'play' : 'pause';
    audio[method]();
}

function updateProgress(e) {
    // progressBar.setAttribute('max', e.srcElement.duration);    перенесен в событие DOMContentLoaded
    progressBar.value = e.srcElement.currentTime
}

function updateProgressOnClick() {
    audio.currentTime = this.value;
}

function nextAudio() {
        audio.src = playList[1].src
        audio.play()
    
}

function previousAudio() {

}

//Обработчики
    //Обновление прогресса трека от текущего времени
audio.addEventListener('timeupdate', updateProgress);

    //Работа кнопок
playBtn.addEventListener('click', togglePlayAudio);
nextBtn.addEventListener('click', nextAudio);

    //Изменение прогресса трека по клику
progressBar.addEventListener('input', updateProgressOnClick);

//подгрузка значений продолжительности трека и запуск обработчика событий текущего времени
audio.addEventListener('loadeddata', (e) => {
    progressBar.setAttribute('max', audio.duration);
    function updateTime(ev) {
        currentTimeMinutes.textContent = Math.trunc(audio.currentTime / 60).toString().padStart('2', 0)
        currentTimeSeconds.textContent = Math.trunc(audio.currentTime % 60).toString().padStart('2', 0)
    }
    totalTimeMinutes.textContent = '0' + Math.trunc(audio.duration / 60)
    totalTimeSeconds.textContent = Math.trunc(audio.duration % 60)
    
    //Обновление текущего времени трека
    audio.addEventListener('timeupdate', updateTime);
})

//     //Подгрузка продолжительности трека в инпут при изменении трека
// audio.addEventListener('durationchange', () => {
//     audioDuration = audio.duration
//     progressBar.setAttribute('max', audio.duration);
// })