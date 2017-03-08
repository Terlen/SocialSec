// Defines a flag that is used to determine if the SocialSec notification already has a listener added.
var listenerExists;
// Add a listener to the event page that waits for a message from content scripts.
// If message greeting contains "secure", Facebook login has successfully acquired a login token.
// If message passvalue contains any string, a password has been entered.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "secure"){
		sendResponse({farewell: "goodbye"});
		// Use token to fetch GraphAPI data on user
		getPicture();
		getData();
		// Change extension popup and icon to reflect that the user is protected.
		chrome.browserAction.setIcon({path : "icon.png"});
		chrome.browserAction.setPopup({popup : "popup2.html"});
	} else if (request.passvalue != undefined){
			// Check if password data is stored in the trie
			if (trie.contains(trie.root, request.passvalue)){
				// If data is found in trie, create a notification alerting the user.
				notifications(request, sender, sendResponse);
				notificationPage();
				return true;
			}
		}
  });

// Function opens new window or tab based on user prefences in Chrome. Cannot force new tab only. Will focus on new window/tab when opened.
function userSettings(){
	
	var x = window.open("index.html", '_blank');
	x.focus();
}
// Function that defines the Chrome notification.
function notifications(request, sender, sendResponse){
	var options = {
				type:"basic",
				title:"SocialSec",
				message:"",
				iconUrl:"SS.png",
	};
		//alert("running");
			options.message = "The detected password contains personal information!";
			chrome.notifications.create(options);
			sendResponse({complete: "done"});
}
// Function that adds a listener to the created notification that opens a new tab with a SocialSec page. If a listener already exists, don't add another listener.
function notificationPage(){
	if (listenerExists != 1){
		chrome.notifications.onClicked.addListener(userSettings);
		listenerExists = 1;
	}
}