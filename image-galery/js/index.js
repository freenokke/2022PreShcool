const container = document.querySelector('.container')

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