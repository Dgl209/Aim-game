const screens = document.querySelectorAll('.screen')
const startBtn = document.querySelector('.start-button')
const restartBtn = document.querySelector('.restart-button')
const gameTime = document.querySelector('.game-time')
const gameLvl = document.querySelector('.game-levels')
const board = document.querySelector('.board')
const timeLeftCount = document.querySelectorAll('.time-left__count')
const result = document.querySelector('.finish-result')
const colors = ['#F08080', '#FF1493', '#FF8C00', '#FFFF00',
    '#EE82EE', '#9370DB', '#DAA520', '#1E90FF']
const turboModeInput = document.querySelector('#turboModeInput')
const colorFullTarget = document.querySelector('.colorfullTarget')
const dropBtn = document.querySelector('.drop-button')
const dropMenu = document.querySelector('#drop-menu')
const dropContent = document.querySelector('.drop-content')
const backgrounds = document.querySelectorAll('.background')
const inputBackground1 = document.querySelector('#background-1')
const inputBackground2 = document.querySelector('#background-2')
const inputBackground3 = document.querySelector('#background-3')

let time = 0
let score = 0
let data = localStorage.getItem('data') ? localStorage.getItem('data') : 1
localStorage.setItem('data', data)
turboModeInput.checked = false
let turboMode = false
let dropDown = false

dropBtn.addEventListener('click', () => {
    if (dropDown) {
        dropMenu.classList.remove('show')
        dropDown = !dropDown
    } else {
        dropMenu.classList.add('show')
        dropDown = !dropDown
    }
})


screens.forEach(item => {
    item.addEventListener('dblclick', () => {
        dropMenu.classList.remove('show')
        dropDown = !dropDown
    })
})

dropBtn.addEventListener('click', (event) => {
    event.target.classList.add('rotation')
    setTimeout(() => {
        event.target.classList.remove('rotation')
    }, 100)


})

backgrounds.forEach(item => {
    item.addEventListener('click', () => {
        if (item.checked) {
            data = item.value
            localStorage.setItem('data', data)
        }
        assignmentBackground(data)
    })
})

assignmentBackground(data)

function assignmentBackground(data) {
    if (Number(data) === 1) {
        screens.forEach(item => {
            item.className = 'screen'
            item.classList.add('background-1')
            dropContent.style.backgroundColor = '#c9c912'
            colorFullTarget.style.backgroundColor = '#c9c912'
            board.style.background = '#d08a06'
            backgrounds.forEach(item => {
                item.checked = false
            })
            inputBackground1.checked = true
        })
    } else if (Number(data) === 2) {
        screens.forEach(item => {
            item.className = 'screen'
            item.classList.add('background-2')
            dropContent.style.backgroundColor = '#831b60'
            colorFullTarget.style.backgroundColor = '#AA076B'
            board.style.background = '#650f4d'
            board.style.boxShadow = 'none'
            backgrounds.forEach(item => {
                item.checked = false
            })
            inputBackground2.checked = true
        })
    } else if (Number(data) === 3) {
        screens.forEach(item => {
            item.className = 'screen'
            item.classList.add('background-3')
            dropContent.style.backgroundColor = '#052b80'
            colorFullTarget.style.backgroundColor = '#284275'
            board.style.background = '#203865'
            backgrounds.forEach(item => {
                item.checked = false
            })
            inputBackground3.checked = true
        })
    }
}


turboModeInput.addEventListener('click', () => {
    turboMode = !turboMode
})

startBtn.addEventListener('click', () => {
    screens[0].classList.add('up')
    dropMenu.classList.remove('show')
    dropDown = !dropDown
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
    createCircleCallback(minSize, maxSize, board, turboMode)
    setInterval(timer, 1000)
    for (const screensTime of timeLeftCount) {
        screensTime.innerHTML = `00:${time}`
    }
    deleteCircleByClick(minSize, maxSize, board)
}

function createCircleForDifferentLevel(minSize, maxSize, board, turboMode) {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    if (turboMode) {
        const direction = randomNumber(0, 1)
        if (direction === 0) {
            circle.className = 'circle'
            circle.classList.add('turbo-mode-activator__left')
        } else {
            circle.className = 'circle'
            circle.classList.add('turbo-mode-activator__top')
        }
    }

    const size = randomNumber(minSize, maxSize)
    const {width, height} = board.getBoundingClientRect()

    const x = randomNumber(0, width - size)
    const y = randomNumber(0, height - size)

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    circle.style.backgroundColor = getRandomColor()

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
            createCircleForDifferentLevel(minSize, maxSize, board, turboMode)
        }
    })
}

function timer() {
    if (time === 0) {
        stopGame()
    } else {
        let current = --time
        for (const screensTime of timeLeftCount) {
            screensTime.innerHTML = `00:${current}`
        }
        if (current < 10) {
            for (const screensTime of timeLeftCount) {
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
            setTimeout(() => {
                location.reload()
            }, 500)
        })
    })
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}