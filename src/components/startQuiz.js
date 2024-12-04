import { fetchQuizData, sendResultToServer } from "../services/api";
import { downloadCertificate } from "../helper/certificate";
import quizify from "quizify";

import renderMathInElement from "katex/contrib/auto-render/auto-render.js";
//import "katex/dist/katex.css";

export const startQuiz = async (quizId) => {
  const correctSound = new Audio("/correct.mp3");
  const wrongSound = new Audio("/wronganswer.mp3");

  const data = await fetchQuizData(quizId);

  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `<div class=" container-sm list-group-sm my-2" lang="ar" dir="auto" id="quizContainer">

    </div>`;

  const quizOptions = {
    questionContainerClass: "quizify-question-container",
    answerListClass: "quizify-answer-list",
    answerListItemClass: "quizify-answer-list-item",
    questionNextButtonClass: "quizify-button-next",
  };
  const quiz = new quizify(data.quizSchema, quizOptions);
  const quizContainer = document.getElementById("quizContainer");

  //let correctAnswersCount = 0;
  // المفروض يجي محسوب من الباك
  //const totalQuestions = data.maxScore;

  quiz.addEventListener("answerSelected", handleQuizMoveToNext);

  function handleQuizMoveToNext() {
    const question = quiz.getNext();
    console.log("question is " + JSON.stringify(question, null, 2));

    quizContainer.innerHTML = ""; // مسح المحتوى السابق

    if (question.type === "question") {
      quizContainer.appendChild(question.data.dom_node);

      if (question.data.image) {
        //console.log("تم العثور على صورة للسؤال");
        let imageElement = new Image();
        imageElement.src = question.data.image; // استخدام الرابط كما هو
        imageElement.alt = "صورة السؤال";
        imageElement.style.marginBottom = "15px"; // إضافة مسافة بين الصورة والنص
        imageElement.classList.add(
          "card-img-top",
          "img-fluid",
          "border",
          "border-1",
          "border-success",
          "rounded-3"
        );
        imageElement.onerror = () => {
          console.error("فشل تحميل الصورة:", question.data.image);
        };
        // إضافة الصورة إلى عنصر السؤال
        question.data.dom_node.prepend(imageElement); // تم تعديل هنا
      }
      renderMathInElement(quizContainer, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
      });

      const answerOptions = quizContainer.querySelectorAll(
        ".quizify-answer-list-item"
      );
      answerOptions.forEach((el) => el.classList.add("list-group-item-sm"));

      //let answerSelected = false;

      answerOptions.forEach((option, index) => {
        // التحقق من أن الإجابة صورة
        const answerData = question.data.answers[index];

        if (answerData.image) {
          const imgElement = document.createElement("img");
          imgElement.src = answerData.image;
          imgElement.alt = `الإجابة ${index + 1}`;
          imgElement.classList.add("img-fluid", "p-2", "clickable-image");

          option.insertBefore(imgElement, option.firstChild)
 
        }

        option.addEventListener(
          "change",
          () => {
            if (option.classList.contains("selected")) return; // منع التكرار

            //option.querySelector("input").checked = true; // التأكد من تسجيل الاختيار
            option.classList.add("selected");

            if (answerData.is_correct) {
              option.classList.add("bg-success-subtle");
              correctSound.play();
            } else {
              option.classList.add("bg-danger-subtle");
              wrongSound.play();
            }

            // تعطيل جميع الخيارات بعد الاختيار
            answerOptions.forEach((opt) => {
              opt.style.pointerEvents = "none";
              if (!opt.classList.contains("selected"))
                opt.classList.add("bg-light");
            });

            // تفعيل حدث الانتقال في quizify
            const event = new Event("answerSelected", { bubbles: true });
            option.dispatchEvent(event); // إبلاغ المكتبة بتسجيل الاختيار
          },
          { once: true }
        ); // تضمن أن الحدث يتم استدعاؤه مرة واحدة فقط
      });
    } else if (question.type === "result") {
      //console.log(question)
      displayQuizSummary(question.data);
    }
  }

  // دالة لعرض النتيجة النهائية
  async function displayQuizSummary(resultData) {
    const { totalAchievedScore, totalPossibleScore, percentageAchieved } =
      resultData;
    console.log(
      "totalAchievedScore is" +
        totalAchievedScore +
        " " +
        "totalPossibleScore is" +
        totalPossibleScore +
        " " +
        "percentageAchieved is " +
        percentageAchieved
    );

    const spinner = document.createElement("div");

    spinner.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;

    // إضافة السبينر إلى المحتوى
    quizContainer.appendChild(spinner);

    const certificateUrl = await sendResultToServer(
      resultData.totalAchievedScore,
      quizId
    );

    spinner.remove();

    quizContainer.innerHTML = `
        <div class="container-sm text-sm-center align-content-center justify-content-center my-2 border border-info border-1 rounded-2 shadow bi-emoji-smile" dir="auto" lang="ar">
                <h3 <span style='color:green'>نتيجة الاختبار</h3>
                <p>   ${totalAchievedScore} من أصل ${totalPossibleScore} درجة </p>
                <p> ${percentageAchieved} %</p>
                <p id = 'nocert'></p>
        </div>    
        `;

    const retryButton = document.createElement("button");
    retryButton.textContent = "إعادة المحاولة";
    retryButton.classList.add("btn",'btn-sm', "btn-info", "mx-2");

    retryButton.addEventListener("click", () => startQuiz(quizId));
    quizContainer.appendChild(retryButton);

    if (certificateUrl) {
      const downloadButton = document.createElement("button");
      downloadButton.textContent = "تنزيل الشهادة";
      downloadButton.classList.add("btn","btn-sm", "btn-success");

      downloadButton.addEventListener("click", async () => {
        const spinner2 = document.createElement("div");
        spinner2.innerHTML = `
          <div class="d-flex justify-content-center">
              <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
          </div>
        `;

        quizContainer.appendChild(spinner2);

        await downloadCertificate(certificateUrl);
        spinner2.remove();

      });

      quizContainer.appendChild(downloadButton);
      document.getElementById("nocert").innerText = "لقد حصلت على شهادة, أحسنت";
    } else {
      document.getElementById("nocert").innerText = "لم تحصل على شهادة";
    }

    const rnk = document.createElement("div");
    rnk.innerHTML = "<img src='/rank.png' class='img-fluid'>"
    rnk.classList.add("container-sm", "my-2");
  }

  // بدء عرض الكويز من السؤال الأول
  handleQuizMoveToNext();
};
