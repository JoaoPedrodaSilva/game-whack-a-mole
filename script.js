const initialScreen = document.querySelector('#initial-screen')
const getReadyScreen = document.querySelector('#get-ready-screen')
const gameScreen = document.querySelector('#game-screen')
const postGameScreen = document.querySelector('#post-game-screen')
const difficultDisplay = document.querySelector('#difficult')
const anyDifficultButton = document.querySelectorAll('.difficult-button')
const getReadyDisplay = document.querySelector('#get-ready')
const holesDisplay = document.querySelector('#holes')
const allHoles = document.querySelectorAll('.hole')
const moleDisplay = document.querySelector('.mole')
const scoreDisplay = document.querySelector('#score')
const timeLeftDisplay = document.querySelector('#time-left')
const hitDisplay = document.querySelector('#hit')
const messageDisplay = document.querySelector('#message')
const playAgainButton = document.querySelector('#play-again')

let randomHole = null
let countDownTimer = null
let popMoleTimer = null
let difficult = null
let currentTime = null
let hit = null

startGame = () => {
    initialScreen.style.display = 'flex'
    getReadyScreen.style.display = 'none'
    gameScreen.style.display = 'none'
    postGameScreen.style.display ='none'
    chooseDifficult()
}

const chooseDifficult = () => {
    anyDifficultButton.forEach( button => {
        button.addEventListener('click', e => {
            difficult = e.target.id 
            getReady()            
        })
    })
}

const getReady = () => {
    initialScreen.style.display = 'none'
    getReadyScreen.style.display = 'flex'
    getReadyDisplay.innerHTML = 3
    setTimeout( () => {getReadyDisplay.innerHTML = 2}, 500)
    setTimeout( () => {getReadyDisplay.innerHTML = 1}, 1000)
    setTimeout( () => {getReadyDisplay.innerHTML = 'GO!'}, 1500)
    setTimeout(popMole, 2000)
}

popMole = () => {
    getReadyScreen.style.display = 'none'
    gameScreen.style.display = 'flex'
    holesDisplay.style.display = 'flex'
    clearInterval(countDownTimer)
    clearInterval(popMoleTimer)
    hit = 0
    currentTime = 10
    scoreDisplay.innerHTML = hit
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
        hole.classList.remove('mad-mole')  
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

        holesDisplay.style.display = 'none'
        postGameScreen.style.display ='flex'
        hitDisplay.innerHTML = `hit ${hit} moles`
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
            hit++
            hole.classList.remove('mole')
            hole.classList.add('mad-mole')            
            randomHole = null
            scoreDisplay.innerHTML = hit            
        }
    })
})

startGame()






