let currentQuestion = 0
let score = 0
let quizQuestions = []
let quizData = {}
let timer
let timeLeft = 15

const startScreen = document.getElementById('start-screen')
const quizContainer = document.getElementById('quiz-container')
const questionText = document.getElementById('question-text')
const questionNumber = document.getElementById('question-number')
const optionsContainer = document.getElementById('options-container')
const scoreDisplay = document.getElementById('score')
const nextBtn = document.getElementById('next-btn')
const timerDisplay = document.getElementById('timer')
const progressBar = document.getElementById('progress-bar')
const categoryButtons = document.querySelectorAll('.category-btn')

fetch('quiz-data.json')
  .then((response) => response.json())
  .then((data) => {
    quizData = data
  })

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedTopic = button.dataset.topic
    if (!quizData[selectedTopic])
      return alert('Quiz data not loaded yet. Please wait.')

    startQuiz(selectedTopic)
  })
})

function startQuiz(topic) {
  quizQuestions = shuffleArray(quizData[topic]).slice(0, 10)
  currentQuestion = 0
  score = 0

  scoreDisplay.textContent = 'Score: 0'
  progressBar.style.width = '0%'
  nextBtn.style.display = 'inline-block'
  startScreen.style.display = 'none'
  quizContainer.style.display = 'block'

  loadQuestion()
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function loadQuestion() {
  clearInterval(timer)
  timeLeft = 15
  updateTimerDisplay()

  const q = quizQuestions[currentQuestion]
  questionText.textContent = q.question
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${
    quizQuestions.length
  }`
  optionsContainer.innerHTML = ''
  nextBtn.disabled = true

  q.choices.forEach((choice) => {
    const btn = document.createElement('button')
    btn.textContent = choice
    btn.className = 'option-btn'
    btn.onclick = () => handleAnswer(btn, choice)
    optionsContainer.appendChild(btn)
  })

  startTimer()
}
