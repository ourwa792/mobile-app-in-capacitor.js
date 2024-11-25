import { CapacitorHttp } from "@capacitor/core";
import { logout } from "../js/auth";
import { profileInfo } from "../services/api";
import { Filesystem, Directory } from "@capacitor/filesystem"; 
import { CapacitorCookies } from "@capacitor/core";
import { cookieUrl } from "../helper/url";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { pickImageAndUpload } from "../helper/camera";

export const profile = async () => {
  const info = `
    <div class="h-75 col-sm-6 border-1 border-black card shadow-lg mb-3">
      <img id="avatar" class="img-thumbnail text-center" alt="profile"
       src="/profileAvatar.png"> 
      <div class="card-body">
        <button id="uploadButton" class="btn btn-info btn-sm">التقاط أو اختيار صورة</button>
      </div>
    </div>

    <div class="col-sm-8 border-1 border-black card shadow-lg">
      <div class="table-responsive">
        <table class="my-3 table table-striped">
          <tr>
            <th>اسم المستخدم</th>
            <td id="userName"></td>
          </tr>
          <tr>
            <th>الايميل</th>
            <td id="email"></td>
          </tr>
          <tr>
            <th>تاريخ الإنشاء :</th>
            <td id="createdAt"></td>
          </tr>
          <tr>
            <th>تسجيل الخروج</th>
            <td>
              <form id='logoutForm'>
                <button type="submit" class="btn bg-danger btn-sm">Log out</button>
              </form>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = info;

  document.getElementById("logoutForm").addEventListener("submit", (event) => {
    event.preventDefault();
    logout();
  });
  
  try {
    const user = await profileInfo(); // استدعاء دالة `profileInfo` لجلب البيانات
    if (user) {
      document.getElementById("userName").innerText = user.userName;
      document.getElementById("email").innerText = user.email;
      document.getElementById("createdAt").innerText = new Date(
        user.createdAt
      ).toLocaleDateString();
      //document.getElementById("avatar").src = user.avatar || ""; // رابط الصورة أو صورة افتراضية
      // إضافة استماع لزر رفع الصورة
      /*  document.getElementById('uploadButton').addEventListener('click', async () => {
        await pickImageAndUpload(user.id);  // تمرير userId
      }) */
    }
  } catch (error) {
    console.error("Error fetching profile info", error);
  };

// دالة لتحميل الصورة المحفوظة عند فتح التطبيق
  const loadSavedImage = async () => {
    try {
      const fileName = `profile_image.jpeg`; // اسم الصورة المحفوظة

      // محاولة قراءة الصورة من التخزين المحلي
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data,
      });

      // عرض الصورة المحفوظة
      const avatarElement = document.getElementById("avatar");
      avatarElement.src = `data:image/jpeg;base64,${file.data}`; // تحويل الصورة إلى Base64 وعرضها
    } catch (error) {
      console.log('No saved image found, using default avatar.');
    }
  }

  loadSavedImage();

  document
    .getElementById("uploadButton")
    .addEventListener("click", async () => {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Prompt, // السماح للمستخدم بالاختيار بين الكاميرا والمعرض
        });

        // عرض الصورة الملتقطة أو المختارة
        if (image && image.webPath) {
          const avatarElement = document.getElementById("avatar");
          avatarElement.src = image.webPath; // عرض الصورة باستخدام URI
          // حفظ الصورة محليًا
          const savedImage = await saveImage(image.path);
          console.log("Saved image URI", savedImage);
        }
      } catch (error) {
        console.error("Error capturing image:", error);
      }
  });

   // دالة لحفظ الصورة محليًا باستخدام Filesystem API
  const saveImage = async (filePath) => {
    try {
      // قراءة محتويات الصورة من المسار المحلي باستخدام Filesystem
      const file = await Filesystem.readFile({
        path: filePath,
      });

      const fileName = `profile_image.jpeg`;

      // كتابة الصورة إلى التخزين المحلي
      await Filesystem.writeFile({
        path: fileName,
        data: file.data,
        directory: Directory.Data,
      });

      console.log("Image saved locally");
      return fileName;
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };
  /*

  document.getElementById('uploadProfileImageForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const profileImageInput = document.getElementById('profileImage');
    //const file = profileImageInput.files[0];
    console.log("===file===" + profileImageInput)
    // التحقق من وجود الملف
    if (!file) {
      alert("يرجى اختيار صورة قبل الرفع.");
      return;
    }
  
    // التحقق من نوع الملف (يجب أن يكون صورة)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert("الملف المحدد ليس صورة. يجب أن يكون النوع: JPEG, PNG, GIF.");
      return;
    }
  
    // التحقق من حجم الملف (يجب أن يكون أقل من 1 ميغا بايت)
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 ميغا بايت
    if (file.size > maxSizeInBytes) {
      alert("حجم الصورة يتجاوز 1 ميغا. يرجى اختيار صورة أصغر.");
      return;
    }
  
    // تحويل الصورة إلى FormData لإرسالها
    const formData = new FormData();
    formData.append('profileImage', file);
  
    try {

      const cookies = await CapacitorCookies.getCookies({ url: cookieUrl });
      const sessionId = cookies["connect.sid"];
      
      const response = await CapacitorHttp.post({
        url: `${cookieUrl}/mobile/imgProfile`,
        headers: { "Cookie": `connect.sid=${sessionId}` },
        data: formData, // إرسال FormData إلى السيرفر
      });

      

      console.log("fetch IMage")
  
      if (response.status === 200) {
        await Toast.show({
          text: "تم رفع الصورة بنجاح",
          duration: "long",
          position: "top",
        });
        //window.location.reload(); // إعادة تحميل الصفحة
      } else {
        alert("فشل رفع الصورة، حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error uploading profile image", error);
    }
  });
  
*/ 

};