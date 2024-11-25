import {Style, StatusBar} from "@capacitor/status-bar";

//StatusBar.setOverlaysWebView({overlay:true})

const setStatusBarStyleDark = async ()=> {
    await StatusBar.setStyle({style: Style.Dark})
} 
setStatusBarStyleDark()

/* const setStatusBarStyleLight = async ()=> {
    await StatusBar.setStyle({style: Style.Light})
} */

/* 
const hideStatusBar = async () => {
    await StatusBar.hide();
};  */


/* const showStatusBar = async()=> {
    await StatusBar.show()
}  */

/* const setBackgroundColor = async () => {
    await StatusBar.setBackgroundColor({ color: '#aefe91' }); // تعيين اللون إلى الأحمر
};
setBackgroundColor()

const getStatusBarInfo = async () => {
    try {
        const statusBarInfo = await StatusBar.getInfo();
      console.log(statusBarInfo);
    } catch (error) {
      console.error("Error fetching status bar info:", error);
    }
}y        
    
*/