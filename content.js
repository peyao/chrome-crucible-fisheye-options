// init
chrome.storage.sync.get('fontSize', (data) => {

  console.log("Crucible Options changing fontSize to : ", data.fontSize);
  // set font in page from storage
  changeFontSize(data.fontSize);
});

chrome.storage.sync.get('lineHeight', (data) => {

  console.log("Crucible Options changing lineHeight to : ", data.lineHeight);

  // set line height in page from storage
  changeLineHeight(data.lineHeight);
})

function changeCSS(css) {
  const newStyleElement = document.createElement("style");
  newStyleElement.type = "text/css";
  newStyleElement.innerHTML = css;
  document.body.appendChild(newStyleElement);
}

/**
 * Font size selector and attribute:
 *
 * .lineContent
 *    > font-size: 14px
 */
function changeFontSize(fontSize) {
  const css = `
    td.lineContent {
      font-size: ${fontSize}px !important;
    }
  `;
  changeCSS(css);
}

/**
 * Line height selector and attribute:
 *
 * .inlineSource tr.sourceLine
 *    > height: modifiable (default ~19px)
 */
function changeLineHeight(lineHeight) {
  const css = `
    tr.sourceLine {
      height: ${lineHeight}px !important;
    }
  `;
  changeCSS(css);
}