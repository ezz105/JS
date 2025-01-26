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

// ===================== تعريف الفئات =====================
const CATEGORIES = {
    BASICS: "الأساسيات",
    FUNCTIONS: "الدوال",
    ARRAYS: "المصفوفات",
    OBJECTS: "الكائنات",
    DOM: "DOM",
    ASYNC: "البرمجة غير المتزامنة",
    ES6: "ES6+"
};

// ===================== الأسئلة =====================
const questions = [
    // فئة الأساسيات - سهل
    {
        question: "ما هي دالة الـ 'console.log()' في JavaScript؟",
        answers: ["طباعة نص في المتصفح", "طباعة نص في الكونسول", "إنشاء متغير"],
        correct: 1,
        difficulty: "easy",
        category: CATEGORIES.BASICS,
        explanation: "دالة console.log() هي أداة أساسية للتصحيح في JavaScript، تستخدم لطباعة القيم في وحدة تحكم المتصفح.",
        codeExample: `// مثال على استخدام console.log
let name = "أحمد";
console.log("مرحباً " + name);`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/API/Console/log"
    },
    {
        question: "ما هو الفرق بين let و var؟",
        answers: [
            "let يمكن إعادة تعريفه، var لا يمكن",
            "let له نطاق block scope، var له function scope",
            "var أحدث من let"
        ],
        correct: 1,
        difficulty: "easy",
        category: CATEGORIES.BASICS,
        explanation: "let يتميز بنطاق Block scope مما يجعله أكثر أماناً وقابلية للتنبؤ.",
        codeExample: `if (true) {
    let x = 1;
    var y = 2;
}
// console.log(x); // خطأ: x غير معرف
console.log(y); // يعمل: 2`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Statements/let"
    },
    // فئة المصفوفات - سهل
    {
        question: "كيف تضيف عنصراً إلى نهاية مصفوفة؟",
        answers: ["array.push()", "array.add()", "array.append()"],
        correct: 0,
        difficulty: "easy",
        category: CATEGORIES.ARRAYS,
        explanation: "دالة push() تضيف عنصراً أو أكثر إلى نهاية المصفوفة وتعيد الطول الجديد.",
        codeExample: `const fruits = ['تفاح', 'موز'];
fruits.push('برتقال');
console.log(fruits); // ['تفاح', 'موز', 'برتقال']`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Global_Objects/Array/push"
    },
    // فئة الدوال - متوسط
    {
        question: "ما هي الدالة السهمية (Arrow Function)؟",
        answers: [
            "دالة تحتوي على سهم في اسمها",
            "اختصار لكتابة الدوال العادية",
            "دالة تعمل فقط مع المصفوفات"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.FUNCTIONS,
        explanation: "الدوال السهمية هي طريقة مختصرة لكتابة الدوال في ES6، وتتميز بسلوك مختلف لـ this.",
        codeExample: `// دالة عادية
function add(a, b) {
    return a + b;
}

// دالة سهمية مكافئة
const add = (a, b) => a + b;`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Functions/Arrow_functions"
    },
    // فئة الكائنات - متوسط
    {
        question: "ما هو Destructuring في JavaScript؟",
        answers: [
            "تدمير الكائنات",
            "استخراج قيم من الكائنات والمصفوفات",
            "إنشاء نسخة من الكائن"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.OBJECTS,
        explanation: "Destructuring هو تعبير يسمح باستخراج قيم من الكائنات أو المصفوفات وتعيينها لمتغيرات.",
        codeExample: `const user = { name: 'علي', age: 25 };
const { name, age } = user;
console.log(name); // 'علي'

const numbers = [1, 2, 3];
const [first, second] = numbers;
console.log(first); // 1`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
    },
    // فئة DOM - متوسط
    {
        question: "ما هو Event Delegation؟",
        answers: [
            "تأخير تنفيذ الحدث",
            "تفويض معالجة الأحداث للعنصر الأب",
            "إلغاء الحدث"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.DOM,
        explanation: "Event Delegation هو نمط برمجي يسمح بمعالجة الأحداث في العنصر الأب بدلاً من إضافة مستمعات لكل عنصر ابن.",
        codeExample: `// بدون Event Delegation
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

// مع Event Delegation
container.addEventListener('click', e => {
    if (e.target.matches('button')) {
        handleClick(e);
    }
});`,
        learnMoreUrl: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_delegation"
    },
    // فئة البرمجة غير المتزامنة - صعب
    {
        question: "ما هو الفرق بين Promise و async/await؟",
        answers: [
            "لا يوجد فرق",
            "async/await هو تحسين نحوي للتعامل مع Promises",
            "Promise أحدث من async/await"
        ],
        correct: 1,
        difficulty: "hard",
        category: CATEGORIES.ASYNC,
        explanation: "async/await هو تحسين نحوي يجعل التعامل مع Promises أسهل وأكثر وضوحاً، لكنه يعمل على نفس المبدأ.",
        codeExample: `// باستخدام Promise
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// باستخدام async/await
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Statements/async_function"
    },
    // المزيد من أسئلة الأساسيات
    {
        question: "ما هو الفرق بين null و undefined في JavaScript؟",
        answers: [
            "لا يوجد فرق",
            "undefined تعني أن المتغير غير معرف، null تعني أن المتغير فارغ عمداً",
            "null تعني أن المتغير غير معرف، undefined تعني أن المتغير فارغ"
        ],
        correct: 1,
        difficulty: "easy",
        category: CATEGORIES.BASICS,
        explanation: "undefined يشير إلى متغير تم تعريفه ولكن لم يتم تعيين قيمة له، بينما null هي قيمة يتم تعيينها عمداً لتشير إلى عدم وجود قيمة.",
        codeExample: `let x;
console.log(x); // undefined

let y = null;
console.log(y); // null

console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object' (هذا خطأ تاريخي في JavaScript)`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Global_Objects/null"
    },
    // المزيد من أسئلة المصفوفات
    {
        question: "ما هي طريقة filter في المصفوفات؟",
        answers: [
            "تقوم بتغيير كل عناصر المصفوفة",
            "تقوم بإنشاء مصفوفة جديدة تحتوي على العناصر التي تحقق شرطاً معيناً",
            "تقوم بحذف العناصر من المصفوفة"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.ARRAYS,
        explanation: "طريقة filter() تنشئ مصفوفة جديدة تحتوي فقط على العناصر التي تجتاز اختبار دالة معينة.",
        codeExample: `const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

const users = [
    { name: 'علي', age: 25 },
    { name: 'محمد', age: 17 },
    { name: 'أحمد', age: 30 }
];
const adults = users.filter(user => user.age >= 18);`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
    },
    // المزيد من أسئلة ES6
    {
        question: "ما هو Template Literal في JavaScript؟",
        answers: [
            "نوع جديد من المصفوفات",
            "طريقة لكتابة النصوص باستخدام `` مع إمكانية تضمين متغيرات",
            "دالة لتنسيق النصوص"
        ],
        correct: 1,
        difficulty: "easy",
        category: CATEGORIES.ES6,
        explanation: "Template Literals تسمح بكتابة النصوص باستخدام علامات `` وتضمين متغيرات وتعبيرات JavaScript باستخدام ${}.",
        codeExample: `const name = 'أحمد';
const age = 25;

// الطريقة التقليدية
console.log('اسمي ' + name + ' وعمري ' + age);

// باستخدام Template Literals
console.log(\`اسمي \${name} وعمري \${age}\`);

// يمكن أيضاً كتابة نصوص متعددة الأسطر
const html = \`
    <div>
        <h1>\${name}</h1>
        <p>\${age}</p>
    </div>
\`;`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Template_literals"
    },
    // المزيد من أسئلة DOM
    {
        question: "ما هو الفرق بين innerHTML و textContent؟",
        answers: [
            "لا يوجد فرق بينهما",
            "innerHTML يتعامل مع HTML، textContent يتعامل مع النص فقط",
            "textContent أسرع دائماً"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.DOM,
        explanation: "innerHTML يقوم بتفسير النص كـ HTML ويمكنه إضافة عناصر HTML، بينما textContent يتعامل مع النص فقط وأكثر أماناً ضد هجمات XSS.",
        codeExample: `const div = document.querySelector('div');

// باستخدام innerHTML
div.innerHTML = '<strong>مرحباً</strong>'; // يظهر النص بخط عريض

// باستخدام textContent
div.textContent = '<strong>مرحباً</strong>'; // يظهر النص كما هو مع العلامات`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/API/Node/textContent"
    },
    // المزيد من أسئلة الدوال
    {
        question: "ما هي الدالة المجهولة (Anonymous Function)؟",
        answers: [
            "دالة بدون اسم",
            "دالة لا يمكن استدعاؤها",
            "دالة تعمل مرة واحدة فقط"
        ],
        correct: 0,
        difficulty: "medium",
        category: CATEGORIES.FUNCTIONS,
        explanation: "الدالة المجهولة هي دالة بدون اسم، غالباً ما تستخدم كوسيط لدوال أخرى أو في التعبيرات الفورية.",
        codeExample: `// دالة مجهولة كمعالج حدث
button.addEventListener('click', function() {
    console.log('تم النقر على الزر');
});

// دالة مجهولة مع arrow function
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);

// التعبير الفوري للدالة المجهولة (IIFE)
(function() {
    console.log('تم التنفيذ فوراً');
})();`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Functions"
    },
    // المزيد من أسئلة الكائنات
    {
        question: "ما هو Object.freeze() في JavaScript؟",
        answers: [
            "دالة لحذف الكائن",
            "دالة لمنع أي تعديلات على الكائن",
            "دالة لنسخ الكائن"
        ],
        correct: 1,
        difficulty: "hard",
        category: CATEGORIES.OBJECTS,
        explanation: "Object.freeze() يجعل الكائن غير قابل للتعديل: لا يمكن إضافة أو حذف أو تعديل خصائصه.",
        codeExample: `const user = {
    name: 'أحمد',
    age: 25
};

Object.freeze(user);

// لن تعمل هذه التعديلات
user.name = 'محمد';     // لن يتغير
user.email = 'test@example.com';  // لن تضاف
delete user.age;        // لن يحذف

console.log(user); // { name: 'أحمد', age: 25 }`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze"
    },
    // المزيد من أسئلة البرمجة غير المتزامنة
    {
        question: "ما هو Promise.all()؟",
        answers: [
            "دالة تنتظر اكتمال جميع الوعود",
            "دالة تنتظر اكتمال أول وعد",
            "دالة لإلغاء جميع الوعود"
        ],
        correct: 0,
        difficulty: "hard",
        category: CATEGORIES.ASYNC,
        explanation: "Promise.all() تأخذ مصفوفة من الوعود وتعيد وعداً جديداً يكتمل عندما تكتمل جميع الوعود أو يفشل إذا فشل أي منها.",
        codeExample: `// مثال لتحميل بيانات متعددة
const promises = [
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
];

try {
    const [users, posts, comments] = await Promise.all(promises);
    console.log('تم تحميل جميع البيانات');
} catch (error) {
    console.error('فشل في تحميل البيانات:', error);
}`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
    },
    // تحديث أسئلة DOM مع أمثلة تفاعلية
    {
        question: "كيف تنشئ عنصر DOM جديد وتضيفه للصفحة؟",
        answers: [
            "باستخدام innerHTML فقط",
            "باستخدام createElement و appendChild",
            "باستخدام insertHTML"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.DOM,
        explanation: "إنشاء عناصر DOM يتم باستخدام createElement، ثم إضافتها للصفحة باستخدام appendChild أو أي طريقة إدراج أخرى.",
        codeExample: `// إنشاء بطاقة تفاعلية
function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card p-4 bg-white shadow-lg rounded-lg';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'text-xl font-bold mb-2';
    titleEl.textContent = title;
    
    const contentEl = document.createElement('p');
    contentEl.textContent = content;
    
    const likeBtn = document.createElement('button');
    likeBtn.className = 'mt-2 px-4 py-2 bg-blue-500 text-white rounded';
    likeBtn.textContent = 'أعجبني';
    
    let likes = 0;
    likeBtn.onclick = () => {
        likes++;
        likeBtn.textContent = \`أعجبني (\${likes})\`;
    };
    
    card.append(titleEl, contentEl, likeBtn);
    document.body.appendChild(card);
}

// استخدام الدالة
createCard('عنوان البطاقة', 'محتوى البطاقة التجريبي');`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/API/Document/createElement"
    },
    // تحديث أسئلة المصفوفات مع مثال تفاعلي
    {
        question: "كيف تستخدم طريقة map مع المصفوفات؟",
        answers: [
            "لتصفية العناصر",
            "لتحويل كل عنصر إلى شكل جديد",
            "لترتيب العناصر"
        ],
        correct: 1,
        difficulty: "medium",
        category: CATEGORIES.ARRAYS,
        explanation: "طريقة map تنشئ مصفوفة جديدة بنفس الطول، حيث يتم تحويل كل عنصر حسب الدالة المعطاة.",
        codeExample: `// مثال تفاعلي لتحويل درجات الحرارة
const celsius = [0, 10, 20, 30, 40];

// تحويل من سيليزيوس إلى فهرنهايت
function celsiusToFahrenheit(c) {
    return (c * 9/5) + 32;
}

const fahrenheit = celsius.map(celsiusToFahrenheit);

// إنشاء جدول درجات الحرارة
function createTemperatureTable() {
    const table = document.createElement('table');
    table.className = 'w-full border-collapse border';
    
    // إضافة الرأس
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['سيليزيوس', 'فهرنهايت'].forEach(text => {
        const th = document.createElement('th');
        th.className = 'border p-2 bg-gray-100';
        th.textContent = text;
        headerRow.appendChild(th);
    });
    
    // إضافة البيانات
    celsius.forEach((c, i) => {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        
        cell1.className = 'border p-2 text-center';
        cell2.className = 'border p-2 text-center';
        
        cell1.textContent = \`\${c}°C\`;
        cell2.textContent = \`\${fahrenheit[i].toFixed(1)}°F\`;
    });
    
    return table;
}`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
    },
    // تحديث أسئلة ES6 مع مثال تفاعلي
    {
        question: "كيف تستخدم Destructuring مع الكائنات والمصفوفات؟",
        answers: [
            "فقط مع المصفوفات",
            "فقط مع الكائنات",
            "مع كل من الكائنات والمصفوفات"
        ],
        correct: 2,
        difficulty: "medium",
        category: CATEGORIES.ES6,
        explanation: "Destructuring هو أسلوب ES6 يسمح باستخراج قيم من الكائنات والمصفوفات بطريقة مختصرة وأنيقة.",
        codeExample: `// مثال تفاعلي لإدارة ملف شخصي
class Profile {
    constructor(data) {
        this.data = data;
    }
    
    // استخدام Destructuring في معالجة البيانات
    displayProfile() {
        const { name, age, skills = [] } = this.data;
        const [primarySkill = 'لا يوجد', ...otherSkills] = skills;
        
        const container = document.createElement('div');
        container.className = 'profile-card p-4 bg-white shadow rounded';
        
        container.innerHTML = \`
            <h2 class="text-xl font-bold">\${name}</h2>
            <p class="text-gray-600">العمر: \${age}</p>
            <div class="skills mt-3">
                <h3 class="font-bold">المهارات:</h3>
                <p>المهارة الرئيسية: \${primarySkill}</p>
                <p>المهارات الأخرى: \${otherSkills.join(', ') || 'لا يوجد'}</p>
            </div>
            <button class="edit-btn mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                تعديل
            </button>
        \`;
        
        // إضافة تفاعلية
        const editBtn = container.querySelector('.edit-btn');
        editBtn.onclick = () => {
            const newSkill = prompt('أضف مهارة جديدة:');
            if (newSkill) {
                this.data.skills = [...(this.data.skills || []), newSkill];
                container.replaceWith(this.displayProfile());
            }
        };
        
        return container;
    }
}

// مثال للاستخدام
const userData = {
    name: 'أحمد',
    age: 25,
    skills: ['JavaScript', 'React', 'Node.js']
};

const profile = new Profile(userData);
// profile.displayProfile() // لإضافة العنصر للصفحة`,
        learnMoreUrl: "https://developer.mozilla.org/ar/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
    }
];

// ===================== دالة لاختيار أسئلة عشوائية حسب المستوى والفئة =====================
function selectRandomQuestions(difficulty, category = null, count = 5) {
    let filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    
    if (category) {
        filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }
    
    // خلط الأسئلة
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    
    // إرجاع العدد المطلوب من الأسئلة
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// ===================== وظائف اللعبة الأساسية =====================
function startGame(difficulty) {
    gameState.reset();
    gameState.difficulty = difficulty;
    
    // اختيار أسئلة عشوائية من كل الفئات
    gameState.activeQuestions = selectRandomQuestions(difficulty);
    
    UI.welcomeScreen.classList.add('hidden');
    UI.gameInfo.classList.remove('hidden');
    loadQuestion();
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