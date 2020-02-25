import { getSettings } from "src/settings/settings"
import { standardLang2baiduLang } from "src/common/standardLang2baiduLang";
import log from "loglevel";

let translationHistory = [];
const logDir = "common/translate";

const getHistory = (sourceWord, sourceLang, targetLang) => {
  const history = translationHistory.find(
    history =>
      history.sourceWord == sourceWord &&
      history.sourceLang == sourceLang &&
      history.targetLang == targetLang &&
      history.result.statusText == "OK"
  );
  return history;
};

const setHistory = (sourceWord, sourceLang, targetLang, formattedResult) => {
  translationHistory.push({
    sourceWord: sourceWord,
    sourceLang: sourceLang,
    targetLang: targetLang,
    result: formattedResult
  });
};

const sendRequest = (word, sourceLang, targetLang) => {
  log.log(logDir, "sendRequest()");
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&dt=bd&dj=1&q=${encodeURIComponent(
    word
  )}`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open("GET", url);
  xhr.send();

  return new Promise((resolve, reject) => {
    xhr.onload = () => {
      resolve(xhr);
    };
    xhr.onerror = () => {
      resolve(xhr);
    };
  });
};

const formatResult = result => {
  const resultData = {
    resultText: "",
    candidateText: "",
    sourceLanguage: "",
    percentage: 0,
    statusText: ""
  };

  if (result.status === 0) resultData.statusText = "Network Error";
  else if (result.status === 200) resultData.statusText = "OK";
  else if (result.status === 429) resultData.statusText = "Service Unavailable";
  else if (result.status === 503) resultData.statusText = "Service Unavailable";
  else resultData.statusText = result.statusText || result.status;

  if (resultData.statusText !== "OK") {
    log.error(logDir, "formatResult()", resultData);
    return resultData;
  }

  resultData.sourceLanguage = result.response.src;
  resultData.percentage = result.response.ld_result.srclangs_confidences[0];
  resultData.resultText = result.response.sentences.map(sentence => sentence.trans).join("");
  if (result.response.dict) {
    resultData.candidateText = result.response.dict
      .map(dict => `${dict.pos}${dict.pos != "" ? ": " : ""}${dict.terms.join(", ")}\n`)
      .join("");
  }

  log.log(logDir, "formatResult()", resultData);
  return resultData;
};

/**
 * 调用 google api 翻译文本并返回翻译结果
 * surprisingly, api 没有被墙
 * @param {待翻译文本} sourceWord 
 * @param {源语言} sourceLang 
 * @param {目标语言} targetLang 
 */
async function translate(sourceWord, sourceLang = "auto", targetLang) {
  log.log(logDir, "tranlate()", sourceWord, targetLang);
  sourceWord = sourceWord.trim();
  if (sourceWord === "")
    return {
      resultText: "",
      candidateText: "",
      sourceLanguage: "en",
      percentage: 0,
      statusText: "OK"
    };

  const history = getHistory(sourceWord, sourceLang, targetLang);
  if (history) return history.result;

  const result = await sendRequest(sourceWord, sourceLang, targetLang);
  const formattedResult = formatResult(result);
  setHistory(sourceWord, sourceLang, targetLang, formattedResult);
  return formattedResult;
};

/**
 * 生成翻译文本的 url
 * 用于 popup 中的 open in google
 * 根据用户设置返回 [ translate.google.com ] 或 [ translate.google.cn ]
 * @param {目标语言} targetLang 
 * @param {编码后的文本} encodedText 
 */
function generateTranslateTextUrl(targetLang, encodedText) {
  const googleComTranslateTextUrl = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}`;
  const googleCnTranslateTextUrl = `https://translate.google.cn/?sl=auto&tl=${targetLang}&text=${encodedText}`;
  const isInChinaMainland = getSettings("isInChinaMainland");
  return isInChinaMainland ? googleCnTranslateTextUrl : googleComTranslateTextUrl;
}

/**
 * 生成翻译整个网页的 url
 * 用于 translate link 和 translate page
 * 根据用户设置返回 [ translate.google.com ] 或 [ fanyi.baidu.com ]
 * @param {目标语言} targetLang 
 * @param {编码后的网页链接} encodedLinkUrl 
 */
function generateTranslateLinkUrl(targetLang, encodedLinkUrl) {
  const googleComTranslateLinkUrl = `https://translate.google.com/translate?hl=${targetLang}&sl=auto&u=${encodedLinkUrl}`;
  var baiduTargetLang = standardLang2baiduLang(targetLang);
  const baiduTranslateLinkUrl = `http://fanyi.baidu.com/transpage?from=auto&to=${baiduTargetLang}&query=${encodedLinkUrl}&source=url&render=1`;
  const isInChinaMainland = getSettings("isInChinaMainland");
  return isInChinaMainland ? baiduTranslateLinkUrl : googleComTranslateLinkUrl;
}

export { translate, generateTranslateTextUrl, generateTranslateLinkUrl };
