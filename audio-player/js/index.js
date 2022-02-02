//объявление переменных
const audioTag = document.querySelector('audio');
const progressBar = document.querySelector('input');
const prevBtn = document.querySelector('.toolbar__previous-btn')
const playBtn = document.querySelector('.toolbar__play-btn')
const nextBtn = document.querySelector('.toolbar__next-btn')
const totalTimeMinutes = document.querySelector('.total-time__minutes')
const totalTimeSeconds = document.querySelector('.total-time__seconds')
const currentTimeMinutes = document.querySelector('.current-time__minutes')
const currentTimeSeconds = document.querySelector('.current-time__seconds')

function togglePlayAudio() {
    let method = audioTag.paused ? 'play' : 'pause';
    audioTag[method]();
}

function updateProgress(e) {
    // progressBar.setAttribute('max', e.srcElement.duration);    перенесен в событие DOMContentLoaded
    progressBar.value = e.srcElement.currentTime
}

function updateTime() {
    const intMinCount = currentTimeMinutes.textContent.length;
    const intSecCount = currentTimeSeconds.textContent.length;

    if (intMinCount == 2) {
        currentTimeMinutes.textContent = Math.trunc(audioTag.currentTime / 60)
    } else {
        currentTimeSeconds.textContent = currentTimeSeconds.textContent.padStart(Math.trunc(audioTag.currentTime / 60), '0')
    }

    if(intSecCount == 2) {
        currentTimeSeconds.textContent = Math.trunc(audioTag.currentTime % 60)
    } else {
        currentTimeSeconds.textContent = currentTimeSeconds.textContent.padStart(Math.trunc(audioTag.currentTime % 60), '0')
    }
}

function updateProgressOnClick() {
    audioTag.currentTime = this.value;
}

//Обработчики
    //Обновление прогресса трека от текущего времени
audioTag.addEventListener('timeupdate', updateProgress);
    //Обновление текущего времени трека
audioTag.addEventListener('timeupdate', updateTime);
    //Работа кнопок
playBtn.addEventListener('click', togglePlayAudio);
    //Изменение прогресса трека по клику
progressBar.addEventListener('input', updateProgressOnClick);
    //Подгрузка продолжительности трека в инпут при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    progressBar.setAttribute('max', audioTag.duration);
    totalTimeMinutes.textContent = '0' + Math.trunc(audioTag.duration / 60)
    totalTimeSeconds.textContent = Math.trunc(audioTag.duration % 60)
})
    //Подгрузка продолжительности трека в инпут при изменении трека
audioTag.addEventListener('durationchange', () => {
    progressBar.setAttribute('max', audioTag.duration);
})
