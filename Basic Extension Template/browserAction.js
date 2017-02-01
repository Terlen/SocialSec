chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "secure"){
		sendResponse({farewell: "goodbye"});
		getData();
		chrome.browserAction.setIcon({path : "icon.png"});
		chrome.browserAction.setPopup({popup : "popup2.html"});
	} else if (request.passvalue != undefined){
			notifications(request, sender, sendResponse);
			return true;
		}
  });
  


//funtion opens new window or tab based on user prefences in Chrome. Cannot force new tab only. Will focus on new window/tab when opened.
function userSettings(){
	
	var x = window.open("index.html", '_blank');
	x.focus();
		
}
function notifications(request, sender, sendResponse){
	var options = {
				type:"basic",
				title:"SocialSec",
				message:"",
				iconUrl:"icon.png",
	
	};
			options.message = "The detected password was : " + request.passvalue;
			chrome.notifications.create(options);
			chrome.notifications.onClicked.addListener(userSettings);
			sendResponse({complete: "done"});
}