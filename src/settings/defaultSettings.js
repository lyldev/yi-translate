import browser from "webextension-polyfill";
import generateLangOptions from "src/common/generateLangOptions";

const getDefaultLangs = () => {
  const uiLang = browser.i18n.getUILanguage();
  const langOptions = generateLangOptions();

  var uiLangWithoutRegion = uiLang; //获取 uiLang 的无区域信息简写，如 "en" 而不是 "en-US"，从而与 langList 中的字符相匹配
  const findLang = (lang) => {
    const isSameLang = uiLangWithoutRegion.indexOf(lang.value) === 0;
    uiLangWithoutRegion = isSameLang ? lang.value : uiLangWithoutRegion;
    return isSameLang;
  }
  const shouldUseUiLang = langOptions.some(findLang);
  
  const targetLang = shouldUseUiLang ? uiLangWithoutRegion : "en";
  const secondTargetLang = targetLang === "en" ? "zh-CN" : "en";

  return { targetLang, secondTargetLang };
};

const langListOptions = generateLangOptions();
const defaultLangs = getDefaultLangs();

export default [
  {
    category: "generalLabel",
    elements: [
      {
        id: "isInChinaMainland",
        title: "isInChinaMainlandLabel",
        captions: ["isInChinaMainlandCaptionLabel", "isInChinaMainlandCaption2Label"],
        type: "checkbox",
        default: true
      },
      {
        id: "targetLang",
        title: "targetLangLabel",
        captions: ["targetLangCaptionLabel"],
        type: "select",
        default: defaultLangs.targetLang,
        options: langListOptions,
        useRawOptionName: true
      },
      {
        id: "secondTargetLang",
        title: "secondTargetLangLabel",
        captions: ["secondTargetLangCaptionLabel"],
        type: "select",
        default: defaultLangs.secondTargetLang,
        options: langListOptions,
        useRawOptionName: true
      },
      {
        id: "ifShowCandidate",
        title: "ifShowCandidateLabel",
        captions: ["ifShowCandidateCaptionLabel"],
        type: "checkbox",
        default: true
      }
    ]
  },
  {
    category: "webPageLabel",
    elements: [
      {
        id: "whenSelectText",
        title: "whenSelectTextLabel",
        captions: [],
        type: "none",
        default: "showButton",
        childElements: [
          {
            id: "whenSelectText",
            title: "ifShowButtonLabel",
            captions: ["ifShowButtonCaptionLabel"],
            type: "radio",
            value: "showButton"
          },
          {
            id: "whenSelectText",
            title: "ifAutoTranslateLabel",
            captions: ["ifAutoTranslateCaptionLabel"],
            type: "radio",
            value: "showPanel"
          },
          {
            id: "whenSelectText",
            title: "dontShowButtonLabel",
            captions: ["dontShowButtonCaptionLabel"],
            type: "radio",
            value: "dontShowButton"
          },
          {
            id: "ifCheckLang",
            title: "ifCheckLangLabel",
            captions: ["ifCheckLangCaptionLabel"],
            type: "checkbox",
            default: true,
            hr: true
          }
        ]
      },
      {
        id: "ifChangeSecondLangOnPage",
        title: "ifChangeSecondLangLabel",
        captions: ["ifChangeSecondLangOnPageCaptionLabel"],
        type: "checkbox",
        default: false
      },
      {
        id: "isDisabledInTextFields",
        title: "isDisabledInTextFieldsLabel",
        captions: ["isDisabledInTextFieldsCaptionLabel"],
        type: "checkbox",
        default: false,
        new: true
      },
      {
        id: "disableUrlList",
        title: "disableUrlListLabel",
        captions: ["disableUrlListCaptionLabel"],
        type: "textarea",
        default: "",
        placeholder: "https://example.com/*\nhttps://example.net/*"
      }
    ]
  },
  {
    category: "toolbarLabel",
    elements: [
      {
        id: "waitTime",
        title: "waitTimeLabel",
        captions: ["waitTimeCaptionLabel", "waitTime2CaptionLabel"],
        type: "number",
        min: 0,
        placeholder: 500,
        default: 500
      },
      {
        id: "ifChangeSecondLang",
        title: "ifChangeSecondLangLabel",
        captions: ["ifChangeSecondLangCaptionLabel"],
        type: "checkbox",
        default: true
      }
    ]
  },
  {
    category: "menuLabel",
    elements: [
      {
        id: "ifShowMenu",
        title: "ifShowMenuLabel",
        captions: ["ifShowMenuCaptionLabel"],
        type: "checkbox",
        default: true
      }
    ]
  },
  {
    category: "styleLabel",
    elements: [
      {
        title: "buttonStyleLabel",
        captions: ["buttonStyleCaptionLabel"],
        type: "none",
        childElements: [
          {
            id: "buttonSize",
            title: "buttonSizeLabel",
            captions: [],
            type: "number",
            min: 1,
            placeholder: 25,
            default: 25
          },
          {
            id: "buttonDirection",
            title: "displayDirectionLabel",
            captions: [],
            type: "select",
            default: "bottom",
            options: [
              {
                name: "topLabel",
                value: "top"
              },
              {
                name: "bottomLabel",
                value: "bottom"
              },
              {
                name: "rightLabel",
                value: "right"
              },
              {
                name: "leftLabel",
                value: "left"
              },
              {
                name: "topRightLabel",
                value: "topRight"
              },
              {
                name: "topLeftLabel",
                value: "topLeft"
              },
              {
                name: "bottomRightLabel",
                value: "bottomRight"
              },
              {
                name: "bottomLeftLabel",
                value: "bottomLeft"
              }
            ]
          },
          {
            id: "buttonOffset",
            title: "positionOffsetLabel",
            captions: [],
            type: "number",
            default: 10,
            placeholder: 10
          }
        ]
      },
      {
        title: "panelStyleLabel",
        captions: ["panelStyleCaptionLabel"],
        type: "none",
        childElements: [
          {
            id: "width",
            title: "widthLabel",
            captions: [],
            type: "number",
            min: 1,
            placeholder: 300,
            default: 300
          },
          {
            id: "height",
            title: "heightLabel",
            captions: [],
            type: "number",
            min: 1,
            placeholder: 150,
            default: 150
          },
          {
            id: "fontSize",
            title: "fontSizeLabel",
            captions: [],
            type: "number",
            min: 1,
            placeholder: 12,
            default: 12
          },
          {
            id: "panelReferencePoint",
            title: "referencePointLabel",
            captions: [],
            type: "select",
            default: "bottomSelectedText",
            options: [
              {
                name: "topSelectedTextLabel",
                value: "topSelectedText"
              },
              {
                name: "bottomSelectedTextLabel",
                value: "bottomSelectedText"
              },
              {
                name: "clickedPointLabel",
                value: "clickedPoint"
              }
            ]
          },
          {
            id: "panelDirection",
            title: "displayDirectionLabel",
            captions: [],
            type: "select",
            default: "bottom",
            options: [
              {
                name: "topLabel",
                value: "top"
              },
              {
                name: "bottomLabel",
                value: "bottom"
              },
              {
                name: "rightLabel",
                value: "right"
              },
              {
                name: "leftLabel",
                value: "left"
              },
              {
                name: "topRightLabel",
                value: "topRight"
              },
              {
                name: "topLeftLabel",
                value: "topLeft"
              },
              {
                name: "bottomRightLabel",
                value: "bottomRight"
              },
              {
                name: "bottomLeftLabel",
                value: "bottomLeft"
              }
            ]
          },
          {
            id: "panelOffset",
            title: "positionOffsetLabel",
            captions: [],
            type: "number",
            default: 10,
            placeholder: 10
          },
          {
            id: "resultFontColor",
            title: "resultFontColorLabel",
            captions: [],
            type: "color",
            default: "#000000"
          },
          {
            id: "candidateFontColor",
            title: "candidateFontColorLabel",
            captions: [],
            type: "color",
            default: "#737373"
          },
          {
            id: "bgColor",
            title: "bgColorLabel",
            captions: [],
            type: "color",
            default: "#ffffff"
          }
        ]
      }
    ]
  },
  {
    category: "otherLabel",
    elements: [
      {
        id: "isShowOptionsPageWhenUpdated",
        title: "isShowOptionsPageWhenUpdatedLabel",
        captions: ["isShowOptionsPageWhenUpdatedCaptionLabel"],
        type: "checkbox",
        default: true
      },
      {
        id: "isDebugMode",
        title: "isDebugModeLabel",
        captions: ["isDebugModeCaptionLabel"],
        type: "checkbox",
        default: false
      }
    ]
  }
];
