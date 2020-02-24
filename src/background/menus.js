import browser from "webextension-polyfill";
import browserInfo from "browser-info";
import log from "loglevel";
import { getSettings } from "src/settings/settings";
import { generateTranslateLinkUrl } from "src/common/generateTranslateUrl"


const logDir = "background/menus";

export const showMenus = () => {
  if (getSettings("ifShowMenu")) {
    removeMenus();
    createMenus();
  } else removeMenus();
};

export const onMenusShownListener = (info, tab) => {
  //选择文本或链接时隐藏页面翻译
  if (info.contexts.includes("selection") || info.contexts.includes("link")) {
    //通过设置password有效禁用
    browser.contextMenus.update("translatePage", { contexts: ["password"] });
  } else {
    browser.contextMenus.update("translatePage", { contexts: ["all"] });
  }
  browser.contextMenus.refresh();
};

export const onMenusClickedListener = (info, tab) => {
  log.log(logDir, "onMenusClickedListener()", info, tab);
  switch (info.menuItemId) {
    case "translatePage":
    case "translatePageOnTab":
      translatePage(info, tab);
      break;
    case "translateText":
      translateText(tab);
      break;
    case "translateLink":
      translateLink(info, tab);
      break;
  }
};

function createMenus() {
  const isValidContextsTypeTab = browserInfo().name === "Firefox" && browserInfo().version >= 53;
  if (isValidContextsTypeTab) {
    browser.contextMenus.create({
      id: "translatePageOnTab",
      title: browser.i18n.getMessage("translatePageMenu"),
      contexts: ["tab"]
    });
  }

  browser.contextMenus.create({
    id: "translatePage",
    title: browser.i18n.getMessage("translatePageMenu"),
    contexts: ["all"]
  });

  browser.contextMenus.create({
    id: "translateText",
    title: browser.i18n.getMessage("translateTextMenu"),
    contexts: ["selection"]
  });

  browser.contextMenus.create({
    id: "translateLink",
    title: browser.i18n.getMessage("translateLinkMenu"),
    contexts: ["link"]
  });
}

function removeMenus() {
  browser.contextMenus.removeAll();
}

function translateText(tab) {
  browser.tabs.sendMessage(tab.id, {
    message: "translateSelectedText"
  });
}

function translatePage(info, tab) {
  const targetLang = getSettings("targetLang");
  const encodedPageUrl = encodeURIComponent(info.pageUrl);
  // const translationUrl = `https://translate.google.cn/translate?hl=${targetLang}&sl=auto&u=${encodedPageUrl}`;
  
  // var baiduTargetLang = standardLang2baiduLang(targetLang);
  // const translationUrl = `http://fanyi.baidu.com/transpage?query=${encodedPageUrl}&source=url&from=auto&to=${baiduTargetLang}&render=1`
  
  const translationUrl = generateTranslateLinkUrl(targetLang, encodedPageUrl);
  browser.tabs.create({
    url: translationUrl,
    active: true,
    index: tab.index + 1
  });
}

function translateLink(info, tab) {
  const targetLang = getSettings("targetLang");
  const encodedLinkUrl = encodeURIComponent(info.linkUrl);
  // const translationUrl = `https://translate.google.cn/translate?hl=${targetLang}&sl=auto&u=${encodedLinkUrl}`;
  
  // var baiduTargetLang = standardLang2baiduLang(targetLang);
  // const translationUrl = `http://fanyi.baidu.com/transpage?query=${encodedLinkUrl}&source=url&from=auto&to=${baiduTargetLang}&render=1`;
  
  const translationUrl = generateTranslateLinkUrl(targetLang, encodedLinkUrl);
  browser.tabs.create({
    url: translationUrl,
    active: true,
    index: tab.index + 1
  });
}
