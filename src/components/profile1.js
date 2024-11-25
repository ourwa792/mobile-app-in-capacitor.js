import axios from "axios";
import { profileInfo } from "../services/api";
import { logout } from '../js/auth';
import { cookieUrl } from '../helper/url';


export const profile = async () => {
  // دالة لالتقاط الصورة ورفعها للسيرفر
/*   const pickImageAndUpload = async (userId) => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,  // إتاحة الخيار بين الكاميرا والمعرض
      });

      if (image && image.webPath) {
        // تحويل الصورة إلى Blob
        const response = await fetch(image.webPath);
        const blob = await response.blob();

        // رفع الصورة إلى السيرفر
        await uploadImage(blob, userId);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }; */

  // دالة رفع الصورة إلى السيرفر
/*   const uploadImage = async (blob, userId) => {
    const formData = new FormData();
    formData.append('file', blob, 'profile.jpg');  // إرسال الصورة
    formData.append('userId', userId);  // إرسال userId الخاص بالمستخدم

    try {
      const response = await CapacitorHttp.post({
        url: `${cookieUrl}/upload`,  // رابط الـ API
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      });

      if (response.status === 200) {
        const { imageUrl } = response.data;
        document.getElementById('avatar').src = imageUrl;  // تحديث الصورة في الواجهة
        console.log('Image uploaded successfully:', imageUrl);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }; */

  const info = `
    <div class="w-50 h-50 col-sm-6 border-1 border-black card shadow-lg mb-3">
      <img id="avatar" class="img-thumbnail" alt="profile">
      
    </div>  

    <div class="col-sm-8 border-1 border-black card shadow-lg" style="direction: rtl;">
    <div class=" card-container card-body" > 
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
          <th>تاريخ الانشاء :</th>
          <td id="createdAt"></td>
        </tr>
        <tr>
          <th>تسجيل الخروج</th>
          <td>
            <form id='logoutForm'>
              <button type="submit" class="btn bg-danger button-danger btn-sm">Log out</button>
            </form>
          </td>
        </tr>
      </table>
      </div>
    </div>
  `;

  document.getElementById("app").innerHTML = info;

    // استماع لزر تسجيل الخروج
    document.getElementById('logoutForm').addEventListener('submit', (event) => {
      event.preventDefault();
      logout();
    });

    const user = await profileInfo();

    // إضافة استماع لزر رفع الصورة إذا كان موجودًا
 /*    document.getElementById('uploadButton').addEventListener('click', async () => {
      if (user && user.id) {
        pickImageAndUpload(user.id);  // تمرير userId
      } else {
        console.error('User ID is missing.');
      }
    }); */

    try {

      if (user) {
        document.getElementById('userName').innerText = user.userName || 'Unknown';
        document.getElementById('email').innerText = user.email || 'No email';
        document.getElementById('createdAt').innerText = user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : 'Unknown';
        document.getElementById('avatar').src = user.avatar || 'default-avatar.png';

        /*
        // handel form
        document.getElementById("uploadForm").addEventListener("submit", async function (event) {
          
          event.preventDefault();
          const thumbnailInput = document.getElementById('profileImage');
          console.log("thumbnailInput "+JSON.stringify(thumbnailInput))
          const thumbnailMaxSize = 1 * 1024 * 1024; // 2MB

          if (thumbnailInput.files.length > 1) {
            alert("اختر صورة واحدة فقط")
            
            thumbnailInput.value = '';
            return false;
          }
          if (thumbnailInput.files.length > 0) {
            const thumbnail = thumbnailInput.files[0];
            if (!thumbnail.type.startsWith('image/')) {
           
              alert('اختر تنسيق صورة حصراً');
              thumbnailInput.value = '';
              return false;
            }
          
            if (thumbnail.size > thumbnailMaxSize) {
              alert("اختر  صورة بحجم 1 ميغا على الاكثر")
              thumbnailInput.value = '';
              return false;
            }
          }

          const formData = new FormData(thumbnailInput);
          console.log("formData "+JSON.stringify(formData));

          try {
            
            const response = await axios({
              method: 'post',
              url: `${cookieUrl}/mobile/upload`,
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              withCredentials: true // للتأكد من إرسال الكوكيز مع الطلب
        
            });

            const result = await response.data;
            console.log(result);

           
            
          } catch (error) {
            
          }

        })
       */   
     
      }
    } catch (error) {
      console.error("Error fetching profile info", error);
    }

};
