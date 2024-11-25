import { Cloudinary } from "@capawesome/capacitor-cloudinary";
import { LocalNotifications } from "@capacitor/local-notifications";
import { FileOpener } from "@capacitor-community/file-opener";


const initialize = async () => {
    await Cloudinary.initialize({ cloudName: 'dg0d0jmtz' });
  };

export const downloadCertificate = async (certificateUrl) => {

    initialize(); 

    try {
        const {path} = await Cloudinary.downloadResource({
            url: `${certificateUrl}`
        });
        console.log('تم تنزيل الشهادة في:', path);
        //return path;
        await LocalNotifications.schedule({
            notifications: [{ title: "اكتمل التنزيل", 
                body: "تم تنزيل شهادتك بنجاح", 
                id: Math.floor(Math.random() * 1000)
            }]
          });
        await FileOpener.open({
            filePath: path,
            contentType: 'application/pdf'
        })

    } catch (error) {
        console.log('error download '+ error);
    }        
};