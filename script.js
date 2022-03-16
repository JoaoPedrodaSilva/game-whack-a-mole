const initialScreen = document.querySelector('#initial-screen')
const gameScreen = document.querySelector('#game-screen')
const postGameScreen = document.querySelector('#post-game-screen')
const anyDifficultButton = document.querySelectorAll('.difficult-button')
const gridDisplay = document.querySelector('#holes')
const allHoles = document.querySelectorAll('.hole')
const moleDisplay = document.querySelector('.mole')
const scoreDisplay = document.querySelector('#score')
const timeLeftDisplay = document.querySelector('#time-left')
const difficultDisplay = document.querySelector('#difficult')
const messageDisplay = document.querySelector('#message')
const playAgainButton = document.querySelector('#play-again')
let randomHole = null
let countDownTimer = null
let popMoleTimer = null
let difficult = null
let currentTime = null
let score = null

startGame = () => {
    initialScreen.style.display = 'flex'
    gameScreen.style.display = 'none'
    postGameScreen.style.display ='none'
    chooseDifficult()
}

const chooseDifficult = () => {
    anyDifficultButton.forEach( button => {
        button.addEventListener('click', e => {
            difficult = e.target.id            
            popMole()
        })
    })
}

popMole = () => {
    initialScreen.style.display = 'none'
    gameScreen.style.display = 'flex'
    gridDisplay.style.display = 'flex'
    clearInterval(countDownTimer)
    clearInterval(popMoleTimer)
    score = 0
    currentTime = 10
    scoreDisplay.innerHTML = score
    timeLeftDisplay.innerHTML = currentTime
    
    if (difficult == 'easy') {
        popMoleTimer = setInterval(setRandomHole, 1000)
        difficultDisplay.innerHTML = 'Easy'
    } else if (difficult == 'normal') {
        popMoleTimer = setInterval(setRandomHole, 750)
        difficultDisplay.innerHTML = 'Normal'
    } else {
        popMoleTimer = setInterval(setRandomHole, 500)
        difficultDisplay.innerHTML = 'Hard'
    }
    countDownTimer = setInterval(minusOneSec, 1000)
}

setRandomHole = () => {
    //remove any mole
    allHoles.forEach(hole => {
        hole.classList.remove('mole')
    })

    //set a hole to pop the mole
    randomHole = allHoles[Math.floor(Math.random() * 9)]
    randomHole.classList.add('mole')
}

minusOneSec = () => {
    currentTime--
    timeLeftDisplay.innerHTML = currentTime

    if (currentTime === 0) {
        clearInterval(countDownTimer)
        clearInterval(popMoleTimer)

        allHoles.forEach(hole => {
            hole.classList.remove('mole')
        })

        gridDisplay.style.display = 'none'
        postGameScreen.style.display ='flex'
        messageDisplay.innerHTML = `You hit ${score} moles on the ${difficult} difficult.`
        playAgain()
    }
}

playAgain = () => {
    playAgainButton.addEventListener('click', () => {
        startGame()
    })    
}

//count score
allHoles.forEach(hole => {
    hole.addEventListener('click', () => { 
        if (hole.id === randomHole.id) {
            score++
            scoreDisplay.innerHTML = score
            randomHole = null
        }
    })
})

startGame()






