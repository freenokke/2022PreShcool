import playList from "./playList.js";

//объявление переменных
const audio = new Audio();
const prevBtn = document.querySelector('.toolbar__previous-btn')
const progressBar = document.querySelector('.inp');
const volumeBar = document.querySelector('.inp-volume');
const playBtn = document.querySelector('.toolbar__play-btn')
const nextBtn = document.querySelector('.toolbar__next-btn')
const volumeBtn = document.querySelector('.player__volume-btn')
const totalTimeMinutes = document.querySelector('.total-time__minutes')
const totalTimeSeconds = document.querySelector('.total-time__seconds')
const currentTimeMinutes = document.querySelector('.current-time__minutes')
const currentTimeSeconds = document.querySelector('.current-time__seconds')
const trackName = document.querySelector('.track-info__name')
const trackAuthor = document.querySelector('.track-info__author')
const trackIMG = document.querySelector('.player__track-img')

function togglePlayAudio() {
    let method = audio.paused ? 'play' : 'pause';
    audio[method]();
    changePlayIcon()
}

function changePlayIcon() {
    if (audio.played) {playBtn.style.backgroundImage = `url(./svg/pause.svg)`}
    if (audio.paused) {playBtn.style.backgroundImage = `url(./svg/play.svg)`}
}

function changeVolumeIcon(e) {
    if (volumeBar.value == 0) {
        volumeBtn.style.backgroundImage = `url(./svg/volume.svg)`
        const value = 0.5
        volumeBar.value = value
        audio.volume = value
        volumeBar.style.background = `linear-gradient(to right, #C6A780 0%, #C6A780 50%, #92a8af 50%, #92a8af 100%)`
    } else {
        volumeBtn.style.backgroundImage = `url(./svg/mute.svg)`
        const value = 0
        volumeBar.value = value
        audio.volume = value
        volumeBar.style.background = `linear-gradient(to right, #C6A780 0%, #C6A780 ${value}%, #92a8af ${value}%, #92a8af 100%)`
    }
    
    

}

function updateProgress(e) {
    progressBar.value = e.srcElement.currentTime //для ползунка
    const value = e.srcElement.currentTime / e.srcElement.duration * 100 // для бэкраунда
    progressBar.style.background = `linear-gradient(to right, #C6A780 0%, #C6A780 ${value}%, #92a8af ${value}%, #92a8af 100%)` // для бэкраунда
}

function updateVolumeProgress() {
    audio.volume = this.value
    const value = this.value * 100
    volumeBar.style.background = `linear-gradient(to right, #C6A780 0%, #C6A780 ${value}%, #92a8af ${value}%, #92a8af 100%)`
    // смена иконки если звука нет/есть соответственно
    if (volumeBar.value == 0) {volumeBtn.style.backgroundImage = `url(./svg/mute.svg)`} else {
        volumeBtn.style.backgroundImage = `url(./svg/volume.svg)`
    }
}

function updateProgressOnClick() {
    audio.currentTime = this.value;
}

function nextAudio() {
    const track = playList.find((item) => audio.src.includes(item.src.substring(1)));
    const pos = playList.indexOf(track);
    
    if (pos < playList.length - 1) {
        audio.src = playList[pos+1].src
        trackAuthor.textContent = playList[pos+1].author
        trackName.textContent = playList[pos+1].title
        trackIMG.style.backgroundImage = `url(${playList[pos+1].poster})`;
    } else {
        audio.src = playList[0].src
        trackAuthor.textContent = playList[0].author
        trackName.textContent = playList[0].title
        trackIMG.style.backgroundImage = `url(${playList[0].poster})`;
    }
    audio.play()
}

function previousAudio() {
    const track = playList.find((item) => audio.src.includes(item.src.substring(1)));
    const pos = playList.indexOf(track);
    if (pos < playList.length - 1 && pos > 0) {
        audio.src = playList[pos-1].src
        trackAuthor.textContent = playList[pos-1].author
        trackName.textContent = playList[pos-1].title
        trackIMG.style.backgroundImage = `url(${playList[pos-1].poster})`;
    } else if(pos == 0) {
        audio.src = playList[playList.length - 1].src
        trackAuthor.textContent = playList[playList.length - 1].author
        trackName.textContent = playList[playList.length - 1].title
        trackIMG.style.backgroundImage = `url(${playList[playList.length - 1].poster})`;
    } else {
        audio.src = playList[pos-1].src
        trackAuthor.textContent = playList[pos-1].author
        trackName.textContent = playList[pos-1].title
        trackIMG.style.backgroundImage = `url(${playList[pos-1].poster})`;
    } 
    audio.play()
}

function preload() {
    audio.src = playList[0].src
    trackAuthor.textContent = playList[0].author
    trackName.textContent = playList[0].title
    trackIMG.style.backgroundImage = `url(${playList[0].poster})`;
}


//Обработчики
    //Обновление прогресса трека от текущего времени
audio.addEventListener('timeupdate', updateProgress);

    //Измкенение громкости
volumeBar.addEventListener('input', updateVolumeProgress)

    //Работа кнопок
playBtn.addEventListener('click', togglePlayAudio);
nextBtn.addEventListener('click', nextAudio);
prevBtn.addEventListener('click', previousAudio);
volumeBtn.addEventListener('click', changeVolumeIcon);

    //Изменение прогресса трека по клику
progressBar.addEventListener('input', updateProgressOnClick);
    // Переключения трека, когда текущий закончился
audio.addEventListener('ended', nextAudio)

    //подгрузка значений продолжительности трека, звука и запуск обработчика событий текущего времени
audio.addEventListener('loadeddata', (e) => {
    progressBar.setAttribute('max', audio.duration); // продолжительность
    function updateTime(ev) {
        currentTimeMinutes.textContent = Math.trunc(audio.currentTime / 60).toString().padStart('2', 0)
        currentTimeSeconds.textContent = Math.trunc(audio.currentTime % 60).toString().padStart('2', 0)
    }
    totalTimeMinutes.textContent = '0' + Math.trunc(audio.duration / 60)
    totalTimeSeconds.textContent = Math.trunc(audio.duration % 60).toString().padStart('2', 0)
    
    //Обновление текущего времени трека
    audio.addEventListener('timeupdate', updateTime);
})


    //Подгрузка первого трека при загрузке / обновлении страницы
document.addEventListener('DOMContentLoaded', preload)
//     //Подгрузка продолжительности трека в инпут при изменении трека
// audio.addEventListener('durationchange', () => {
//     audioDuration = audio.duration
//     progressBar.setAttribute('max', audio.duration);
// })