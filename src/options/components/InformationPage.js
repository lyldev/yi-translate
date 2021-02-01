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
            <img
              src="https://cdn.buymeacoffee.com/buttons/arial-violet.png" 
              alt="Donate with Buy Me A Coffee" 
              style={buttonStyle}
            />
          </a>
        }
      />
      <OptionsContainer
        title={""}
        captions={[]}
        type={"none"}
        extraCaption={
          <a href={afdianLink} target="_blank">
            <img 
            src="data:image/png;base64,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" 
            alt="Donate with ???"
            style={buttonStyle}
            />
          </a>
        }
      />
      <p>
      [<a href="https://github.com/lyldev/yi-translate/blob/master/BACKERS.md" target="_blank">
                Supporters List
              </a>]
              </p>
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
              [{browserInfo().name === "Chrome" ? (
                <a href={chromeExtensionUrl} target="_blank">
                  {browser.i18n.getMessage("extensionPageLabel")}
                </a>
              ) : (
                <a href={firefoxAddonUrl} target="_blank">
                  {browser.i18n.getMessage("addonPageLabel")}
                </a>
              )}]
              <span>　　</span>
              [<a href="https://github.com/lyldev/yi-translate" target="_blank">
                GitHub page
              </a>]
              
            </p>
          </div>
        }
      />
    </div>
  );
};
