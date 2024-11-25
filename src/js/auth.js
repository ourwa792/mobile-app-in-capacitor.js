import { CapacitorHttp } from "@capacitor/core";
import { Toast } from "@capacitor/toast";
import { router } from "./routes";
import { cookieUrl } from "../helper/url";
import { Preferences } from "@capacitor/preferences";

// Sign-up
export const register = async (userName, email, password) => {
  try {
    const response = await CapacitorHttp.post({
      url: `${cookieUrl}/mobile/register`,
      headers: { "Content-Type": "application/json" },
      data: { userName, email, password }, // لا تحتاج إلى JSON.stringify
    });
    const data = response.data; // لا تحتاج ل await response.json()
    console.log(data);
    if (response.status === 200) {
      console.log(data);

      await Toast.show({
        text: `تم التسجيل بنجاح، أهلاً بك ${data.user.userName}`,
        duration: "long",
        position: "top",
      });
      console.log("/login");
      router.navigateByName("login");
    } else if (response.status === 400) {
      console.log(response);
      const errorData = data.errors || [data.errors] || [];
      let errorMessage = "";
      errorData.forEach((error) => {
        errorMessage += `${error.msg}\n`;
      });
      await Toast.show({
        text: errorMessage,
        duration: "long",
        position: "top",
      });
    } else {
      alert(data.message || "خطأ غير معروف");
    }
  } catch (error) {
    console.log("Error during registration:", error);
    alert("An error occurred. Please try again.");
  }
};

// login
export const login = async (email, password) => {
  try {
    const response = await CapacitorHttp.post({
      url: `${cookieUrl}/mobile/login`,
      headers: { "Content-Type": "application/json" },
      data: { email, password }, // لا تحتاج إلى JSON.stringify
      webFetchExtra: {
        credentials: "include",
      },
    });
    const res = response.data; // لا تحتاج ل await response.json()
    //console.log("res is "+ res);

    if (response.status === 200) {
      const { token } = response.data;
      console.log("token is " + token);
      await Preferences.set({ key: "authToken", value: token });

      const { value } = await Preferences.get({ key: "authToken" });

      console.log("tokne is from Preference:" + value);

      await Toast.show({
        text: "تم تسجيل الدخول بنجاح!",
        duration: "long",
      });

      router.navigate("/profile");
    } else if (response.status === 400) {
      /*  else {
        console.error("Failed to set session cookie");
        await Toast.show({
          text: "Failed to set session cookie",
          duration: "long",
          position: "top",
        });
      } */
      console.log(response);
      let errorMessage = response.data.message;
      await Toast.show({
        text: errorMessage,
        duration: "long",
        position: "top",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
};

//check session
export const checkSession = async () => {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });

    if (!token) {
      console.log("No token found, user is not logged in.");
      return false;
    }
    // إرسال الطلب للتحقق من صلاحية الـ JWT
    if (token) {
      // إرسال طلب إلى السيرفر للتحقق من الجلسة
      const response = await CapacitorHttp.get({
        url: `${cookieUrl}/mobile/checkSession`,
        headers: { Authorization: `Bearer ${token}` },
      });

      // إذا كان الرد من السيرفر ناجحاً
      if (response.status === 200) {
        const data = response.data; // الحصول على بيانات المستخدم من الرد
        console.log("Session is active:", data.user);
        return true; // الجلسة نشطة
      } else {
        console.log("Session expired.");
        await Preferences.remove({ key: "authToken" });
        return false;
      }
    } else {
      console.log("No session found.");
      return false; // لا يوجد كوكي يحتوي على sessionId
    }
  } catch (error) {
    console.error("Error checking session:", error);
    return false; // حدث خطأ أثناء التحقق من الجلسة
  }
};

// Log-out
export const logout = async () => {
  try {
    await Preferences.remove({ key: "authToken" });
    console.log("User logged out successfully.");
    router.navigate("/login");
    await Toast.show({
      text: "تم تسجيل الخروج !",
      duration: "long",
      position: "top"
    });
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
