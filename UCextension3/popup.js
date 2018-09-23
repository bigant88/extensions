// popup.js

function runSwitchjs() {
  chrome.tabs.executeScript({
    file: 'application.js'
  });
}

document.getElementById('clickme').addEventListener('click', runSwitchjs);