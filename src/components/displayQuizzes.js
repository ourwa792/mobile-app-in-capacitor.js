import { startQuiz } from "./startQuiz";

// دالة لعرض قائمة الكويزات
export const displayQuizzes = (quizzes) => {
    const quizzesList = document.getElementById('quizzesList');
    quizzesList.innerHTML = ''; // مسح القائمة السابقة

    quizzes.forEach(quiz => {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        quizItem.innerHTML = `
            <h5>${quiz.title}</h5>
            <p > <span style="color: orange"> الصعوبة: ${quiz.difficulty} </span> </p>
            <p> <span style="color: red"> الدرجة: ${quiz.maxScore} </span></p>
            <button class="btn btn-sm" id="startQuiz-${quiz.id}">ابدأ الاختبار</button>
        `;
        quizzesList.appendChild(quizItem);

        const startButton = document.getElementById(`startQuiz-${quiz.id}`);
        startButton.addEventListener("click", async () => await startQuiz(quiz.id));
    
    });
};