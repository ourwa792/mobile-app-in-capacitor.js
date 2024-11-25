import { Cloudinary, ResourceType } from '@capawesome/capacitor-cloudinary';
import { FileOpener } from '@capacitor-community/file-opener';
import { LocalNotifications } from '@capacitor/local-notifications';

export const Files = async () => {
  document.getElementById("app").innerHTML = `
    <div id="file-list" class="file-list">
      <h3>Available Files</h3>
    </div>
  `;
  
  const fileList = document.getElementById("file-list");

  // تهيئة Cloudinary
  await Cloudinary.initialize({ cloudName: 'your_cloud_name' });

  // جلب الملفات من Cloudinary API
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "https://res.cloudinary.com/your_cloud_name/image/list/sample.json"
      );
      const data = await response.json();
      displayFiles(data.resources);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // عرض قائمة الملفات
  const displayFiles = (files) => {
    files.forEach((file) => {
      const fileElement = document.createElement("div");
      fileElement.innerHTML = `
        <p>${file.public_id}</p>
        <button onclick="downloadAndOpen('${file.secure_url}', '${file.format}')">Download</button>
      `;
      fileList.appendChild(fileElement);
    });
  };

  // تنزيل الملف وفتحه
  const downloadAndOpen = async (fileUrl, fileType) => {
    try {
      const { path } = await Cloudinary.downloadResource({ url: fileUrl });
      await FileOpener.open({ filePath: path, mimeType: `application/${fileType}` });
      await sendNotification('Download Complete', `File downloaded successfully.`);
    } catch (error) {
      console.error('Error downloading or opening file:', error);
      await sendNotification('Error', 'Download failed.');
    }
  };

  // إرسال إشعار
  const sendNotification = async (title, body) => {
    await LocalNotifications.schedule({
      notifications: [{ title, body, id: Math.floor(Math.random() * 1000) }]
    });
  };

  // تنفيذ الدوال
  await fetchFiles();
};
