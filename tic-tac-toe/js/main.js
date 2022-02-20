const gameArea = document.querySelector('.game-area')
let board;
const cells = document.querySelectorAll('.game-area__cell')
const replayBtn = document.querySelector('.replay-btn')
const modal = document.querySelector('.modal')

const PLAYER = 'O';
const AI = 'X';
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
    board = Array.from(Array(9).keys());
    modal.style.display = 'none';
    cells.forEach((item, index) => {
        item.textContent = '';
        item.style.removeProperty('background-color')
        item.addEventListener('click', turnClick)
    })
}


function turnClick(square) {
    turn(square.target.id, PLAYER)
}

function turn(squareId, player) {
    board[squareId] = player
    document.getElementById(squareId).textContent = player
    let gameWon = checkWin(board, player)
    if (gameWon) gameOver(gameWon)
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

function gameOver({i,player}) {
    console.log(combinations[i], player)
    combinations[i].forEach(item => {
        cells[item].style.backgroundColor = 'red'
    } )
}


startGame()