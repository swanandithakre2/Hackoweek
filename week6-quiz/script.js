const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Michelangelo"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Ag", "Au", "Fe", "Cu"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function initQuiz() {
    document.getElementById('totalQuestions').textContent = questions.length;
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestion];
    
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('progress').style.width = ((currentQuestion + 1) / questions.length * 100) + '%';
    
    document.getElementById('questionText').textContent = q.question;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = q.options.map((option, index) => `
        <div class="option" onclick="selectOption(${index})">
            <span class="option-marker">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
        </div>
    `).join('');
    
    document.getElementById('nextBtn').disabled = true;
    selectedAnswer = null;
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    options[index].classList.add('selected');
    selectedAnswer = index;
    
    document.getElementById('nextBtn').disabled = false;
}

function nextQuestion() {
    const options = document.querySelectorAll('.option');
    const q = questions[currentQuestion];
    
    if (selectedAnswer === q.correct) {
        options[selectedAnswer].classList.add('correct');
        score++;
    } else {
        options[selectedAnswer].classList.add('incorrect');
        options[q.correct].classList.add('correct');
    }
    
    options.forEach(opt => opt.classList.add('disabled'));
    
    setTimeout(() => {
        currentQuestion++;
        
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1200);
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('resultBox').style.display = 'block';
    
    document.getElementById('scoreValue').textContent = score;
    
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');
    
    if (score === 5) {
        resultMessage.textContent = "Perfect! You're a quiz master!";
    } else if (score >= 3) {
        resultMessage.textContent = "Great job! You did well!";
    } else {
        resultMessage.textContent = "Keep practicing! You'll do better next time!";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('quizContent').style.display = 'block';
    
    initQuiz();
}

document.addEventListener('DOMContentLoaded', initQuiz);
