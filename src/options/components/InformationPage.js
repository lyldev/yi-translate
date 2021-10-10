import React from "react";
import browser from "webextension-polyfill";
import browserInfo from "browser-info";
import queryString from "query-string";
import OptionsContainer from "./OptionContainer";
import {
  patreonLink,
  buymeacoffeeLink,
  chongyaLink,
  afdianLink,
  chromeExtensionUrl,
  firefoxAddonUrl
} from "src/common/personalUrls";
import manifest from "src/manifest-chrome.json";

var buttonStyle = {
  height: "38px",
  width: "162px",
  border: "solid 1px "
};

export default props => {
  const query = queryString.parse(props.location.search);
  const extensionVersion = manifest.version;

  return (
    <div>
      <p className="contentTitle">{browser.i18n.getMessage("informationLabel")}</p>
      <hr />
      <OptionsContainer
        title={"extName"}
        captions={[]}
        type={"none"}
        updated={query.action === "updated"}
        extraCaption={
          <p className="caption">
            <a href={firefoxAddonUrl} target="_blank">
              Version {extensionVersion}
            </a>
            <span>　</span>
          </p>
        }
      />
      <hr />
      <OptionsContainer title={"donationLabel"} captions={["donationCaptionLabel"]} type={"none"} />
      <OptionsContainer
        title={""}
        captions={[]}
        type={"none"}
        extraCaption={
          <a href={buymeacoffeeLink} target="_blank">
              · Buy Me A Coffee
          </a>
        }
      />
      <OptionsContainer
        title={""}
        captions={[]}
        type={"none"}
        extraCaption={
          <a href={afdianLink} target="_blank">
              · 使用爱发电捐赠
          </a>
        }
      />
      <hr />

      <OptionsContainer
        title={"licenseLabel"}
        captions={["Mozilla Public License, Version. 2.0"]}
        useRawCaptions={true}
        type={"none"}
      />
      <hr />
      <OptionsContainer
        title={""}
        captions={[]}
        type={"none"}
        extraCaption={
          <div>
            <p>
              {browserInfo().name === "Chrome" ? (
                <a href={chromeExtensionUrl} target="_blank">
                  {browser.i18n.getMessage("extensionPageLabel")}
                </a>
              ) : (
                <a href={firefoxAddonUrl} target="_blank">
                  {browser.i18n.getMessage("addonPageLabel")}
                </a>
              )}
              <span>　　</span>
              <a href="https://github.com/lyldev/yi-translate" target="_blank">
                GitHub page
              </a>
              <span>　　</span>
              <a href="https://github.com/lyldev/yi-translate/blob/master/BACKERS.md" target="_blank">
                Supporters List
              </a>
            </p>
          </div>
        }
      />
    </div>
  );
};
