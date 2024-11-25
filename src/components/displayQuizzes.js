import { startQuiz } from "./startQuiz";

// دالة لعرض قائمة الكويزات
export const displayQuizzes = (quizzes) => {
    const quizzesList = document.getElementById('quizzesList');
    quizzesList.innerHTML = ''; // مسح القائمة السابقة

    quizzes.forEach(quiz => {
        const quizItem = document.createElement('div');
        quizItem.className = 'quiz-item';
        quizItem.innerHTML = `
            <h4>${quiz.title}</h4>
            <p>الصعوبة: ${quiz.difficulty}</p>
            <p>الدرجة: ${quiz.maxScore}</p>
            <button id="startQuiz-${quiz.id}">ابدأ الكويز</button>
        `;
        quizzesList.appendChild(quizItem);

        const startButton = document.getElementById(`startQuiz-${quiz.id}`);
        startButton.addEventListener("click", async () => await startQuiz(quiz.id));
    
    });
};