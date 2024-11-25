import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import axios from 'axios';
import { cookieUrl } from './url';
import { profileInfo } from '../services/api';
//import { uploadImage } from './uploadImg';
/*
export const pickImageAndUpload = async (userId) => {
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
  };
*/


export const pickImageAndUpload = async () => {
  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt, // يمكن للمستخدم اختيار التقاط صورة أو تحديد صورة من المعرض
    });

    // التأكد من أن مسار الصورة موجود
    if (!photo || !photo.webPath) {
      throw new Error('Failed to capture or pick image');
    }

    // تحويل الصورة إلى blob
    const imageUrl = photo.webPath;

    const response = await fetch(imageUrl);

    // التأكد من أن الرد يحتوي على بيانات
    if (!response.ok) {
      throw new Error('Failed to fetch the image');
    }

    const blob = await response.blob();
    
    // التأكد من أن blob يحتوي على بيانات
    console.log("Blob size: ", blob.size);

    if (blob.size === 0) {
      throw new Error('Blob is empty, no image data found');
    }

    // إنشاء FormData لتجميع البيانات المرسلة
    const formData = new FormData();
    formData.append('file', blob, 'profile-pic.jpg'); // إضافة الصورة

    // التأكد من أن formData يحتوي على بيانات
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        console.log(`${pair[0]}:`, pair[1].name, pair[1].size, pair[1].type);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
    

    // الحصول على معلومات المستخدم
    const user = await profileInfo();
    
    // التأكد من وجود معرف المستخدم
    if (!user || !user.id) {
      throw new Error('User info is missing');
    }

    formData.append('userId', user.id); // إضافة userId للمستخدم

    // استخدام axios لإرسال البيانات
    const uploadResponse = await axios({
      method: 'post',
      url: `${cookieUrl}/mobile/upload`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true // للتأكد من إرسال الكوكيز مع الطلب

    });

    // التحقق من الرد
    if (uploadResponse.status === 200) {
      console.log('تم رفع الملف بنجاح:', uploadResponse.data);
    } else {
      console.error('فشل الرفع:', uploadResponse);
    }
  } catch (error) {
    console.error('خطأ في اختيار أو رفع الصورة:', error);
  }
};

 

   /*  const uploadResponse = await CapacitorHttp.post({
      url: `${cookieUrl}/mobile/upload`,
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      data: formData,
    }); */