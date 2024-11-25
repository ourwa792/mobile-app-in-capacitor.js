import { getLessonDetails, getLessons } from '../services/api';

/*
export const showLesson = async (lessonId) => {
  const lesson = await getLessonDetails(lessonId);  // جلب تفاصيل الدرس بناءً على ID
  console.log("showLesson"+JSON.stringify(lesson))
  // التحقق من وجود الدرس
  if (!lesson) {
    document.getElementById('app').innerHTML = '<p>حدث خطأ أثناء تحميل الدرس.</p>';
    return;
  }

  // بناء HTML لعرض الفيديو ومحتوى الدرس
  let lessonHTML = `
    <h1>${lesson.title}</h1>
    <video controls width="200">
      <source src="${lesson.link}" type="video/mp4"> 
      متصفحك لا يدعم عرض الفيديو.
    </video>
    <p>${lesson.description}</p>
    <button id="backButton">العودة إلى قائمة الدروس</button>
  `;

  // حقن المحتوى في الصفحة
  document.getElementById('app').innerHTML = lessonHTML;

  // تفعيل زر الرجوع إلى قائمة الدروس
  document.getElementById('backButton').addEventListener('click', () => {
    router.navigate('/lessons');  // الرجوع إلى قائمة الدروس
  });
};

using embebed video
https://www.youtube.com/embed/Fa6_wV59ASs
*/


/*

export const Lesson =  async ()=>{

    // الحصول على العنصر الرئيسي
  const appDiv = document.getElementById('app');

  // إنشاء div لقائمة الدروس
  const lessonListDiv = document.createElement('div');
  lessonListDiv.id = 'lessonList';
  lessonListDiv.classList.add('lesson-list');

  // إنشاء div لمحتوى الدروس
  const lessonContentDiv = document.createElement('div');
  lessonContentDiv.id = 'lessonContent';
  lessonContentDiv.classList.add('lesson-content');

  // إضافة عنوان افتراضي داخل محتوى الدروس
  const lessonTitle = document.createElement('h2');
  lessonTitle.innerText = 'يرجى اختيار درس لعرضه';
  lessonContentDiv.appendChild(lessonTitle);

  // حقن العناصر داخل العنصر الرئيسي
  appDiv.appendChild(lessonListDiv);    // إضافة قائمة الدروس
  appDiv.appendChild(lessonContentDiv); // إضافة محتوى الدروس

  // جلب قائمة الدروس من API
  const lessons = await getLessons();

  // التحقق من وجود دروس
  if (lessons.length === 0) {
    lessonListDiv.innerHTML = '<p>لا توجد دروس متاحة حالياً.</p>';
    return;
  }

  // بناء قائمة الدروس HTML
  let lessonListHTML = '<ul>';
  lessons.forEach((lesson) => {
    lessonListHTML += `
      <li>
        <button class="lesson-button" data-id="${lesson.id}">
          ${lesson.title}
        </button>
      </li>`;
  });
  lessonListHTML += '</ul>';
  lessonListDiv.innerHTML = lessonListHTML; // عرض قائمة الدروس في القائمة

  // إضافة مستمعين للأزرار لعرض تفاصيل الدرس عند النقر
  document.querySelectorAll('.lesson-button').forEach(button => {
    button.addEventListener('click', async () => {
      const lessonId = button.getAttribute('data-id');
      loadLessonDetails(lessonId);  // استدعاء دالة لعرض تفاصيل الدرس
    });
  });

  // دالة لجلب وعرض تفاصيل الدرس عند النقر
  async function loadLessonDetails(lessonId) {
    const response = await getLessonDetails(lessonId); // جلب تفاصيل الدرس بناءً على ID

    const lesson = response.lessons;

    // التحقق من وجود الدرس
    if (!lesson || !lesson.link) {
      lessonContentDiv.innerHTML = '<p>حدث خطأ أثناء تحميل الدرس.</p>';
      return;
    }

    // بناء HTML لعرض الفيديو ومحتوى الدرس
    let lessonHTML = `
      <h1>${lesson.title}</h1>
      <video controls width="600">
        <source src="${lesson.link}" type="video/mp4">
        متصفحك لا يدعم عرض الفيديو.
      </video>
      <p>${lesson.description || 'الوصف غير متوفر'}</p>
    `;

    // حقن HTML في المنطقة المخصصة لمحتوى الدروس
    lessonContentDiv.innerHTML = lessonHTML;
  }

}

*/  

/*

export const Lesson = async () => {
  const appDiv = document.getElementById('app');

  // حقن HTML الرئيسي
  appDiv.innerHTML = `
  <main>
    <div class="container-fluid p-3">
      <div class="row">
        <!-- قائمة الدروس -->
        <div id="lessonList" class="col-12 col-md-4 mb-3">
          <h4 class="text-center text-primary font-weight-bold">قائمة الدروس</h4>
          <div class="list-group overflow-auto" style="max-height: 400px; background-color: #f8f9fa; border-radius: 8px;" id="lessonListContent">
            <!-- سيتم حقن قائمة الدروس هنا -->
          </div>
        </div>

        <!-- عرض الفيديو -->
        <div id="lessonContent" class="col-12 col-md-8">
          <div class="embed-responsive embed-responsive-16by9 mb-3 rounded shadow">
            <iframe class="embed-responsive-item rounded" width="100%" height="315" 
            src="" id="lessonVideo"
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div id="lessonDetails" class="p-3 bg-light rounded shadow-sm">
            <h5 id="lessonTitle" class="text-secondary">يرجى اختيار درس لعرضه</h5>
            <p id="lessonDescription" class="text-muted">وصف الدرس سيظهر هنا.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  `;

  // حقن CSS مباشرةً في الـDOM باستخدام JavaScript
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      background-color: #f0f2f5;
    }

    h4 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1.25rem;
    }

    p {
      font-size: 1rem;
    }

    #lessonListContent {
      border: 1px solid #dee2e6;
      padding: 10px;
    }

    .embed-responsive-item {
      border: 1px solid #dee2e6;
      border-radius: 8px;
    }

    .bg-light {
      background-color: #f8f9fa !important;
    }

    .shadow-sm {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .shadow {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      h4 {
        font-size: 1.25rem;
      }
      h5 {
        font-size: 1.1rem;
      }
      p {
        font-size: 0.9rem;
      }
    }
  `;

  document.head.appendChild(style);

  const lessonListDiv = document.getElementById('lessonListContent');
  const lessonTitle = document.getElementById('lessonTitle');
  const lessonDescription = document.getElementById('lessonDescription');
  const lessonVideo = document.getElementById('lessonVideo');

  const lessons = await getLessons();

  if (lessons.length === 0) {
    lessonListDiv.innerHTML = '<p class="text-center">لا توجد دروس متاحة حالياً.</p>';
    return;
  }

  // بناء قائمة الدروس
  lessons.forEach((lesson) => {
    const lessonButton = document.createElement('button');
    lessonButton.classList.add('list-group-item', 'list-group-item-action');
    lessonButton.innerText = lesson.title;
    lessonButton.setAttribute('data-id', lesson.id);

    // عند الضغط على الدرس يتم تحميل الفيديو وتفاصيل الدرس
    lessonButton.addEventListener('click', async () => {
      const lessonId = lessonButton.getAttribute('data-id');
      const lessonDetails = await getLessonDetails(lessonId);

      if (lessonDetails && lessonDetails.lessons) {
        const lesson = lessonDetails.lessons;
        lessonTitle.innerText = lesson.title;
        lessonDescription.innerText = lesson.description || 'لا يوجد وصف متاح لهذا الدرس.';
        lessonVideo.src = lesson.link; // تحديث الرابط للفيديو داخل iframe
      } else {
        lessonTitle.innerText = 'حدث خطأ أثناء تحميل الدرس';
        lessonDescription.innerText = '';
        lessonVideo.src = '';
      }
    });

    // إضافة الزر إلى قائمة الدروس
    lessonListDiv.appendChild(lessonButton);
  });
};



/*

https://www.youtube.com/embed/RpnKCLE1boc
https://www.youtube.com/embed/Fa6_wV59ASs


*/

/*

export const Lesson = async () => {
  const appDiv = document.getElementById('app');

  // حقن HTML الرئيسي
  appDiv.innerHTML = `
  <main>
    <div class="p-3">
      <div class="row">
        <!-- قائمة الدروس -->
        <div id="lessonList" class="col-12 col-md-4 mb-3">
          <h4 class="text-center text-primary font-weight-bold">قائمة الدروس</h4>

          <!-- شريط البحث -->
          <input type="text" id="searchInput" class="form-control mb-3" placeholder="ابحث عن درس..." />

          <div class="list-group overflow-auto" style="max-height: 400px; background-color: #f8f9fa; border-radius: 8px;" id="lessonListContent">
            <!-- سيتم حقن قائمة الدروس هنا -->
          </div>
        </div>

        <!-- عرض الفيديو -->
        <div id="lessonContent" class="col-12 col-md-8">
          <div class="embed-responsive embed-responsive-16by9 mb-3 rounded shadow">
            <iframe class="embed-responsive-item rounded" width="100%" height="315" 
            src="" id="lessonVideo"
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
            picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div id="lessonDetails" class="p-3 bg-light rounded shadow-sm">
            <h5 id="lessonTitle" class="text-secondary">يرجى اختيار درس لعرضه</h5>
            <p id="lessonDescription" class="text-muted">وصف الدرس سيظهر هنا.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  `;

  // حقن CSS مباشرةً في الـDOM باستخدام JavaScript
  const style = document.createElement('style');
  style.innerHTML = `

    #app {
      display: flex;
      flex-direction: column;
      height: 100vh;
      max-width: 256px; 
      max-height: 488px; 
      overflow: hidden; 
    }

    #lessonListContent, #lessonContent {
      flex: 1;
      overflow-y: auto; 
    }


    h4 {
      font-size: 1.5rem;
    }

    h5 {
      font-size: 1.25rem;
    }

    p {
      font-size: 1rem;
    }

    #lessonListContent {
      border: 1px solid #dee2e6;
      padding: 10px;
      max-height: 50%; 
      overflow-y: scroll;
    }

    // تحسين عرض الفيديو /
    .embed-responsive-item {
      border: 1px solid #dee2e6;
      border-radius: 8px;
    }

    //
    .bg-light {
      background-color: #f8f9fa !important;
    }

    
    .shadow-sm {
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .shadow {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      h4 {
        font-size: 1.25rem;
      }
      h5 {
        font-size: 1.1rem;
      }
      p {
        font-size: 0.9rem;
      }
    }

    main {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box; 
    }

    #lessonList, #lessonContent {
      padding: 10px;
      margin: 0;
    }

  `;

  // إلحاق الـCSS المحقون في الـDOM
  document.head.appendChild(style);

  // استدعاء البيانات وجلب قائمة الدروس من API
  const lessonListDiv = document.getElementById('lessonListContent');
  const lessonTitle = document.getElementById('lessonTitle');
  const lessonDescription = document.getElementById('lessonDescription');
  const lessonVideo = document.getElementById('lessonVideo');
  const searchInput = document.getElementById('searchInput');

  const lessons = await getLessons();

  if (lessons.length === 0) {
    lessonListDiv.innerHTML = '<p class="text-center">لا توجد دروس متاحة حالياً.</p>';
    return;
  }

  // دالة لعرض قائمة الدروس
  const displayLessons = (filteredLessons) => {
    lessonListDiv.innerHTML = ''; // إفراغ القائمة الحالية

    filteredLessons.forEach((lesson) => {
      const lessonButton = document.createElement('button');
      lessonButton.classList.add('list-group-item', 'list-group-item-action');
      lessonButton.innerText = lesson.title;
      lessonButton.setAttribute('data-id', lesson.id);

      // عند الضغط على الدرس يتم تحميل الفيديو وتفاصيل الدرس
      lessonButton.addEventListener('click', async () => {
        const lessonId = lessonButton.getAttribute('data-id');
        const lessonDetails = await getLessonDetails(lessonId);

        if (lessonDetails && lessonDetails.lessons) {
          const lesson = lessonDetails.lessons;
          lessonTitle.innerText = lesson.title;
          lessonDescription.innerText = lesson.description || 'لا يوجد وصف متاح لهذا الدرس.';
          lessonVideo.src = lesson.link; // تحديث الرابط للفيديو داخل iframe
        } else {
          lessonTitle.innerText = 'حدث خطأ أثناء تحميل الدرس';
          lessonDescription.innerText = '';
          lessonVideo.src = '';
        }
      });

      // إضافة الزر إلى قائمة الدروس
      lessonListDiv.appendChild(lessonButton);
    });
  };

  // عرض جميع الدروس عند التحميل
  displayLessons(lessons);

  // إضافة حدث الاستماع عند الكتابة في شريط البحث
  searchInput.addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredLessons = lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchQuery)
    );

    displayLessons(filteredLessons);
  });
};


*/

/*
import Plyr from 'plyr';

export const Lesson = async () => {
  const appDiv = document.getElementById('app');

  // حقن HTML الرئيسي
  appDiv.innerHTML = `
  <main>
    <div class="p-3">
      <div class="row">
        <!-- قائمة الدروس -->
        <div id="lessonList" class="col-12 col-md-4 mb-3">
          <h4 class="text-center text-primary font-weight-bold">قائمة الدروس</h4>

          <!-- شريط البحث -->
          <input type="text" id="searchInput" class="form-control mb-3" placeholder="ابحث عن درس..." />

          <div class="list-group overflow-auto" style="max-height: 400px; background-color: #f8f9fa; border-radius: 8px;" id="lessonListContent">
            <!-- سيتم حقن قائمة الدروس هنا -->
          </div>
        </div>

        <!-- عرض الفيديو والأسئلة -->
        <div id="lessonContent" class="col-12 col-md-8">
          <div class="embed-responsive embed-responsive-16by9 mb-3 rounded shadow">
            <video id="player" class="js-player w-100" playsinline controls></video>
          </div>
          <div id="lessonDetails" class="p-3 bg-light rounded shadow-sm">
            <h5 id="lessonTitle" class="text-secondary">يرجى اختيار درس لعرضه</h5>
            <p id="lessonDescription" class="text-muted">وصف الدرس سيظهر هنا.</p>
          </div>

          <!-- حاوية الأسئلة -->
          <div id="quiz-container" class="quiz-container" style="display:none;">
            <p id="quiz-question"></p>
            <button id="quiz-option-1"></button>
            <button id="quiz-option-2"></button>
            <button id="quiz-option-3"></button>
            <button id="quiz-option-4"></button>
          </div>

          <!-- عرض النتيجة -->
          <div class="score-container">
            <p>Score: <span id="score">0</span></p>
          </div>
        </div>
      </div>
    </div>
  </main>
  `;

  // Plyr instance for the video
  const player = new Plyr('#player');

  // Elements
  const lessonListDiv = document.getElementById('lessonListContent');
  const lessonTitle = document.getElementById('lessonTitle');
  const lessonDescription = document.getElementById('lessonDescription');
  const searchInput = document.getElementById('searchInput');
  const quizContainer = document.getElementById('quiz-container');
  const quizQuestion = document.getElementById('quiz-question');

  const quizOptions = [
    document.getElementById('quiz-option-1'),
    document.getElementById('quiz-option-2'),
    document.getElementById('quiz-option-3'),
    document.getElementById('quiz-option-4')
  ];
  const scoreElement = document.getElementById('score');
  let score = 0;
  let quizzes = [];

  // Fetch lessons from API
  const lessons = await getLessons();

  if (lessons.length === 0) {
    lessonListDiv.innerHTML = '<p class="text-center">لا توجد دروس متاحة حالياً.</p>';
    return;
  }

  const displayLessons = (filteredLessons) => {
    lessonListDiv.innerHTML = ''; // Clear current list

    filteredLessons.forEach((lesson) => {
      const lessonButton = document.createElement('button');
      lessonButton.classList.add('list-group-item', 'list-group-item-action');
      lessonButton.innerText = lesson.title;
      lessonButton.setAttribute('data-id', lesson.id);

      // Load lesson video and details on click
      lessonButton.addEventListener('click', async () => {
        const lessonId = lessonButton.getAttribute('data-id');
        const lessonDetails = await getLessonDetails(lessonId);

        if (lessonDetails && lessonDetails.lesson) {
          const lesson = lessonDetails.lesson;
          lessonTitle.innerText = lesson.title;
          lessonDescription.innerText = lesson.description || 'لا يوجد وصف متاح لهذا الدرس.';

          player.source = {
            type: 'video',
            sources: [
              {
                src: lesson.videoLink,
                type: 'video/mp4'
              }
            ]
          };

          quizzes = lessonDetails.quizzes; // Store lesson quizzes
          setupQuiz(player);
        } else {
          lessonTitle.innerText = 'حدث خطأ أثناء تحميل الدرس';
          lessonDescription.innerText = '';
        }
      });

      lessonListDiv.appendChild(lessonButton);
    });
  };

  // Display all lessons on load
  displayLessons(lessons);

  // Search through lessons
  searchInput.addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredLessons = lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchQuery)
    );
    displayLessons(filteredLessons);
  });

  // Setup quiz during video
  const setupQuiz = (playerInstance) => {
    playerInstance.on('timeupdate', (event) => {
      const currentTime = Math.floor(playerInstance.currentTime);
      quizzes.forEach((quiz) => {
        if (currentTime === quiz.time && !quiz.asked) {
          showQuiz(quiz);
          playerInstance.pause();
        }
      });
    });
  };

  const showQuiz = (quiz) => {
    quiz.asked = true;
    quizQuestion.innerHTML = quiz.question;
    quizOptions.forEach((option, index) => {
      option.innerHTML = quiz.options[index];
      option.onclick = () => checkAnswer(index, quiz.correct - 1, option);
    });
    quizContainer.style.display = 'block';
  };

  const checkAnswer = (selectedIndex, correctIndex, option) => {
    if (selectedIndex === correctIndex) {
      option.classList.add('correct');
      score++;
      scoreElement.textContent = score;
    } else {
      option.classList.add('incorrect');
      quizOptions[correctIndex].classList.add('correct');
    }
    setTimeout(() => {
      quizContainer.style.display = 'none';
      player.play();
    }, 2000);
  };
};
*/

import Plyr from 'plyr/dist/plyr.mjs';
import "plyr/dist/plyr.css"
import renderMathInElement from 'katex/contrib/auto-render/auto-render.js'; 
import "katex/dist/katex.css";

export const Lesson = async () => {

  const appDiv = document.getElementById('app');

  // حقن HTML الرئيسي
  appDiv.innerHTML = `

  <style>
  .quiz-container {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(255, 255, 255, 0.9);
      border: 1px solid #ddd;
      padding: 20px;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 100%;
      height: 100%;
    }

  .quiz-container p {
      margin: 0 0 10px;
  }

  .quiz-container button {
      display: block;
      margin: 10px auto;
      padding: 10px 20px;
      background-color: #2196f3;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }

  .quiz-container button:hover {
      background-color: #1976d2;
  }

  .quiz-container button.correct {
      background-color: #4caf50;
  }

  .quiz-container button.incorrect {
      background-color: #f44336;
  }

  .score-container {
      text-align: center;
      margin-top: 20px;
  }

  .score-container p {
      font-size: 1.2em;
  } 
  .scrollspy-example {
    position: relative;
    height: 190px;
    overflow: auto;
  }
  </style>  


  <main>
    <div class="p-3">
      <div class="row">
        <!-- قائمة الدروس -->
        <div id="lessonList" class="col-12 col-md-4 mb-3">
          <h4 class="text-center text-primary font-weight-bold">قائمة الدروس</h4>

          <!-- شريط البحث -->
          <input type="text" id="searchInput" class="form-control mb-3" placeholder="ابحث عن درس..." />

          <!-- 
          <div class="list-group overflow-auto" style="max-height: 25% ; background-color: #f8f9fa; border-radius: 8px;" id="lessonListContent">
            سيتم حقن قائمة الدروس هنا 
          </div>
          -->

          <div data-bs-spy="scroll" data-bs-smooth-scroll="true" background-color: #f8f9fa; border-radius: 8px;" id="lessonListContent"
          class="scrollspy-example" tabindex="0" style="border: 1px solid slateblue;">
          </div>


        </div>

        <!-- عرض الفيديو والأسئلة -->
        <div id="lessonContent" class=" col-sm-8">
          <div class="embed-responsive embed-responsive-16by9 mb-3 rounded shadow">

          <video class="js-player w-100" playsinline controls id = "player" >
          </video> 

          </div>

          <div id="lessonDetails" class="p-3 bg-light border-success rounded shadow-sm">
            <h5 id="lessonTitle" class=" border-success rounded-3 text-success">يرجى اختيار درس لعرضه</h5>
            <p id="lessonDescription" class="text-muted">وصف الدرس سيظهر هنا.</p>
          </div>

          <!-- حاوية الأسئلة -->
          <div id="quiz-container" class="quiz-container" style="display:none; direction: rtl;">
            <p id="quiz-question"></p>
            <button id="quiz-option-1"></button>
            <button id="quiz-option-2"></button>
            <button id="quiz-option-3"></button>
          </div>

          <!-- عرض النتيجة -->
          <div class="score-container">
            <p class="border-2 border-info rounded-2">Score: <span id="score">0</span></p>
          </div>
        </div>
      </div>
    </div>
  </main>
  `;

  const lessonListDiv = document.getElementById('lessonListContent');
  const lessonTitle = document.getElementById('lessonTitle');
  const lessonDescription = document.getElementById('lessonDescription');
  const searchInput = document.getElementById('searchInput');
  const quizContainer = document.getElementById('quiz-container');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = [
    document.getElementById('quiz-option-1'),
    document.getElementById('quiz-option-2'),
    document.getElementById('quiz-option-3'),
  ];

  const scoreElement = document.getElementById('score');
  let score = 0;
  let quizzes = [];
  let player;  // تعريف player بشكل عام

  // جلب قائمة الدروس من API
  const lessons = await getLessons();

  if (lessons.length === 0) {
    lessonListDiv.innerHTML = '<p class="text-center">لا توجد دروس متاحة حالياً.</p>';
    return;
  } 

  // دالة عرض الدروس
  const displayLessons = (filteredLessons) => {
    lessonListDiv.innerHTML = ''; // مسح القائمة الحالية

    filteredLessons.forEach((lesson) => {
      const lessonButton = document.createElement('button');
      lessonButton.classList.add('list-group-item', 'list-group-item-action');
      lessonButton.innerText = lesson.title;
      lessonButton.setAttribute('data-id', lesson.id);
      
      // تحميل الفيديو والتفاصيل عند اختيار درس
      lessonButton.addEventListener('click', async () => {
        const lessonId = lessonButton.getAttribute('data-id');
        const lessonDetails = await getLessonDetails(lessonId);

        if (lessonDetails && lessonDetails.lessons) {
          const lesson = lessonDetails.lessons;
          lessonTitle.innerText = lesson.title;
          lessonDescription.innerText = lesson.description || 'لا يوجد وصف متاح لهذا الدرس.';

          if (player) {
            player.destroy();  // تدمير المشغل السابق قبل إنشاء مشغل جديد
          }

          player = new Plyr('#player');  // إنشاء مشغل Plyr جديد

          // تحديث مصدر الفيديو في Plyr
          player.source = {
            type: 'video',
            sources: [
              {
                src: lesson.link,
                type: 'video/mp4',
                provider: 'youtube'
              }
            ]
          };

          player.play();

          player.on('error', (event) => {
            console.error('Video loading error:', event.detail);
            lessonTitle.innerText = 'حدث خطأ أثناء تحميل الفيديو';
          });

          quizzes = lesson.quizess || []; // تخزين الأسئلة الخاصة بالدرس

          setupQuiz(player);

        } else {
          lessonTitle.innerText = 'حدث خطأ أثناء تحميل الدرس';
          lessonDescription.innerText = '';
        }
      });

      lessonListDiv.appendChild(lessonButton);
    });
  };

  // عرض جميع الدروس عند التحميل
  displayLessons(lessons);

  // البحث ضمن الدروس
  searchInput.addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredLessons = lessons.filter(lesson =>
      lesson.title.toLowerCase().includes(searchQuery)
    );
    displayLessons(filteredLessons);
  });

  // إعداد الأسئلة أثناء تشغيل الفيديو
  const setupQuiz = (playerInstance) => {
    console.log("setupQuiz");
    playerInstance.on('timeupdate', (event) => {
      const currentTime = Math.floor(playerInstance.currentTime);
      quizzes.forEach((quiz) => {
        if (currentTime >= quiz.time && !quiz.asked) {
          quiz.asked = true; // تأكد من أن السؤال لا يظهر مرتين
          showQuiz(quiz);
          playerInstance.pause(); // إيقاف الفيديو عند ظهور السؤال
        }
      });
    });
  };

  // عرض السؤال
  const showQuiz = (quiz) => {
    console.log("showQuiz");
    quizQuestion.innerHTML = quiz.question;
    renderMathInElement(quizQuestion, {
      delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
      ],
    })
    quizOptions.forEach((option, index) => {
      option.innerHTML = quiz.options[index];
      option.className = "" ;
      renderMathInElement(option, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
      })
      option.onclick = () => checkAnswer(index, quiz.correct - 1, option);
    });
    quizContainer.style.display = 'block'; // عرض حاوية الأسئلة
  };

  // التحقق من الإجابة
  const checkAnswer = (selectedIndex, correctIndex, option) => {
    if (selectedIndex === correctIndex) {
      option.classList.add('correct');
      score++;
      scoreElement.textContent = score;
    } else {
      option.classList.add('incorrect');
      quizOptions[correctIndex].classList.add('correct');
    }
    setTimeout(() => {
      quizContainer.style.display = 'none';
      player.play(); // استئناف الفيديو بعد الإجابة
    }, 2000);
  };
};
