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
          <a href={patreonLink} target="_blank">
            <img
              src="https://c5.patreon.com/external/logo/become_a_patron_button.png"
              alt="Donate with patreon"
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
          <a href={chongyaLink} target="_blank">
            <img
              src="data:image/png;base64,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" 
              alt="Donate ??" 
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
              <span>　</span>
              <a href="https://github.com/lyldev/yi-translate" target="_blank">
                GitHub
              </a>
            </p>
          </div>
        }
      />
    </div>
  );
};
