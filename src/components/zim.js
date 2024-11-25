

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


import zim, { Circle,  Frame } from "zimjs";


export const showZim = () => {

  zimplify();

  new Frame(FIT, 1024, 768, light, dark, ready);


  function ready(){
    new Circle(20,pink).center().drag().cur()
    
  };


};

