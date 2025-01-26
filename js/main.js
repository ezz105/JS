const questions = [
    // المستوى السهل - أساسيات JavaScript
    {
        question: "ما هي دالة الـ 'console.log()' في JavaScript؟",
        answers: ["طباعة نص في المتصفح", "طباعة نص في الكونسول", "إنشاء متغير"],
        correct: 1,
        difficulty: "easy"
    },
    {
        question: "كيف تُعلن عن متغير ثابت (لا يتغير قيمته)؟",
        answers: ["var", "let", "const"],
        correct: 2,
        difficulty: "easy"
    },
    {
        question: "كيف تكتب تعليق على سطر واحد في JavaScript؟",
        answers: ["/* تعليق */", "// تعليق", "<!-- تعليق -->"],
        correct: 1,
        difficulty: "easy"
    },
    {
        question: "أي من التالي يُعتبر اسم صحيح لمتغير في JavaScript؟",
        answers: ["1variable", "$price", "my-var"],
        correct: 1,
        difficulty: "easy"
    },
    // المستوى المتوسط - المفاهيم المتقدمة
    {
        question: "ما هو الفرق بين == و === في JavaScript؟",
        answers: ["لا يوجد فرق", "=== يقارن القيمة والنوع", "== أكثر أماناً"],
        correct: 1,
        difficulty: "medium"
    },
    {
        question: "ما هو الناتج من العملية '2' + 2 في JavaScript؟",
        answers: ["4", "'22'", "error"],
        correct: 1,
        difficulty: "medium"
    },
    {
        question: "ماذا يُرجع typeof null؟",
        answers: ["null", "undefined", "object"],
        correct: 2,
        difficulty: "medium"
    },
    {
        question: "كيف تعمل خاصية hoisting في JavaScript؟",
        answers: [
            "رفع تعريفات المتغيرات والدوال لأعلى النطاق",
            "رفع قيم المتغيرات فقط",
            "رفع استدعاءات الدوال فقط"
        ],
        correct: 0,
        difficulty: "medium"
    },
    // المستوى الصعب - مواضيع متقدمة
    {
        question: "ما هو الـ Closure في JavaScript؟",
        answers: [
            "دالة تغلق المتصفح",
            "دالة داخلية تحتفظ بمتغيرات الدالة الخارجية",
            "دالة تغلق الاتصال بقاعدة البيانات"
        ],
        correct: 1,
        difficulty: "hard"
    },
    {
        question: "ما هو الـ Promise في JavaScript؟",
        answers: [
            "كائن يمثل قيمة قد تكون غير متوفرة الآن",
            "وعد بتنفيذ الكود بشكل صحيح",
            "دالة تعيد قيمة فورية"
        ],
        correct: 0,
        difficulty: "hard"
    },
    {
        question: "ما هو الـ Event Loop في JavaScript؟",
        answers: [
            "حلقة تكرارية عادية",
            "آلية لتنفيذ العمليات المتزامنة",
            "نمط تصميم للأحداث"
        ],
        correct: 1,
        difficulty: "hard"
    },
    {
        question: "ما هو الفرق بين map و forEach؟",
        answers: [
            "map تعيد مصفوفة جديدة، forEach لا تعيد شيئاً",
            "forEach أسرع دائماً",
            "لا يوجد فرق في الاستخدام"
        ],
        correct: 0,
        difficulty: "hard"
    },
    {
        question: "ما هو async/await في JavaScript؟",
        answers: [
            "طريقة للتعامل مع العمليات غير المتزامنة",
            "دوال عادية",
            "طريقة لإيقاف تنفيذ البرنامج"
        ],
        correct: 0,
        difficulty: "hard"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerId;
let activeQuestions = [];
let progressBar;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const progressElement = document.getElementById("progress");

function startGame(difficulty) {
    activeQuestions = questions.filter(q => q.difficulty === difficulty);
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = "النقاط: 0";
    updateProgress();
    loadQuestion();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / activeQuestions.length) * 100;
    progressElement.style.width = `${progress}%`;
    progressElement.textContent = `${currentQuestion + 1}/${activeQuestions.length}`;
}

function loadQuestion() {
    if (currentQuestion >= activeQuestions.length) {
        endGame();
        return;
    }
    
    clearInterval(timerId);
    timeLeft = 30;
    timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
    
    const q = activeQuestions[currentQuestion];
    questionElement.textContent = q.question;
    answersElement.innerHTML = "";
    
    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersElement.appendChild(button);
    });
    
    updateProgress();
    startTimer();
}

function endGame() {
    questionElement.textContent = `انتهت اللعبة! نتيجتك النهائية: ${score}`;
    answersElement.innerHTML = `
        <button class="btn" onclick="location.reload()">العب مرة أخرى</button>
    `;
    clearInterval(timerId);
    timerElement.textContent = "";
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            checkAnswer(-1);
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    clearInterval(timerId);
    const q = activeQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        buttons[selectedIndex].classList.add("correct");
        score += 10;
    } else {
        if (selectedIndex !== -1) buttons[selectedIndex].classList.add("wrong");
        buttons[q.correct].classList.add("correct");
    }

    scoreElement.textContent = `النقاط: ${score}`;

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1500);
}

document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedLevel = btn.dataset.level;
        startGame(selectedLevel);
    });
});

startGame("easy");