import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
 
const showAction = async ()=> {
    const result = await ActionSheet.showActions({
        title: "خيارات الصورة",
        message: "اختر الإجراء الذي تريد تنفيذه",
        options: [
            {title: "رفع صورة", style: ActionSheetButtonStyle.Cancel},
            {title: "مشاركة", style: ActionSheetButtonStyle.Default},
            {title: "حذف",
                style: ActionSheetButtonStyle.Cancel // خيار حذفي
            },
        ]
    })

    console.log("نتيجة action sheet", result)
}

document.getElementById("actionSheet").addEventListener("click", showAction)
