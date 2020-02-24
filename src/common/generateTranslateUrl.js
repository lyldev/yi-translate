import { getSettings } from "src/settings/settings"
import { standardLang2baiduLang } from "src/common/standardLang2baiduLang";


function generateTranslateTextUrl(targetLang, encodedText) {
    const googleComTranslateTextUrl = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}`;
    const googleCnTranslateTextUrl = `https://translate.google.cn/?sl=auto&tl=${targetLang}&text=${encodedText}`;
    const isInChinaMainland = getSettings("isInChinaMainland");
    return isInChinaMainland ? googleCnTranslateTextUrl : googleComTranslateTextUrl;
}

function generateTranslateLinkUrl(targetLang, encodedLinkUrl) {
    const googleComTranslateLinkUrl = `https://translate.google.com/translate?hl=${targetLang}&sl=auto&u=${encodedLinkUrl}`;
    var baiduTargetLang = standardLang2baiduLang(targetLang);
    const baiduTranslateLinkUrl = `http://fanyi.baidu.com/transpage?from=auto&to=${baiduTargetLang}&query=${encodedLinkUrl}&source=url&render=1`;
    const isInChinaMainland = getSettings("isInChinaMainland");
    return isInChinaMainland ? baiduTranslateLinkUrl : googleComTranslateLinkUrl;
}

export { generateTranslateTextUrl, generateTranslateLinkUrl };