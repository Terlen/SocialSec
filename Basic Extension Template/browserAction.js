chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "secure"){
		sendResponse({farewell: "goodbye"});
		chrome.browserAction.setIcon({path : "icon.png"});
		chrome.browserAction.setPopup({popup : "popup2.html"});
	} else if (request.pass != null){
			var data = request.pass;
			alert(data);
			sendResponse({complete: "done"});
			
		}
  });