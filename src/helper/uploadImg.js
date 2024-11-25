import { CapacitorHttp } from "@capacitor/core";
import { cookieUrl } from "./url";
// دالة رفع الصورة إلى السيرفر
export const uploadImage = async (blob, userId) => {
  const formData = new FormData();
  formData.append("file", blob, "profile.jpg"); // إرسال الصورة
  formData.append("userId", userId); // إرسال userId الخاص بالمستخدم

  console.log("==formData==" + JSON.stringify(formData));
  try {
    const response = await CapacitorHttp.post({
      url: `${cookieUrl}/upload`, // رابط الـ API
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    });
    console.log("==response==" + JSON.stringify(response));

    if (response.status === 200) {
      const { imageUrl } = response.data;
      document.getElementById("avatar").src = imageUrl; // تحديث الصورة في الواجهة
      console.log("Image uploaded successfully:", imageUrl);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
