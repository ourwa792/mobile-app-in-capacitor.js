import renderMathInElement from "katex/contrib/auto-render/auto-render.js";
import "katex/dist/katex.css";
import { board1 } from "./jxg";

export const learn = () => {
  
/* 
  document.getElementById("app").innerHTML = `
        <div class="d-flex justify-content-center"
         id="jxgbox" style="width:200px;height: 300px; border: 1px solid black;"></div>
        <p style="font-size: 1rem" id="info">$ \\frac{2}{2} - \\frac{2}{3} $</p>
  `;

  const info = document.getElementById("info");  
  var board = JSXGraph.initBoard("jxgbox", {
    boundingbox: [-5, 5, 5, -5],
    axis: true,
    keepAspectRatio: true,
  });

  board.create("circle", [
    [0, 0],
    [2, 2],
  ]);

  renderMathInElement(info, {
    delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false},
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
    ],
  }) 
  
*/
  
  // تعريف الأنشطة
  const activities = {
    elementary: {
      title: "المرحلة الابتدائية",
      topics: [
        {
          id: 1,
          title: "الكسور البسيطة",
          description: "تعلم العمليات الأساسية على الكسور",
          board: {
            equation: "$$ \\frac{2}{2} - \\frac{2}{3} $$",
          },
          math: board1
        },
      ]
    },
    middle: {
      title: "المرحلة الإعدادية",
      topics: [
        {
          id: 1,
          title: "المعادلات الجبرية",
          description: "حل المعادلات من الدرجة الأولى",
          board: {
            equation: "2x + 3 = 7",
          }
        },

      ]
    }
  };

  // إنشاء واجهة المستخدم الرئيسية
  document.getElementById("app").innerHTML = `
  <style>
 .activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }

  .board-container {
    padding: 5px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  #jxgbox {
    width: 200px;
    height:190px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 auto;
  }

  .description {
    margin-top: 20px;
    padding: 5px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .btn-group {
    width: 100%;
    justify-content: center;
  }

</style>

    <div class="">
      <div class="stages-container">
        <!-- أزرار التبديل بين المراحل -->
        <div class="btn-group mb-4" role="group">
          <button class="btn btn-primary active" onclick="showStage('elementary')">
            المرحلة الابتدائية
          </button>
          <button class="btn btn-primary" onclick="showStage('middle')">
            المرحلة الإعدادية
          </button>
        </div>

        <!-- عرض الأنشطة -->
        <div class="activities-grid" id="activities-container">
          ${renderActivities('elementary')}
        </div>
      </div>

      <!-- مساحة عرض اللوح التفاعلي -->
      <div class="board-container" id="board-container" style="display: none">
        <button class="btn btn-secondary mb-3" onclick="backToActivities()">
          رجوع
        </button>
          <div id="jxgbox" class="jxgbox col-sm-12"
            style="aspect-ratio: 1/1; max-width: 90%;">        
          </div>

          <p id="info" class="mt-3"></p>
        <div class="description" id="activity-description"></div>
      </div>
    </div>
  `;

  // دالة لعرض أنشطة مرحلة معينة
  function renderActivities(stage) {
    const stageData = activities[stage];
    return stageData.topics.map(topic => `
      <div class="activity-card" onclick="showBoard('${stage}', ${topic.id})">
        <div class="card shadow border-3">
          <div class=" card-body">
            <h5 class="card-title">${topic.title}</h5>
            <p class="card-text">${topic.description}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // إضافة الأساليب للنافذة العالمية
  window.showStage = (stage) => {
    document.getElementById('activities-container').innerHTML = renderActivities(stage);
    // تحديث حالة الأزرار
    document.querySelectorAll('.btn-group .btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.target.classList.add('active');
  };

  window.showBoard = (stage, topicId) => {
    const topic = activities[stage].topics.find(t => t.id === topicId);
    const boardContainer = document.getElementById('board-container');
    const activitiesGrid = document.querySelector('.activities-grid');

    activitiesGrid.style.display = 'none';
    boardContainer.style.display = 'block';


    // عرض المعادلة والوصف
    document.getElementById('info').innerHTML = topic.board.equation;
    document.getElementById('activity-description').innerHTML = topic.description;

    // تحديث المعادلات الرياضية
    renderMathInElement(document.getElementById('info'), {
      delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\[', right: '\\]', display: true}
      ],
    });

    board1()
  };

  window.backToActivities = () => {
    document.getElementById('board-container').style.display = 'none';
    document.querySelector('.activities-grid').style.display = 'grid';
  };
};