import renderMathInElement from "katex/contrib/auto-render/auto-render.js";
//import "katex/dist/katex.css";
import { activities } from "./activities";

export const learn = () => {

  document.getElementById("app").innerHTML = `
  <style>
    .activities-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }

      .board-container {
        padding: 5px;
        background: #f8f9fa;
        border-radius: 8px;
      }

      #jxgbox {
        width: 210px;
        height:200px;
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

    </style>

      <div class="" lang="ar" dir="auto">
        <!-- أزرار التبديل بين المراحل -->
        <div style="width:100%" class="btn-group-sm mb-4 justify-content-center" role="group">
          <button class="btn btn-sm bg-info-subtle active mx-2" onclick="showStage('elementary')">
            المرحلة الابتدائية
          </button>

          <button class="btn btn-sm bg-info-subtle mx-2" onclick="showStage('middle')">
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
        <button class="btn btn-sm btn-secondary mb-3" onclick="backToActivities()">
          رجوع
        </button>
          <div id="jxgbox" class="jxgbox col-sm-12"
            style="aspect-ratio: 1/1; max-width: 90%;">        
          </div>

          <p id="info" class="mt-3"></p>
        <div class="description" id="activity-description"></div>
      </div>
  `;

  // دالة لعرض أنشطة مرحلة معينة
  function renderActivities(stage) {
    const stageData = activities[stage];
    return stageData.topics.map(topic => `
      <div class="container-sm activity-card" onclick="showBoard('${stage}', ${topic.id})">
        <div class="card shadow border-3">
          <div class=" card-body">
            <h5 class="card-title">${topic.title}</h5>
            </div>
        </div>
      </div>
    `).join('');
  }
          
  //<p class="card-text">${topic.description}</p>
  // إضافة الأساليب للنافذة العالمية
  window.showStage = (stage) => {
    document.getElementById('activities-container').innerHTML = renderActivities(stage);
    // تحديث حالة الأزرار
    document.querySelectorAll('.btn-group-sm .btn-sm').forEach(btn => {
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

    if (topic.math) {
      topic.math();
    }

  };

  window.backToActivities = () => {
    document.getElementById('board-container').style.display = 'none';
    document.querySelector('.activities-grid').style.display = 'grid';
  };
};