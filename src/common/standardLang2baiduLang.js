/**
 * 实现标准 LanguageList 和 百度 LanguageList 之间的转换
 * reference link1: https://github.com/Selection-Translator/translation.js
 * reference link2: http://api.fanyi.baidu.com/api/trans/product/apidoc#languageList
 */


var languageMapArray = {
  'en' : 'en',
  'th' : 'th',
  'ru' : 'ru',
  'pt' : 'pt',
  'el' : 'el',
  'nl' : 'nl',
  'pl': 'pl',
  'bg' : 'bul',
  'et' : 'est',
  'da' : 'dan',
  'fi' : 'fin',
  'cs' : 'cs',
  'ro': 'rom',
  'sl': 'slo',
  'sv': 'swe',
  'hu': 'hu',
  'de': 'de',
  'it': 'it',
  'zh-CN': 'zh',
  'zh-TW': 'cht',
  // 'zh-HK': 'yue',
  'ja': 'jp',
  'ko': 'kor',
  'es': 'spa',
  'fr': 'fra',
  'ar': 'ara'
};

export function standardLang2baiduLang(standardLang){
  return languageMapArray[standardLang];
}

// /** 键和值都是字符串的对象 */
// export interface StringObject {
//   [prop: string]: string
// }

// export const standardLang2baiduLang: StringObject = {
//   en: 'en',
//   th: 'th',
//   ru: 'ru',
//   pt: 'pt',
//   el: 'el',
//   nl: 'nl',
//   pl: 'pl',
//   bg: 'bul',
//   et: 'est',
//   da: 'dan',
//   fi: 'fin',
//   cs: 'cs',
//   ro: 'rom',
//   sl: 'slo',
//   sv: 'swe',
//   hu: 'hu',
//   de: 'de',
//   it: 'it',
//   'zh-CN': 'zh',
//   'zh-TW': 'cht',
//   // 'zh-HK': 'yue',
//   ja: 'jp',
//   ko: 'kor',
//   es: 'spa',
//   fr: 'fra',
//   ar: 'ara'
// }

// /** 反转对象 */
// export function invert(obj: StringObject) {
//   const result: StringObject = {}
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       result[obj[key]] = key
//     }
//   }
//   return result
// }

// /** 百度自定义的语种名到标准语种名的映射 */
// export const baiduLang2standardLang = invert(standardLang2baiduLang)
