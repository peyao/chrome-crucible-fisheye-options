const DEFAULT_FONT_SIZE = '12px';
const DEFAULT_LINE_HEIGHT = '19px';
const HOST_URL = '';

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({ fontSize: DEFAULT_FONT_SIZE }, function() {
    console.log("The font size is ", DEFAULT_FONT_SIZE);
  });
  chrome.storage.sync.set({ lineHeight: DEFAULT_LINE_HEIGHT }, function() {
    console.log("The line height is ", DEFAULT_LINE_HEIGHT);
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: HOST_URL},
          })
        ],
        actions: [
          new chrome.declarativeContent.ShowPageAction()
        ]
    }]);
  });
});
