// ===================== تعريف العناصر الرئيسية =====================
const UI = {
    welcomeScreen: document.getElementById('welcome-screen'),
    showLevelsBtn: document.getElementById('show-levels-btn'),
    levelsContainer: document.getElementById('levels'),
    gameInfo: document.getElementById('game-info'),
    question: document.getElementById('question'),
    answers: document.getElementById('answers'),
    score: document.getElementById('score'),
    progress: document.querySelector('.progress-container'),
    nextBtn: document.getElementById('next-btn'), // تعريف عنصر زر التالي
    
    // إضافة دوال مساعدة للواجهة
    showElement(element) {
        element.style.display = element.tagName === 'DIV' ? 'flex' : 'block';
    },
    
    hideElement(element) {
        element.style.display = 'none';
    },
    
    updateScore(score) {
        this.score.textContent = `النقاط: ${score}`;
    },
    
    // إضافة تأثيرات حركية
    fadeOut(element, duration = 500) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        setTimeout(() => this.hideElement(element), duration);
    },
    
    fadeIn(element, duration = 500) {
        this.showElement(element);
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transition = `opacity ${duration}ms ease`;
        }, 50);
    },
    
    shake(element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
    }
};

// ===================== حالة اللعبة =====================
const gameState = {
    currentQuestion: 0,
    score: 0,
    activeQuestions: [],
    difficulty: null,
    
    // إضافة دوال لإدارة الحالة
    reset() {
        this.currentQuestion = 0;
        this.score = 0;
        this.activeQuestions = [];
        this.difficulty = null;
    },
    
    addScore(points) {
        this.score += points;
        UI.updateScore(this.score);
        // إضافة تأثير حركي عند زيادة النقاط
        UI.score.classList.add('score-up');
        setTimeout(() => UI.score.classList.remove('score-up'), 500);
    }
};

// ===================== الإنجازات =====================
const achievements = {
    beginner: { 
        name: "مبتدئ", 
        description: "أكملت جميع الأسئلة السهلة", 
        unlocked: false 
    },
    intermediate: { 
        name: "متوسط", 
        description: "أكملت جميع الأسئلة المتوسطة", 
        unlocked: false 
    },
    expert: { 
        name: "خبير", 
        description: "أكملت جميع الأسئلة الصعبة", 
        unlocked: false 
    },
    perfect: { 
        name: "مثالي", 
        description: "حصلت على العلامة الكاملة في مستوى كامل", 
        unlocked: false 
    }
};

// ===================== الأسئلة =====================
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
    },
    // المستوى المتقدم - مواضيع متقدمة
{
    question: "ما هو الفرق بين synchronous و asynchronous في JavaScript؟",
    answers: [
        "synchronous ينفذ العمليات بالتتابع، asynchronous ينفذها بشكل غير متزامن",
        "asynchronous ينفذ العمليات بالتتابع، synchronous ينفذها بشكل غير متزامن",
        "لا يوجد فرق بينهما"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الفرق بين setTimeout و setInterval؟",
    answers: [
        "setTimeout ينفذ دالة مرة واحدة بعد تأخير زمني، setInterval ينفذها بشكل متكرر",
        "setInterval ينفذ دالة مرة واحدة بعد تأخير زمني، setTimeout ينفذها بشكل متكرر",
        "كلاهما ينفذان الدالة بشكل متكرر"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الفرق بين call و apply و bind في JavaScript؟",
    answers: [
        "call و apply تستخدمان لاستدعاء الدالة مع تحديد this، بينما bind تُرجع دالة جديدة",
        "apply و bind تستخدمان لاستدعاء الدالة مع تحديد this، بينما call تُرجع دالة جديدة",
        "call و bind تستخدمان لاستدعاء الدالة مع تحديد this، بينما apply تُرجع دالة جديدة"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الفرق بين prototype و __proto__ في JavaScript؟",
    answers: [
        "__proto__ هو خاصية تشير إلى prototype للكائن، بينما prototype هو خاصية خاصة بالدوال",
        "prototype هو خاصية تشير إلى __proto__ للكائن، بينما __proto__ هو خاصية خاصة بالدوال",
        "لا يوجد فرق بينهما"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الـ Destructuring في JavaScript؟",
    answers: [
        "طريقة لاستخراج البيانات من الكائنات أو المصفوفات",
        "طريقة لتدمير الكائنات أو المصفوفات",
        "طريقة لإنشاء كائنات أو مصفوفات جديدة"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الفرق بين let و var و const في JavaScript؟",
    answers: [
        "let و const تُعرفان بblock-scoped، بينما var تُعرف بfunction-scoped",
        "var و const تُعرفان بblock-scoped، بينما let تُعرف بfunction-scoped",
        "let و var تُعرفان بblock-scoped، بينما const تُعرف بfunction-scoped"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الـ Spread Operator في JavaScript؟",
    answers: [
        "يعمل على نسخ عناصر من كائن أو مصفوفة إلى كائن أو مصفوفة أخرى",
        "يعمل على حذف عناصر من كائن أو مصفوفة",
        "يعمل على إضافة عناصر إلى كائن أو مصفوفة"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الـ Rest Parameter في JavaScript؟",
    answers: [
        "يسمح بتمرير عدد غير محدد من الوسائط إلى دالة",
        "يسمح بحذف الوسائط من دالة",
        "يسمح بتغيير ترتيب الوسائط في دالة"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الـ Proxy في JavaScript؟",
    answers: [
        "يسمح لك بإنشاء كائنات مخصصة للتحكم في الوصول إلى الكائنات الأخرى",
        "يسمح لك بحذف الكائنات",
        "يسمح لك بإنشاء كائنات جديدة"
    ],
    correct: 0,
    difficulty: "hard"
},
{
    question: "ما هو الـ Reflect في JavaScript؟",
    answers: [
        "يوفر طرقًا للوصول إلى الخصائص الداخلية للكائنات",
        "يوفر طرقًا لحذف الخصائص من الكائنات",
        "يوفر طرقًا لإنشاء كائنات جديدة"
    ],
    correct: 0,
    difficulty: "hard"
}
];

// ===================== وظائف اللعبة الأساسية =====================
function startGame(difficulty) {
    gameState.reset();
    gameState.difficulty = difficulty;
    gameState.activeQuestions = questions.filter(q => q.difficulty === difficulty);
    
    UI.updateScore(0);
    updateProgress();
    loadQuestion();
    
    // إضافة تأثير بداية اللعبة
    UI.fadeIn(UI.gameInfo);
}

function loadQuestion() {
    if (gameState.currentQuestion >= gameState.activeQuestions.length) {
        endGame();
        return;
    }

    const currentQ = gameState.activeQuestions[gameState.currentQuestion];
    UI.question.textContent = currentQ.question;
    
    // Clear previous answers
    UI.answers.innerHTML = '';
    
    // Create answer buttons
    currentQ.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.className = 'answer-btn py-2 px-4 bg-white border-2 border-gray-300 rounded hover:bg-gray-100 transition-all duration-300';
        button.onclick = () => checkAnswer(index);
        UI.answers.appendChild(button);
    });

    updateProgress();
}

function checkAnswer(selectedIndex) {
    const currentQ = gameState.activeQuestions[gameState.currentQuestion];
    const correctIndex = currentQ.correct;
    const answerButtons = UI.answers.querySelectorAll('.answer-btn');
    
    // Disable all answer buttons
    answerButtons.forEach(button => button.disabled = true);
    
    if (selectedIndex === correctIndex) {
        // Correct answer
        answerButtons[selectedIndex].classList.add('correct');
        gameState.addScore(10);
    } else {
        // Wrong answer
        answerButtons[selectedIndex].classList.add('wrong');
        answerButtons[correctIndex].classList.add('correct');
    }
    
    // Show next button
    UI.showElement(UI.nextBtn);
}

// ===================== وظائف التوقيت والتقدم =====================
function updateProgress() {
    const progress = ((gameState.currentQuestion + 1) / gameState.activeQuestions.length) * 100;
    const progressElement = document.getElementById('progress');
    
    // إضافة تأثير حركي لشريط التقدم
    progressElement.style.transition = 'width 0.5s ease';
    progressElement.style.width = `${progress}%`;
    progressElement.textContent = `${gameState.currentQuestion + 1}/${gameState.activeQuestions.length}`;
}

// ===================== التحقق من الإجابات والنتائج =====================
function endGame() {
    const totalQuestions = gameState.activeQuestions.length;
    const percentage = (gameState.score / (totalQuestions * 10)) * 100;
    
    checkAchievements();
    
    UI.question.innerHTML = `
        <div class="end-game-stats">
            <h2>انتهت اللعبة!</h2>
            <p>النتيجة النهائية: ${gameState.score} من ${totalQuestions * 10}</p>
            <p>النسبة المئوية: ${percentage}%</p>
            <div class="suggestions">
                <h3>اقتراحات للتحسين:</h3>
                <ul>
                    ${getSuggestions(percentage)}
                </ul>
            </div>
            <button class="btn restart-btn" onclick="location.reload()">العب مرة أخرى</button>
        </div>
    `;
}

// ===================== التحقق من الإنجازات =====================
function checkAchievements() {
    const levelScores = {
        easy: 0,
        medium: 0,
        hard: 0
    };

    gameState.activeQuestions.forEach((q, index) => {
        if (gameState.score > index * 10) {
            levelScores[q.difficulty]++;
        }
    });

    // التحقق من إكمال المستويات
    if (levelScores.easy === questions.filter(q => q.difficulty === 'easy').length) {
        achievements.beginner.unlocked = true;
    }
    if (levelScores.medium === questions.filter(q => q.difficulty === 'medium').length) {
        achievements.intermediate.unlocked = true;
    }
    if (levelScores.hard === questions.filter(q => q.difficulty === 'hard').length) {
        achievements.expert.unlocked = true;
    }
    
    // التحقق من العلامة الكاملة
    if (Object.values(levelScores).some(score => score === questions.filter(q => q.difficulty === gameState.difficulty).length)) {
        achievements.perfect.unlocked = true;
    }
}

// ===================== اقتراحات للتحسين =====================
function getSuggestions(percentage) {
    if (percentage >= 90) {
        return `
            <li>ممتاز! جرب المستوى التالي</li>
            <li>ابحث عن مشاريع عملية لتطبيق ما تعلمته</li>
        `;
    } else if (percentage >= 70) {
        return `
            <li>جيد جداً! راجع الأسئلة التي أخطأت فيها</li>
            <li>اقرأ المزيد عن المواضيع المتقدمة</li>
        `;
    } else {
        return `
            <li>راجع المفاهيم الأساسية مرة أخرى</li>
            <li>جرب البدء بالمستوى الأسهل</li>
            <li>اقرأ توثيق JavaScript الرسمي</li>
        `;
    }
}

// ===================== مستمعات الأحداث =====================
UI.showLevelsBtn.addEventListener('click', () => {
    UI.welcomeScreen.style.opacity = '0';
    UI.welcomeScreen.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        UI.welcomeScreen.style.display = 'none';
        UI.levelsContainer.style.display = 'flex';
        UI.levelsContainer.style.opacity = '0';
        UI.levelsContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            UI.levelsContainer.style.opacity = '1';
            UI.levelsContainer.style.transform = 'translateY(0)';
            UI.levelsContainer.style.transition = 'all 0.5s ease';
        }, 50);
    }, 500);
});

document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedLevel = btn.dataset.level;
        UI.levelsContainer.style.display = "none";
        UI.gameInfo.style.display = "flex";
        UI.question.style.display = "block";
        UI.answers.style.display = "flex";
        UI.progress.style.display = "block";
        startGame(selectedLevel);
    });
});

// إضافة مستمع حدث لزر التالي
UI.nextBtn.addEventListener('click', () => {
    UI.nextBtn.classList.add('hidden');
    gameState.currentQuestion++;
    if (gameState.currentQuestion < gameState.activeQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
});