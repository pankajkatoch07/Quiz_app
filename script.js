/* dom elements */

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-begin");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("number-question");
const scoreSpan = document.getElementById("Score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


// array of objects for the questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false; // because if we double click on it we don't want another score

totalQuestionsSpan.textContent = quizQuestions.length;
// maxScoreSpan.textContent = quizQuestions.length; 

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");


    //on click the start button
    showQuestions()
}



function showQuestions() {
    // reset the state
    answersDisabled = false;

    //var to store the current question number

    const currentQuestion = quizQuestions[currentQuestionIndex]

    //displaying the number according to question

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    //update the progress bar
    // 20% to 100%like this 0 / 5 *100 0 // 1/5 *100 = 20% // like this
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;



    // todo: if we remove this then previous button/answers  will not get removed from the page it will cause problem
    answersContainer.innerHTML = "";

    //explain we are adding buttons with the options
    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // dataset is a property of button that allows you to store custom data and access it
        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);
    });

}

function selectAnswer(event) {
    // optimization check only
    if (answersDisabled) return

    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"; //using button dataset property


    //here we are converting answersContainer into an array cause it will help us use for each method and access each button answers.Container is an nodelist that's a problem for using forEach
    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        // check if there are more question or if the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestions();
        } else {
            showResults()
        }
    }, 1000);

}


function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great Job! You know your stuff!";
    }
    else if (percentage >= 60) {
        resultMessage.textContent = "Good Effort! Keep learning";
    }
    else if (percentage >= 40) {
        resultMessage.textContent = "Not Bad! try to improve!";
    }else {
        resultMessage.textContent = "Keep studying! You'll get better";
    }
}

//event listener is at the start
function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}













