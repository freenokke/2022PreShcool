const container = document.querySelector('.container-image')
const input = document.querySelector('input')

function createElem(src) {
    const img = document.createElement('img')
    img.src = src
    container.append(img)
}

async function getData() {
    const res = await fetch('https://api.unsplash.com/photos/random?client_id=bIvEWFhyHtf9BBEeCLa4CaqZ1-hXCUbNXQDcvwpZfcI&count=12');
    const data = await res.json();

    data.map(element => {
        createElem(element.urls.regular)
    });
}
getData();

async function search() {
    const res = await fetch(`https://api.unsplash.com/search/photos?client_id=bIvEWFhyHtf9BBEeCLa4CaqZ1-hXCUbNXQDcvwpZfcI&page=1&per_page=12&query=${input.value}`);
    const data = await res.json();

    const images = document.querySelectorAll('img')
    for (let i = 0; i < images.length; i++) {
        images[i].src = data.results[i].urls.regular
    } 
}

input.addEventListener('keyup', function(event) {
    if(event.key == 'Enter'){
        search();
        input.value = '';
    }
})