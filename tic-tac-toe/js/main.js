const gameArea = document.querySelector('.game-area')
let board;
const cells = document.querySelectorAll('.game-area__cell')
const replayBtn = document.querySelector('.replay-btn')
const endgameModal = document.querySelector('.endgame')
const scoreModal = document.querySelector('.score')
const overlay = document.querySelector('.overlay')

const PLAYER = 'X';
const AI = 'O';
let count = 0;

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

function startGame () {
    count = 0;
    board = Array.from(Array(9).keys());
    endgameModal.style.left = '-200px';
    endgameModal.textContent = ''
    scoreModal.style.right = '-200px';
    overlay.style.display = 'none';
    cells.forEach((item, index) => {
        item.textContent = '';
        item.style.removeProperty('background-color')
        item.addEventListener('click', turnClick)
    })
}

function turnClick(square) {
    if (typeof board[square.target.id] == 'number') {
        if (count % 2 == 0) {
            turn(square.target.id, PLAYER)
        } else {
            turn(square.target.id, AI)
        }
        count++
    }
    
}

function turn(squareId, player) {
    board[squareId] = player
    console.log(board)
    document.getElementById(squareId).textContent = player
    cells[squareId].classList.add('animation');
    let gameWon = checkWin(board, player)
    if (gameWon) gameOver(gameWon)
    if (checkTie()) tie()
}

function stepAI() {
    let emptySpots = board.filter(s => typeof s == 'number');
    return getRandomInt(emptySpots)
}

function getRandomInt(arr) {
	let rand = Math.floor(Math.random() * arr.length)
    return arr[rand]
}

function checkWin(board, player) {
    let plays = board.reduce((acc, item, index) => {
        if (item == player) {
            acc.push(index)
        }
        return acc
    },[])
    for ([i, won] of combinations.entries()) {
        if (won.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {i: i, player: player}
            return gameWon;
        }
    }
}

function checkTie() {
    if (board.filter(s => typeof s == 'number').length == 0) {
        return true
    }
}

function tie() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'green'
        cells[i].removeEventListener('click', turnClick)
    }
    overlay.style.display = 'block';
    modal.style.left = '10%';
    modal.textContent = `TIE`
}

function checkSteps(player) {
    const count = board.filter(s => s == player).length;
    return count;
}

function gameOver({i,player}) {
    let arr = combinations[i]
    let steps = checkSteps(player);
    let winner = player == 'X' ? 'Крестики' : 'Нолики';

    checkSteps(player)

    setTimeout(() => {
        cells[arr[0]].style.backgroundColor = '#eedf1273'
    }, 300)
    setTimeout(() => {
        cells[arr[1]].style.backgroundColor = '#eedf1273'
    }, 600)
    setTimeout(() => {
        cells[arr[2]].style.backgroundColor = '#eedf1273'
    }, 900)
    // setTimeout(() => {
    //     overlay.style.display = 'block'
    // }, 2000);
    setTimeout(() => {
        endgameModal.style.left = '0px';
        scoreModal.style.right = '0px';
        endgameModal.textContent = `${winner} победили\nКоличество шагов: ${steps}`
    }, 2000);
    
    cells.forEach((item, index) => {
        item.removeEventListener('click', turnClick)
    })
}



startGame()