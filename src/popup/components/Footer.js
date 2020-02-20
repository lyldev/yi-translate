import React, { Component } from "react";
import browser from "webextension-polyfill";
import generateLangOptions from "src/common/generateLangOptions";
import openUrl from "src/common/openUrl";
import { standardLang2baiduLang } from "src/common/standardLang2baiduLang";
import "../styles/Footer.scss";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.langList = generateLangOptions();
  }

  handleLinkClick = async () => {
    const { tabUrl, targetLang } = this.props;
    const encodedUrl = encodeURIComponent(tabUrl);
    // const translateUrl = `https://translate.google.cn/translate?hl=${targetLang}&sl=auto&u=${encodedUrl}`;
    var baiduTargetLang = standardLang2baiduLang(targetLang);
    const translateUrl = `http://fanyi.baidu.com/transpage?query=${encodedUrl}&source=url&from=auto&to=${baiduTargetLang}&render=1`;
    openUrl(translateUrl);
  };

  handleChange = e => {
    const lang = e.target.value;
    this.props.handleLangChange(lang);
  };

  render() {
    const { tabUrl, targetLang } = this.props;

    return (
      <div id="footer">
        <div className="translateLink">
          {tabUrl && <a onClick={this.handleLinkClick}>{browser.i18n.getMessage("showLink")}</a>}
        </div>
        <div className="selectWrap">
          <select
            id="langList"
            value={targetLang}
            onChange={this.handleChange}
            title={browser.i18n.getMessage("targetLangLabel")}
          >
            {this.langList.map(option => (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}
