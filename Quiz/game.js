const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
      question: 'Which file type is most likely to contain malware?',
choice1: '.zip',
choice2: '.txt',
choice3: '.exe',
answer: 3,
},
{
question:
"Which one of these malware encrypt your hard drive?",
choice1: "Macro Virus",
choice2: "Ransomware",
choice3: "Cryptojacker",
answer: 2,
},
{
question: "Do Antiviruses guarantee safety?",
choice1: "No",
choice2: "Yes",
choice3: "Depends on the brand",
answer: 1,
},
{
question: "What is the purpose of a cryptojacker?",
choice1: "To mine cryptocurrency",
choice2: "To overheat or destroy devices",
choice3: "Steal Data",
answer: 1,
},
{
question: "Best way to protect yourself from malware?",
choice1: "Antivirus",
choice2: "VPN",
choice3: "Being mindful of what you download",
answer: 3,
},
{
question: "Which of these files can contain a macro virus?",
choice1: ".pdf",
choice2: ".txt",
choice3: ".docx",
answer: 3,
},
{
question: "What is the specialty of Trojan Malware?",
choice1: "Severity",
choice2: "Imitation of a regular program",
choice3: "Multiplication",
answer: 2,
},
{
question: "What is Phishing?",
choice1: "Sport",
choice2: "Fishing, misspelled",
choice3: "Acquiring personal info",
answer: 3,
},
{
question: "How can you prevent ID Theft?",
    choice1: "Using a password manager",
    choice2: "File a police report",
    choice3: "Keeping passwords in your wallet",
    answer:1,
  },
  {
    question:"How do you call a hacker who hacks people for fun, without causing any real damage?",
    choice1:"Gray Hat Hacker",
    choice2:"Troll",
    choice3:"Black Hat Hacker",
    answer: 1,
  },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
