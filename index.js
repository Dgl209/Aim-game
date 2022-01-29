const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('.start-button')
const restartBtn = document.querySelector('.restart-button')
const gameTime = document.querySelector('.game-time')
const gameLvl = document.querySelector('.game-levels')
const board = document.querySelector('.board')
const screenTime = document.querySelectorAll('.screen__time')
const result = document.querySelector('.finish-result')
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
        startGameOnDifferentLevels(50, 100, board, createCircleForDifferentLevel)
    } else if (event.target.classList.contains('game-level__normal')) {
        screens[2].classList.add('up')
        startGameOnDifferentLevels(25, 50, board, createCircleForDifferentLevel)
    } else if (event.target.classList.contains('game-level__hard')) {
        screens[2].classList.add('up')
        startGameOnDifferentLevels(10, 25, board, createCircleForDifferentLevel)
    }
})

function startGameOnDifferentLevels(minSize, maxSize, board, createCircleCallback) {
    createCircleCallback(minSize, maxSize, board)
    setInterval(timer, 1000)
    for (const screensTime of screenTime) {
        screensTime.innerHTML = `00:${time}`
    }
    deleteCircleByClick(minSize, maxSize, board)
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
    screens[3].classList.add('up')
    result.textContent = `${score}`
    restartBtn.addEventListener('click', () => {
        screens.forEach(item => {
            item.classList.remove('up')
            location.reload()
        })
    })
}