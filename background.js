chrome.action.onClicked.addListener(async (tab) => {

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  let nextState;
  if (prevState == "" || prevState == "OFF") {
    nextState = "ON";
  } else if (prevState == "ON") {
    nextState = "OFF";
  }

  chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });

  if (prevState == "") {
    chrome.scripting.executeScript({
      target : {tabId : tab.id},
      files : [ "./scripts/blinds.js" ],
    });

    chrome.scripting.insertCSS({
      files: ['./css/style.css'],
      target: { tabId: tab.id }
    });
  }
    
  if (prevState == "OFF") {
    chrome.scripting.removeCSS({
      files: ['./css/blinds-off.css'],
      target: { tabId: tab.id }
    });
  } else if (prevState == "ON") {
    chrome.scripting.insertCSS({
      files: ['./css/blinds-off.css'],
      target: { tabId: tab.id }
    });
  }
})