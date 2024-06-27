function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function (answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function () {
    return this.currentQuestionIndex >= this.questions.length;
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
};

const QuizUI = {
    displayNext: function () {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function () {
        this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function () {
        const choices = quiz.getCurrentQuestion().choices;
        for (let i = 0; i < choices.length; i++) {
            this.populateIdWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function () {
        const gameOverHTML = `
            <h1>Quiz Completed</h1>
            <h2>Your score: ${quiz.score}</h2>
        `;
        this.populateIdWithHTML("quiz", gameOverHTML);
    },
    displayProgress: function () {
        const currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML("progress", `Question ${currentQuestionNumber} of ${quiz.questions.length}`);
    },
    populateIdWithHTML: function (id, text) {
        const element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function (id, guess) {
        const button = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    }
};

// Create questions here
const questions = [
    new Question("What is the capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], "Paris"),
    new Question("Who is the CEO of Tesla?", ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"], "Elon Musk"),
    new Question("What is the currency of Japan?", ["Dollar", "Euro", "Yen", "Won"], "Yen"),
    new Question("What is the largest planet in our solar system?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter")
];

// Initialize quiz
const quiz = new Quiz(questions);

// Display the quiz
QuizUI.displayNext();
