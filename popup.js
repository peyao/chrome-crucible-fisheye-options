const DEFAULT_FONT_SIZE = '12px';
const DEFAULT_LINE_HEIGHT = '19px';
const page = chrome.extension.getBackgroundPage();


let fontSizeDecrease = document.getElementById('font-size-decrease');
let fontSizeDisplay = document.getElementById('font-size-display');
let fontSizeIncrease = document.getElementById('font-size-increase');

let lineHeightDecrease = document.getElementById('line-height-decrease');
let lineHeightDisplay = document.getElementById('line-height-display');
let lineHeightIncrease = document.getElementById('line-height-increase');

let resetAll = document.getElementById('reset-all');

// init
chrome.storage.sync.get('fontSize', (data) => {

  // set font in page from storage
  changeFontSize(data.fontSize);

  // init fontSizeDisplay
  fontSizeDisplay.textContent = data.fontSize;
  fontSizeDisplay.setAttribute('value', data.fontSize);
});

chrome.storage.sync.get('lineHeight', (data) => {

  // set line height in page from storage
  changeLineHeight(data.lineHeight);

  // init lineHeightDisplay
  lineHeightDisplay.textContent = data.lineHeight;
  lineHeightDisplay.setAttribute('value', data.lineHeight);
})

function changeCSS(css) {
  const STYLE_ELEMENT_ID = 'crucible-options-style';

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.insertCSS(
      tabs[0].id,
      {
        code: css
      }
    )
  });
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


  // update the display
  fontSizeDisplay.textContent = fontSize;
  fontSizeDisplay.setAttribute('value', fontSize);
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

  // update the display
  lineHeightDisplay.textContent = lineHeight;
  lineHeightDisplay.setAttribute('value', lineHeight);
}

function getCurrentFontSize() {
  return parseInt(fontSizeDisplay.getAttribute('value').match(/[0-9]+/)[0]);
}
function getCurrentLineHeight() {
  return parseInt(lineHeightDisplay.getAttribute('value').match(/[0-9]+/)[0]);
}

fontSizeDecrease.onclick = () => {
  const currentFontSize = getCurrentFontSize();
  const newFontSize = currentFontSize - 1;
  changeFontSize(newFontSize);
  chrome.storage.sync.set({fontSize: newFontSize});
}
fontSizeIncrease.onclick = () => {
  const currentFontSize = getCurrentFontSize();
  const newFontSize = currentFontSize + 1;
  changeFontSize(newFontSize);
  chrome.storage.sync.set({fontSize: newFontSize});
}

lineHeightDecrease.onclick = () => {
  const currentLineHeight = getCurrentLineHeight();
  const newLineHeight = currentLineHeight - 1;
  changeLineHeight(newLineHeight);
  chrome.storage.sync.set({lineHeight: newLineHeight});
}
lineHeightIncrease.onclick = () => {
  const currentLineHeight = getCurrentLineHeight();
  const newLineHeight = currentLineHeight + 1;
  changeLineHeight(newLineHeight);
  chrome.storage.sync.set({lineHeight: newLineHeight});
}

resetAll.onclick = () => {
  const newFontSize = parseInt(DEFAULT_FONT_SIZE.match(/[0-9]+/)[0]);
  const newLineHeight = parseInt(DEFAULT_LINE_HEIGHT.match(/[0-9]+/)[0]);
  changeFontSize(newFontSize);
  changeLineHeight(newLineHeight);
  chrome.storage.sync.set({fontSize: DEFAULT_FONT_SIZE});
  chrome.storage.sync.set({lineHeight: DEFAULT_LINE_HEIGHT});
}