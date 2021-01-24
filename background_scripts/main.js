chrome.runtime.onInstalled.addListener(function() {
  console.log("ymdlink: onInstalled✔");
});

chrome.commands.onCommand.addListener(function(command) {
  if (command == "yank") {
    console.log("ymdlink: yank command is triggerd👉");
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var tab = tabs[0];
        const yanktxt = `[${tab.title}](${tab.url})`
        copy(yanktxt);
        console.log(`ymdlink: yanked ${yanktxt}🔗`);
    });
  }
});

const createTextArea = () => {
  const textArea = document.createElement("textarea");
  textArea.style.position = "absolute";
  textArea.style.left = "-100%";
  textArea.contentEditable = "true";
  return textArea;
}

const copy = (data) => {
  const textArea = createTextArea();
  textArea.value = data;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
