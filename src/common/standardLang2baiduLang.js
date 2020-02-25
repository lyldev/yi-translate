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
