//объявление переменных
const audio = new Audio('./audio/lusia.mp3');
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


function updateTime() {
    currentTimeMinutes.textContent = Math.trunc(audio.currentTime / 60).toString().padStart('2', 0)
    currentTimeSeconds.textContent = Math.trunc(audio.currentTime % 60).toString().padStart('2', 0)
    
}

function updateProgressOnClick() {
    audio.currentTime = this.value;
}

//Обработчики
    //Обновление прогресса трека от текущего времени
audio.addEventListener('timeupdate', updateProgress);

    //Обновление текущего времени трека
audio.addEventListener('timeupdate', updateTime);

    //Работа кнопок
playBtn.addEventListener('click', togglePlayAudio);

    //Изменение прогресса трека по клику
progressBar.addEventListener('input', updateProgressOnClick);

    //Подгрузка продолжительности трека в инпут при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    progressBar.setAttribute('max', audio.duration);
    totalTimeMinutes.textContent = '0' + Math.trunc(audio.duration / 60)
    totalTimeSeconds.textContent = Math.trunc(audio.duration % 60)

})

    //Подгрузка продолжительности трека в инпут при изменении трека
audio.addEventListener('durationchange', () => {
    progressBar.setAttribute('max', audio.duration);
})
