import { App } from '@capacitor/app';
import { Dialog } from '@capacitor/dialog';
import Navigo from "navigo";

import { signUp } from '../components/signUp';
import { logIn } from '../components/logIn';
import { profile } from '../components/profile';
import { checkSession } from "./auth";
import { toggleBottomBar } from '../helper/pageTitl';
import { Files } from '../components/resources';
//import { Files } from '../components/resources';
import { Lesson } from '../components/lesson';
import { learn } from '../components/learn';
import { showQuizzes } from '../components/quiz';
//import { showZim } from '../components/zim';


export const router = new Navigo("/", { hash: false, root: "/" }); 


App.addListener("backButton", async ()=> {
  const { value } = await Dialog.confirm({
    title: "الخروج" ,
    message: 'هل أنت متأكد أنك تريد الخروج من التطبيق؟',
    okButtonTitle: "نعم",
    cancelButtonTitle: "لا"
  });
  if (value) App.exitApp();  
});

 /*  const currentPath = router.getCurrentLocation();

  console.log('currentPath '+ currentPath.route)
  console.log('Path '+ JSON.stringify(currentPath)) 
  if (currentPath.url === '/profile') {
    console.log("Navigating back from profile page...");
    // يمكنك إضافة توجيه أو خروج هنا عند الحاجة
  }else {
    console.log("Navigating back from other page...");
  } 
    */




async function handleRoute(callback) {
  const isSessionActive = await checkSession();
  toggleBottomBar(isSessionActive);
  if (isSessionActive) {
    await callback();  // تنفيذ الدالة الخاصة بالمسار
  } else {
    router.navigate('/login');
  }
}

// إعداد التوجيهات
router
  .on('/', async () => {
    const isSessionActive = await checkSession();
    toggleBottomBar(isSessionActive);
    if (isSessionActive) {
      router.navigate('/profile');
    } else {
      signUp();
    }
  })
  .on('/login', async () => {
    const isSessionActive = await checkSession();
    toggleBottomBar(isSessionActive);
    if (!isSessionActive) {
      logIn();
    } else {
      router.navigate('/profile');
    }
  })
  .on('/profile', () => handleRoute(profile))
  .on('/resources', () => handleRoute(Files))
  .on('/lessons', () => handleRoute(Lesson))
  .on('/learn', () => handleRoute(learn))
  .on('/quiz', () => handleRoute(showQuizzes))
  .resolve();


/* 
router
  .on('/', async () => {
    await handleBottomBar(); // تحديث حالة bottomBar
    const isSessionActive = await checkSession();
    if (isSessionActive) {
      router.navigate('/profile');  // إذا كانت الجلسة نشطة، توجهه إلى الملف الشخصي
    } else {
      signUp();  // إذا لم يكن مسجلًا، تعرض واجهة التسجيل
    }
  })
  .on('/login', async () => {
    await handleBottomBar(); // تحديث حالة bottomBar
    const isSessionActive = await checkSession();
    if (!isSessionActive) {
      logIn();  // استدعاء واجهة تسجيل الدخول
    } else {
      router.navigate('/profile');  // نقل المستخدم إلى الملف الشخصي إذا كان مسجل الدخول
    }
  })
  .on('/profile', async () => {
    await handleBottomBar(); // تحديث حالة bottomBar
    const isSessionActive = await checkSession();
    if (isSessionActive) {
        profile();  // عرض الملف الشخصي إذا كان مسجل الدخول
    } else {
      router.navigate('/login');  // إعادة توجيه المستخدم إلى صفحة تسجيل الدخول إذا لم يكن مسجل الدخول
    }
  })
  .on('/resources', async ()=> {
    toggleBottomBar(true);
    await Files();
  })
 /*  .on('/lesson/:id', async (params) => {   // إضافة مسار جديد لعرض الدرس الفردي
    const lessonId = params.id;  // الحصول على id الدرس من الرابط
    console.log("Navigating to lesson with ID:", lessonId);
    await showLesson(lessonId);  // عرض محتوى الدرس
  //}) 
  .on('/lessons', async () => {  
    toggleBottomBar(true);
    await Lesson();   
  })
  .on("/learn", ()=>{
    toggleBottomBar(true);
    learn();
  })
  .on("/quiz", async ()=>{
    toggleBottomBar(true)    
    await showQuizzes(); // تحديث حالة bottomBar
  })
  .on("/zim", ()=>{
    //toggleBottomBar(true);
    //showZim();
  })
.resolve(); */
