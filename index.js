const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('.start-button')
const gameTime = document.querySelector('.game-time')
const gameLvl = document.querySelector('.game-levels')
const board1 = document.querySelector('.board_1')
const board2 = document.querySelector('.board_2')
const board3 = document.querySelector('.board_3')
const screenTime = document.querySelectorAll('.screen__time')
const board = document.querySelectorAll('.board')
let time = 0
let score = 0

startBtn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

gameTime.addEventListener('click', (event) => {
    if (event.target.classList.contains('game-time__button')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
    }
})

gameLvl.addEventListener('click', (event) => {
    if (event.target.classList.contains('game-level__easy')) {
        screens[2].classList.add('up')
        startGameOnDifferentLevels(50, 10, board1, createCircleForDifferentLevel)
    } else if (event.target.classList.contains('game-level__normal')) {
        screens[2].classList.add('double-up')
        startGameOnDifferentLevels(25, 50, board2, createCircleForDifferentLevel)
    } else if (event.target.classList.contains('game-level__hard')) {
        screens[2].classList.add('triple-up')
        startGameOnDifferentLevels(10, 25, board3, createCircleForDifferentLevel)
    }
})

function startGameOnDifferentLevels(minSize, maxSize, board, createCircleCallback) {
    createCircleCallback(minSize, maxSize, board)
    setInterval(timer, 1000)
    for (const screensTime of screenTime) {
        screensTime.innerHTML = `00:${time}`
    }
}

function createCircleForDifferentLevel(minSize, maxSize, board) {
    const circle = document.createElement('div')
    circle.classList.add('circle')

    const size = randomNumber(minSize, maxSize)
    const {width, height} = board.getBoundingClientRect()

    const x = randomNumber(0, width - size)
    const y = randomNumber(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function deleteCircleByClick(minSize, maxSize, board) {
    board.addEventListener('click', (event) => {
        if (event.target.classList.contains('circle')) {
            score++
            event.target.remove()
            createCircleForDifferentLevel(minSize, maxSize, board)
        }
    })
}

deleteCircleByClick(50, 100, board1)
deleteCircleByClick(25, 50, board2)
deleteCircleByClick(10, 25, board3)

function timer() {
    if (time === 0) {
        stopGame()
    } else {
        let current = --time
        for (const screensTime of screenTime) {
            screensTime.innerHTML = `00:${current}`
        }
        if (current < 10) {
            for (const screensTime of screenTime) {
                screensTime.innerHTML = `00:0${current}`
            }
        }
    }
}

function stopGame() {
    for (const screensTime of screenTime) {
        screensTime.parentNode.remove()
    }

    for (const overBoards of board) {
        overBoards.innerHTML = `
            <h1 class="finish-content">
                score: <span class="finish-content__result">${score}</span>
            </h1>
            <h2 class="finish__subtittle">click on the board and reload the page to start a new game</h2>`
    }

    setTimeout(() => {
        for (const overBoards of board) {
            overBoards.addEventListener('click', () => {
                for (const overBoards of board) {
                    overBoards.innerHTML = ``
                }
                for (let i = 0; i <=4; i++) {
                    screens[i].classList.remove('up')
                    screens[i].classList.remove('double-up')
                    screens[i].classList.remove('triple-up')
                }
            })
        }
    }, 1500)
}