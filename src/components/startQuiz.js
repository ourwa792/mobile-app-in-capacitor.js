import { fetchQuizData, sendResultToServer } from "../services/api";
import { downloadCertificate } from "../helper/certificate";
import quizify from "quizify";

import renderMathInElement from 'katex/contrib/auto-render/auto-render.js'; 
//import "katex/dist/katex.css";


export const startQuiz = async (quizId) => {
    
    const correctSound = new Audio('/correct.mp3');
    const wrongSound = new Audio('/wronganswer.mp3');

    const data = await fetchQuizData(quizId); 

    const appContainer = document.getElementById('app');
    appContainer.innerHTML = 
    `<div class=" container-sm list-group-sm my-2" lang="ar" dir="auto" id="quizContainer">
    </div>`;

    const quizOptions = {
        questionContainerClass: "quizify-question-container",
        answerListClass: "quizify-answer-list",
        answerListItemClass: "quizify-answer-list-item",
        questionNextButtonClass: "quizify-button-next",
    };
    const quiz = new quizify(data.quizSchema, quizOptions);
    const quizContainer = document.getElementById('quizContainer');

    let correctAnswersCount = 0;
    // المفروض يجي محسوب من الباك
    const totalQuestions = data.maxScore;

    quiz.addEventListener('answerSelected', handleQuizMoveToNext);

    function handleQuizMoveToNext() {
        const question = quiz.getNext();
        //console.log('question is '+ JSON.stringify(question, null, 2))
        
        quizContainer.innerHTML = ''; // مسح المحتوى السابق

        if (question.type === 'question') {
            quizContainer.appendChild(question.data.dom_node);
            
            renderMathInElement(quizContainer, { delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
            }); 

            const answerOptions = quizContainer.querySelectorAll('.quizify-answer-list-item');
            answerOptions.forEach(el => el.classList.add("list-group-item-sm"))
            
            let answerSelected = false;

            answerOptions.forEach((option, index) => {
                option.addEventListener("input", () => {
                    if (answerSelected) return; // لمنع اختيار متعدد
                    answerSelected = true;

                    const selectedAnswer = question.data.answers[index];
                    //console.log('selectedAnswer is '+ JSON.stringify(selectedAnswer, null,2))
                    if (selectedAnswer.is_correct) {
                        correctAnswersCount++;
                        option.classList.add('bg-success-subtle');
                        //console.log('correctAnswersCount '+ correctAnswersCount) bg-info-subtle
                        correctSound.play();
                    } else {
                        option.classList.add('bg-danger-subtle');
                        wrongSound.play();
                    }

                    // تعطيل جميع الخيارات بعد الاختيار
                    answerOptions.forEach(opt => {
                        opt.style.pointerEvents = 'none';
                    });

                }, { once: true }); // تضمن أن الحدث يتم استدعاؤه مرة واحدة فقط
            });
     
        } 
        else if (question.type === 'result') {
        
            displayQuizSummary();
        } 
    }
    
    // دالة لعرض النتيجة النهائية
    async function displayQuizSummary() {
        const spinner = document.createElement('div');
  
        spinner.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;

        // إضافة السبينر إلى المحتوى
        quizContainer.appendChild(spinner);
        
        const certificateUrl = await sendResultToServer(correctAnswersCount, quizId);
        spinner.style.display = 'none';
       
        quizContainer.innerHTML = `
        <div class=" container-sm text-sm-center align-content-center justify-content-center my-2 border border-info border-1 rounded-2 shadow bi-emoji-smile" dir="auto" lang="ar">
                <h3>نتيجة الاختبار</h3>
                <p>  ${correctAnswersCount} من أصل ${totalQuestions} درجة </p>
                
                <p id = 'nocert'></p>
        </div>        
        `;
        

        const retryButton = document.createElement('button');
        retryButton.textContent = 'إعادة المحاولة';
        retryButton.className = 'quizify-button-retry';

        retryButton.addEventListener('click', () => startQuiz(quizId));
        quizContainer.appendChild(retryButton);


        if (certificateUrl) {
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'تنزيل الشهادة';
            downloadButton.className = 'btn btn-success';
    
            downloadButton.addEventListener('click', async () => {
                const spinner2 = document.createElement('div');
                spinner2.innerHTML = `
                <div class="d-flex justify-content-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                `;
        
                quizContainer.appendChild(spinner2);

                await downloadCertificate(certificateUrl)

                spinner2.style.display = "none"
            })

            quizContainer.appendChild(downloadButton);
            document.getElementById('nocert').innerText = 'لقد حصلت على شهادة, أحسنت' ;

        } else {
            document.getElementById('nocert').innerText = 'لم تحصل على شهادة' ;
        }        

    }

    // بدء عرض الكويز من السؤال الأول
    handleQuizMoveToNext();
};




/*
export const startQuiz = async (quizId) => {
    const Data = await fetchQuizData(quizId); // جلب بيانات الكويز من API

    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `<div id="quizContainer"></div>`;

    // تهيئة الكويز وعرضه باستخدام quizify
    
    const quizOptions = {
        questionContainerClass: "quizify-question-container",
        answerListClass: "quizify-answer-list",
        answerListItemClass: "quizify-answer-list-item",
        questionNextButtonClass: "quizify-button-next",
    };
    const quiz = new quizify(Data.quizSchema, quizOptions);
    const quizContainer = document.getElementById('quizContainer');

    function handleQuizMoveToNext() {
        const question = quiz.getNext();
        quizContainer.innerHTML = '';

        if (question.type === 'question') {
            quizContainer.appendChild(question.data.dom_node);
        } else if (question.type === 'result') {
            quizContainer.innerHTML = `
                <h3>نتيجة الكويز</h3>
                <p>${question.data.dom_node.innerText}</p>
                <button onclick="window.location.reload()">إعادة المحاولة</button>
            `;
        }
    }

    handleQuizMoveToNext();
    quiz.addEventListener('answerSelected', handleQuizMoveToNext);
};


*/



       /* 
            
            const answerOptions = quizContainer.querySelectorAll('.quizify-answer-list-item');
            let answerSelected = false; // لتتبع ما إذا تم اختيار إجابة
            answerOptions.forEach((option, index) => {
                option.addEventListener('click', () => {
                    if (answerSelected) return; // منع تكرار الاختيار
                    answerSelected = true;

                    const selectedAnswer = question.data.answers[index];

                    // عرض فيدباك وتعطيل الأزرار
                    if (selectedAnswer && selectedAnswer.is_correct) {
                        correctAnswersCount++;
                        option.classList.add('bg-success'); // نمط الإجابة الصحيحة
                        correctSound.play();
                    } else {
                        option.classList.add('bg-danger'); // نمط الإجابة الخاطئة
                        wrongSound.play();
                    }

                    // تعطيل جميع الخيارات بعد الاختيار
                    answerOptions.forEach(opt => {
                        opt.style.pointerEvents = 'none';
                    });

                    // الانتقال للسؤال التالي بعد ثوانٍ
                    window.setTimeout(() => {
                        handleQuizMoveToNext(); // الانتقال إلى السؤال التالي
                    }, 1000); // تأخير بسيط لعرض الفيدباك
                }, {once: true});
            });
 */