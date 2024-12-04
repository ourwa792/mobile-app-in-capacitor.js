/* 
export const LessonList = async () => {
  const lessons = await getLessons(); // استدعاء API لجلب قائمة الدروس
  console.log("lessonList"+ JSON.stringify(lessons))

  if (lessons.length === 0) {
    document.getElementById('app').innerHTML = '<p>لا توجد دروس متاحة حاليا</p>';
    return;
  }

  let lessonListHTML = '<h1>قائمة الدروس</h1><ul>';

  lessons.forEach((lesson) => {
    lessonListHTML += `<li><a href="/lesson/${lesson.id}" data-navigo>${lesson.title}</a></li>`;
  });

  lessonListHTML += '</ul>';
  document.getElementById('app').innerHTML = lessonListHTML; 

  //console.log(Elearning)
  //const router = new Navigo("/");
  router.updatePageLinks(); // التأكد من أن الروابط تعمل مع النظام الملاحي (Navigo)
  router.resolve();
}; */


import { Frame, Waiter } from "zimjs";
import { Zim1 } from "./allZims/zim1";
import { Zim2 } from "./allZims/zim2";

// مصفوفة تحتوي على بيانات الأزرار
const zimItems = [
  { id: "btn-1", label: "The current button", content: Zim1 },
  { id: "btn-2", label: "A second button item", content: Zim2 },
];

let currentFrame = null; // لتخزين الإطار الحالي

export const showZim = () => {
  const app = document.getElementById("app");
  app.innerHTML = ""; // تفريغ المحتوى القديم
  //app.style.backgroundColor = 'white';

  const listGroup = document.createElement("div");
  listGroup.className = "list-group list-group-flush";

  zimItems.forEach((item) => {
    const button = document.createElement("button");
    button.id = item.id;
    button.className = "list-group-item list-group-item-action";
    button.textContent = item.label;

    button.addEventListener("click", () => {
      // تنظيف الإطار السابق
      if (currentFrame) {
        currentFrame.dispose();  // إزالة الإطار الحالي إذا كان موجودًا
        currentFrame = null;
      }

      // إزالة أي عناصر زائدة مثل الـ <style>
      const existingCanvas = document.getElementById("holderCanvas");
      if (existingCanvas) {
        existingCanvas.remove();
      }

      app.innerHTML = ""; // تفريغ المحتوى السابق
      app.style.backgroundColor = "";

      // إنشاء الحاوية الجديدة للإطار
      const holderDiv = document.createElement("div");
      holderDiv.id = "holder";
      holderDiv.style.width = "260";
      holderDiv.style.height = "490";
      app.appendChild(holderDiv);

      // إنشاء إطار ZIM جديد
      const frame = new Frame({
        scaling: "holder",
        width: 1024,
        height: 768,
        progress: new Waiter({
          backgroundColor: blue,
          corner: 10,
        }),
        allowDefault: true,
        assets: ['scramble.png'],
        path: "/assets/",
        color: light,
        outerColor: clear,
        ready: function () {
          const stage = frame.stage;
          item.content(stage); // استدعاء دالة المحتوى الخاصة بالزر
          stage.update();
        },
      });

      currentFrame = frame;  // تخزين الإطار الجديد لإزالته لاحقًا
    });

    listGroup.appendChild(button);
  });

  app.appendChild(listGroup);
};
