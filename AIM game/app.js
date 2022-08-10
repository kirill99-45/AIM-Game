const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('.board')

let colors = ['#41B3A30', '#E27D60', '#F64C72', '#FBEEC1', '#8EE4AF', '#3500D3', '#C3073F', '#AFD275']

let score = 0;
let time = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault('true')
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    startGame()
    screens[1].classList.add('up')
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
  let current = --time;
  if (current < 10) {
     current = `0${current}`
   }
   setTime(current)
  }
}

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    if (event.target.clientWidth > 20) {
      score += 1
    } else if (event.target.clientWidth < 20) {
      score += 2
    } else if (event.target.clientWidth < 10) {
      score += 4
    }
    event.target.remove();
    createRandomCircle();
 }
})

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  let size = getRandomNumber(10, 60);
  const circle = document.createElement('div')
  const {width, height} = board.getBoundingClientRect()
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  let color = getRandomNumber(0, 7)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = `${colors[color]}`
  circle.style.boxShadow = `0px 0px 11px 3px ${colors[color]}`

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

// const restart = document.querySelector('.restart')
//
// restart.addEventListener('click', () => {
//
// })
