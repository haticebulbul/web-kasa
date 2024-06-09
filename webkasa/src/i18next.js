// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import LanguageDetector from 'i18next-browser-languagedetector'

// import tEN from "./translation/en/translation.json"
// import tDE from "./translation/de/translation.json"
// import tTR from "./translation/tr/translation.json"

// const resources = {
//     en: {
//         translation: tEN
//     },
//     de: {
//         translation: tDE
//     },
//     tr: {
//         translation: tTR
//     }
// };

// i18n
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
        
//         fallbackLng: "tr",
//         debug: false,
//         resources,
//         interpolation: {
//             escapeValue: false
//         }
//     });

// export default i18n;

//Seçim yapıldıktn sonra dilimizi tanımladığımız json dosyalarına göre değiştirecek.



import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
        en: {
           welcome: "Welcome"
        },
        
        tr: {
            welcome: "Hoşgeldin"
        }
    };

i18n
 .use(initReactI18next)
 .init({
    lng:"tr",
    resources

 })

 export default i18n;