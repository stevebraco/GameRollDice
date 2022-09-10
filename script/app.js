const btnHold = document.querySelector('#hold')
const btnRollDice = document.querySelector('#roll-dice')
const background = document.querySelector('.background')
const circle = document.querySelectorAll('.circle')
const displayWinner = document.querySelector('#winner')
const newGame = document.querySelector('#new-game')
const title = document.querySelectorAll('h1')

let round = 0

const playerOne = {
  name: 'playerOne',
  global: 0
}

const playerTwo = {
  name: 'playerTwo',
  global: 0
}
let activePlayer = playerOne 

const nextPlayer = () => {
  if(activePlayer === playerOne) {
    displayCircleBackgroundPOne()
    return activePlayer = playerTwo
  } else {
    displayCircleBackgroundPTwo()
    return activePlayer = playerOne
  }
}

const displayCircleBackgroundPOne = () => {
  background.style.left = ''
  background.style.right = '0px'
  title[1].classList.add('active')
  title[0].classList.remove('active')
}
const displayCircleBackgroundPTwo = () => {
  background.style.left= '0px'
    background.style.right= ''
    title[0].classList.add('active')
    title[1].classList.remove('active')
}

const displayDice = (value) => {
  return document.querySelector('#img-dice').src = `./assets/images/dice_${value}.png`
}

const dice = () => {
  let valueDice = Math.floor(Math.random() * (6 - 1 + 1)) + 1; 
  displayDice(valueDice)
  return valueDice
}

const addToRound = () => {
  const addToRound = dice()
  activePlayer['global'] += addToRound
}

const initRoundToZero = () => {
  round = 0
}

const showTextContent = (nameQuery, value) => {
  document.querySelector(`.${activePlayer.name}_${nameQuery}`).textContent = value

}

const handleRollDice = () => {
  let valueDice = dice()
  if(valueDice === 1) {
  showTextContent('scoreRound', 0)
  initRoundToZero()
  nextPlayer()
  return;
  }
  round += valueDice
  showTextContent('scoreRound', round)
  }

  const handleInitGame = () => {
    btnHold.disabled = false
    btnRollDice.disabled = false
    initRoundToZero()
    playerOne.global = 0
    playerTwo.global = 0
    document.querySelector(`.playerOne_scoreGlobal`).textContent = 0
    document.querySelector(`.playerTwo_scoreGlobal`).textContent = 0
    displayWinner.textContent = ''
  }

  const handleHold = () => {
    activePlayer.global += round
    showTextContent('scoreGlobal', activePlayer.global)
    showTextContent('scoreRound', 0)
    initRoundToZero()
    if(activePlayer.global >= 100) {
      displayWinner.textContent = `${activePlayer.name} a gagné`
      btnHold.disabled = true
      btnRollDice.disabled = true
    }
    nextPlayer()
  }

  btnHold.addEventListener('click', handleHold)

  btnRollDice.addEventListener('click', handleRollDice)

  newGame.addEventListener('click', handleInitGame)
