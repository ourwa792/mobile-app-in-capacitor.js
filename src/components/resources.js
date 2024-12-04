import { CapacitorHttp } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Network } from "@capacitor/network";
import { LocalNotifications } from "@capacitor/local-notifications";
import { cookieUrl } from "../helper/url";
import { Preferences } from "@capacitor/preferences";



// استدعاء الدالة فقط بعد التأكد من وجود العنصر في DOM
export const Files = async () => {
  document.getElementById("app").innerHTML = `
    <div id="file-list" class="file-list"> </div>
  ` ;
  // التحقق من حالة الاتصال بالإنترنت
  async function checkInternet() {
    const status = await Network.getStatus();
    return status.connected;
  }

  // جلب قائمة الملفات (PDF وصور) من السيرفر
  async function fetchFiles() {
    const isConnected = await checkInternet();
    if (!isConnected) {
      alert("يرجى الاتصال بالإنترنت.");
      return;
    } 

    try {
      const { value: token } = await Preferences.get({ key: "authToken" });
      if (!token) {
        console.error("No auth token found!");
        return [];
      };

      const response = await CapacitorHttp.get({
        url: `${cookieUrl}/mobile/files`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        webFetchExtra: { credentials: "include" },
      });
      const files = response.data;
      displayFiles(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
}


// عرض قائمة الملفات برمجياً
function displayFiles(files) {
  const fileList = document.getElementById("file-list")
    fileList.innerHTML = ""; // تفريغ المحتوى الحالي قبل العرض
    fileList.classList.add('container-sm');
    files.forEach((file) => {
      const fileElement = document.createElement("div");
      fileElement.classList.add("card","card-body", 'my-2','border','border-1', 'shadow-md');
  
      // إنشاء عناصر النص
      const titleElement = document.createElement("strong");
      titleElement.textContent = file.title;
  
      const typeElement = document.createElement("span");

      typeElement.textContent = '.pdf' ;
  
      // إنشاء زر التنزيل
      const downloadButton = document.createElement("button");
      downloadButton.classList.add("btn",'btn-sm', 'bg-info-subtle')

      downloadButton.innerHTML += `<i class="bi bi-download mx-sm-auto"> تحميل  </i>`
      downloadButton.onclick = () => downloadFile(file.id, file.title, file.url, file.type);
  
      // إنشاء شريط التقدم والنص الخاص بالتقدم
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.id = `progress-${file.id}`;
      
      const progressText = document.createElement("div");
      progressText.classList.add("progress-text");
      progressText.id = `progress-text-${file.id}`;
  
      // تجميع العناصر داخل عنصر الملف
      fileElement.appendChild(titleElement);
      fileElement.appendChild(typeElement);
      fileElement.appendChild(downloadButton);
      fileElement.appendChild(progressBar);
      fileElement.appendChild(progressText);
  
      // إضافة عنصر الملف إلى قائمة الملفات
      fileList.appendChild(fileElement);
    });
}
  
  // إرسال إشعار عند اكتمال التنزيل أو حدوث خطأ
  const sendNotification = async (title, body) => {
    await LocalNotifications.schedule({
      notifications: [{
        title: title,
        body: body,
        id: Math.floor(Math.random() * 270) + 1,
        schedule: { at: new Date(Date.now() + 2000) }, // بعد ثانية
      }]
    });
  };

   // تنزيل ملف (PDF أو صورة) مع عرض شريط التقدم
  const downloadFile = async (id, title, url, type) => {

    const progressText = document.getElementById(`progress-text-${id}`);
    const progressBar = document.getElementById(`progress-${id}`);
    try {
        
        if (!progressText || !progressBar) {
            console.error('Progress elements not found for file id:', id);
            return;
        }
      
        const progressListener = Filesystem.addListener('progress', (progress) => {
        const percentCompleted = (progress.bytes / progress.contentLength) * 100;
        progressBar.style.width = `${percentCompleted}%`;
        progressText.innerText = `Downloading: ${Math.round(percentCompleted)}%`;
      });

      const result = await Filesystem.downloadFile({
        path: `${title}.pdf`, // استخدام اسم الملف ونوعه
        directory: Directory.Documents,
        url: url,
        progress: true,
        recursive: true
      });

      progressText.innerText = 'Download complete!';
      progressBar.style.width = '100%';

      setTimeout(()=> {
        progressBar.style.display = "none";
        progressText.style.display = "none";
      }, 3000);

      sendNotification('Download Complete', `Your file "${title}" has been downloaded successfully.`);
      console.log('File downloaded successfully:', result);

      // فتح الملف بعد التنزيل
      openFile(result.path, `application/${type}`);
      
    } catch (error) {
      console.error('Error downloading file:', error);
      progressText.innerText = 'Error during download';
      
      const progressText = document.getElementById(`progress-text-${id}`);
      const progressBar = document.getElementById(`progress-${id}`);
      
      setTimeout(()=> {
        progressBar.style.display = "none";
        progressText.style.display = "none";
      }, 2500);
      
      sendNotification('Download Failed', `There was an error downloading the file "${title}".`);
    }
  }; 

  // فتح الملف باستخدام File Opener (PDF أو صورة)
  async function openFile(filePath, contentType) {
    try {
      await FileOpener.open({ filePath, contentType });
    } catch (error) {
      console.error("Error opening file:", error);
    }
  }

  // استدعاء جلب الملفات
  await fetchFiles();
};



/*

import { CapacitorHttp } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Network } from "@capacitor/network";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Preferences } from "@capacitor/preferences";
import { cookieUrl } from "../helper/url";


// استدعاء الدالة فقط بعد التأكد من وجود العنصر في DOM
export const Files = async () => {
  //const fileList = document.getElementById("file-list");
  document.getElementById("app").innerHTML = `
    <div id="file-list" class="file-list"> </div>
  ` ;

  // التحقق من حالة الاتصال بالإنترنت
  async function checkInternet() {
    const status = await Network.getStatus();
    return status.connected;
  }

  // جلب قائمة الملفات (PDF وصور) من السيرفر
  async function fetchFiles() {
    const isConnected = await checkInternet();
    if (!isConnected) {
      alert("يرجى الاتصال بالإنترنت.");
      return;
    }

    try {
      const {value: token} = await Preferences.get({ key: "authToken" });
      if (!token) {
        console.error("No auth token found!");
        return [];
      }
      const response = await CapacitorHttp.get({
        url: `${cookieUrl}/mobile/files`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        webFetchExtra: { credentials: "include" },
      });
      if (response.status === 200) {
        const files = response.data;
        console.log('--files is + ' + files)
        displayFiles(files);
      } else {
        console.error("Failed to fetch files:", response);
        return [];
      }
    } catch (error) {


  // إرسال إشعار عند اكتمال التنزيل أو حدوث خطأ
  const sendNotification = async (title, body) => {
    await LocalNotifications.schedule({
      notifications: [{
        title: title,
        body: body,
        id: Math.floor(Math.random() * 270) + 1,
        schedule: { at: new Date(Date.now() + 2000) }, // بعد ثانيتين
      }]
    });
  };

  // تنزيل ملف (PDF أو صورة) مع عرض شريط التقدم
  const downloadFile = async (id, title, url, type) => {
    try {
      const progressText = document.getElementById(`progress-text-${id}`);
      const progressBar = document.getElementById(`progress-${id}`);

      if (!progressText || !progressBar) {
        console.error('Progress elements not found for file id:', id);
        return;
      }

      // الاستماع لتقدم التنزيل
      const progressListener = Filesystem.addListener('progress', (progress) => {
        const percentCompleted = (progress.bytes / progress.contentLength) * 100;
        progressBar.style.width = `${percentCompleted}%`;
        progressText.innerText = `Downloading: ${Math.round(percentCompleted)}%`;
      });

      // تنزيل الملف
      const result = await Filesystem.downloadFile({
        path: `${title}.${type}`, // استخدام اسم الملف ونوعه
        directory: Directory.Documents,
        url: url,
        progress: true,
      });

      progressText.innerText = 'Download complete!';
      progressBar.style.width = '100%';

      // إخفاء شريط التقدم بعد 3 ثواني
      setTimeout(() => {
        progressBar.style.display = "none";
        progressText.style.display = "none";
      }, 3000);

      // إرسال إشعار عند اكتمال التنزيل
      sendNotification('Download Complete', `Your file "${title}" has been downloaded successfully.`);
      console.log('File downloaded successfully:', result);

      // فتح الملف بعد التنزيل
      openFile(result.path, `application/${type}`);
      
    } catch (error) {
      console.error('Error downloading file:', error);
      const progressText = document.getElementById(`progress-text-${id}`);
      const progressBar = document.getElementById(`progress-${id}`);

      // عرض رسالة خطأ وإخفاء العناصر
      progressText.innerText = 'Error during download';
      setTimeout(() => {
        progressBar.style.display = "none";
        progressText.style.display = "none";
      }, 2500);

      sendNotification('Download Failed', `There was an error downloading the file "${title}".`);
    }
  };

    });
  };

  // تنزيل ملف (PDF أو صورة) مع عرض شريط التقدم
  const downloadFile = async (id, title, url, type) => {
    try {
      const progressText = document.getElementById(`progress-text-${id}`);
      const progressBar = document.getElementById(`progress-${id}`);

      if (!progressText || !progressBar) {
        console.error('Progress elements not found for file id:', id);
        return;
      }

      // الاستماع لتقدم التنزيل
      const progressListener = Filesystem.addListener('progress', (progress) => {
        const percentCompleted = (progress.bytes / progress.contentLength) * 100;
        progressBar.style.width = `${percentCompleted}%`;
        progressText.innerText = `Downloading: ${Math.round(percentCompleted)}%`;
      });

      // تنزيل الملف
      const result = await Filesystem.downloadFile({
        path: `${title}.pdf`, // استخدام اسم الملف ونوعه
        directory: Directory.Documents,
        url: url,
        progress: true,
      });

      progressText.innerText = 'Download complete!';
      progressBar.style.width = '100%';

      // إخفاء شريط التقدم بعد 3 ثواني
      setTimeout(() => {
        progressBar.style.display = "none";
        progressText.style.display = "none";
      }, 3000);

      // إرسال إشعار عند اكتمال التنزيل
      sendNotification('Download Complete', `Your file "${title}" has been downloaded successfully.`);
      console.log('File downloaded successfully:', result);

      // فتح الملف بعد التنزيل
      openFile(result.path, `application/${type}`);
      
    } catch (error) {
      console.error('Error downloading file:', error);
      const progressText = document.getElementById(`progress-text-${id}`);
      const progressBar = document.getElementById(`progress-${id}`);

      // عرض رسالة خطأ وإخفاء العناصر
      progressText.innerText = 'Error during download';
      setTimeout(() => {
        progressBar.style.display = "none";
        progressText.style.display = "none";
      }, 2500);

      sendNotification('Download Failed', `There was an error downloading the file "${title}".`);
    }
  };

  // فتح الملف باستخدام File Opener (PDF أو صورة)
  async function openFile(filePath, mimeType) {
    try {
      await FileOpener.open({ filePath, mimeType });
    } catch (error) {
      console.error("Error opening file:", error);
    }
  }

  // استدعاء جلب الملفات
  await fetchFiles();
};

*/