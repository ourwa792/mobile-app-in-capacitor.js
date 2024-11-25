// api.js
import { CapacitorHttp } from "@capacitor/core";
import { cookieUrl } from "../helper/url";
import { Preferences } from "@capacitor/preferences";

// lesson list
/* export const getLessons = async () => {
  
    try {
      const response = await CapacitorHttp.get({
        headers: {
          "Cookie": `connect.sid=${sessionId}`,
          "Content-Type": "application/json",
        },
        url: `${cookieUrl}/mobile/lessons`,
        webFetchExtra: {
          credentials:"include"
        }
      });
      const lessons = response.data.lessons;
      //console.log(lessons)
      return lessons;

    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
}; */

export const getLessons = async () => {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });
    if (!token) {
      console.error("No auth token found!");
      return [];
    }

    const response = await CapacitorHttp.get({
      url: `${cookieUrl}/mobile/lessons`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      webFetchExtra: { credentials: "include" },
    });
    if(response.status === 200){
      const lessons = response.data.lessons;
      console.log(lessons)
      return lessons;
    } else {
      console.error('Error fetching lessons:', response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return null;
  }
};

// lessons details
/* export const getLessonDetails = async (lessonId) => {
  const cookies = await CapacitorCookies.getCookies({
    url: cookieUrl,
  });
  
  // استخراج sessionId من الكوكيز
  const sessionId = cookies["connect.sid"];
  try {
    const response = await CapacitorHttp.get({
      headers: {
        "Cookie": `connect.sid=${sessionId}`,
        "Content-Type": "application/json",
      },
      url: `${cookieUrl}/mobile/lessons/${lessonId}`,
      webFetchExtra: {
        credentials:"include"
      }
    });

    //console.log("Response data:", response.data)

    const lessons = response.data ;
    //console.log("getLssonDetails"+ JSON.stringify(lessons))
    return lessons;

  } catch (error) {
    console.error("Error fetching lesson details:", error);
    return null;
  }
}; */

export const getLessonDetails = async (lessonId) => {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });
    if (!token) {
      console.error("No auth token found!");
      return null;
    }

    const response = await CapacitorHttp.get({
      url: `${cookieUrl}/mobile/lessons/${lessonId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      webFetchExtra: { credentials: "include" },
    });

    if(response.status === 200){
      const lessons = response.data ;
      console.log("getLssonDetails"+ JSON.stringify(lessons))
      return lessons;
    } else{
      console.error("Error fetching lesson details:", response.status);
      return [];
    }

  } catch (error) {
    console.error("Error fetching lesson details:", error);
    return null;
  }
};

// user profile
/* export const profileInfo = async () => {
  const cookies = await CapacitorCookies.getCookies({ url: cookieUrl });
  const sessionId = cookies["connect.sid"];
  
  const response = await CapacitorHttp.get({
    url: `${cookieUrl}/mobile/profile`,
    headers: {
      "Cookie": `connect.sid=${sessionId}`,
      "Content-Type": "application/json",
    },
    webFetchExtra:{
      credentials: "include"
    }
  });

  if (response.status === 200) {
    const user = response.data.user;
    return user

  }
}; */

export const profileInfo = async () => {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });
    if (!token) {
      console.error("No auth token found!");
      return null;
    }

    const response = await CapacitorHttp.get({
      url: `${cookieUrl}/mobile/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      webFetchExtra: { credentials: "include" },
    });

    return response.status === 200 ? response.data.user : null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// دالة لجلب قائمة الكويزات من API
export const fetchQuizzes = async () => {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });
    if (!token) {
      console.error("No auth token found!");
      return [];
    }
    const response = await CapacitorHttp.get({
      url: `${cookieUrl}/mobile/allQuiz`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      webFetchExtra: { credentials: "include" }
    });

    if(response.status === 200){
      const quizs = response.data.allQuiz;
      console.log(quizs);
      return quizs;
    } else {
      console.error("Error fetching quizzes:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};

// دالة لجلب بيانات الكويز المحدد
/* 
export const fetchQuizData = async (quizId) => {
  const cookies = await CapacitorCookies.getCookies({
    url: cookieUrl,
  });

  // استخراج sessionId من الكوكيز
  const sessionId = cookies["connect.sid"];
  try {
    const response = await CapacitorHttp.get({
      headers: {
        Cookie: `connect.sid=${sessionId}`,
        "Content-Type": "application/json",
      },
      url: `${cookieUrl}/mobile/quiz/${quizId}`,
      webFetchExtra: {
        credentials: "include",
      },
    });
    const data = await response.data.quiz;
    return data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
}; 
*/

export const fetchQuizData = async (quizId) => {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });
    if (!token) {
      console.error("No auth token found!");
      return [];
    }

    const response = await CapacitorHttp.get({
      url: `${cookieUrl}/mobile/quiz/${quizId}`,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      webFetchExtra: { credentials: "include" }
    });

    if(response.status === 200){
      const data = await response.data.quiz;
      return data;
    } else{
      console.error("Error fetching quiz data:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
};

// send quiz
export const sendResultToServer = async (userScore, quizId)=> {
  try {
    const { value: token } = await Preferences.get({ key: "authToken" });
    if (!token) {
      console.error("No auth token found!");
      return [];
    }
    const response = await CapacitorHttp.post({
      url: `${cookieUrl}/mobile/quiz/saveResult`,
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
      data: { quizId, userScore, }, // لا تحتاج إلى JSON.stringify
      webFetchExtra: {
        credentials: "include",
      },
    });

    const data = response.data; 
    console.log('Server Response:', data);

    return data.certificateUrl || null;

  } catch (error) {
      console.error('Error sending result:', error);
  }
}