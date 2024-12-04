
import { fetchQuizzes } from "../services/api";
import { displayQuizzes } from "./displayQuizzes"; 

export const showQuizzes = async () => {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="container-sm align-content-center justify-content-center my-2 border border-1" lang='ar' dir='auto'>
            <h5 class=" text-info text-sm-center my-1 ">اختر اختبار لحله</h5>
            <label for='difficultyFilter'>تصفية حسب الصعوبة:
                <select id="difficultyFilter">
                    <option value="all">الكل</option>
                    <option value="Easy">سهل</option>
                    <option value="Medium">متوسط</option>
                    <option value="Hard">صعب</option>
                </select>
            </label>
            <div id="quizzesList"></div>
        </div>
    `;

    // استدعاء API لجلب قائمة الكويزات
    const quizzes = await fetchQuizzes();

    // عرض الكويزات
    displayQuizzes(quizzes);

    // إضافة حدث التصفية
    document.getElementById("difficultyFilter").addEventListener("change", (e) => {
        const difficulty = e.target.value;
        const filteredQuizzes = difficulty === "all" ?
         quizzes : quizzes.filter(q => q.difficulty === difficulty);
         console.log("Filtered Quizzes:", filteredQuizzes);  // عرض الكويزات المفلترة في الكونسول

        displayQuizzes(filteredQuizzes);
    });
};
