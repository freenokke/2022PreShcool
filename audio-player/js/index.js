//объявление переменных
const audioTag = document.querySelector('audio');
const progressBar = document.querySelector('input');
const prevBtn = document.querySelector('.toolbar__previous-btn')
const playBtn = document.querySelector('.toolbar__play-btn')
const nextBtn = document.querySelector('.toolbar__next-btn')

function togglePlayAudio() {
    let method = audioTag.paused ? 'play' : 'pause';
    audioTag[method]();
}

function updateProgress(e) {
    // progressBar.setAttribute('max', e.srcElement.duration);    перенесен в событие DOMContentLoaded
    progressBar.value = e.srcElement.currentTime
}

function updateProgressOnClick() {
    audioTag.currentTime = this.value;
}

//Обработчики
audioTag.addEventListener('timeupdate', updateProgress);
//Работа кнопок
playBtn.addEventListener('click', togglePlayAudio);
//Изменение прогресса трека по клику
progressBar.addEventListener('input', updateProgressOnClick);
//Подгрузка продолжительности трека в инпут при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    progressBar.setAttribute('max', audioTag.duration);
})
//Подгрузка продолжительности трека в инпут при изменении трека
audioTag.addEventListener('durationchange', () => {
    progressBar.setAttribute('max', audioTag.duration);
})
