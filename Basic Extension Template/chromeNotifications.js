
// this variable is required to create a notification. It can be customized before the notification is created by setting options.message = "Some string"
var options = {
	type:"basic",
	title:"SocialSec",
	message:"",
	iconUrl:"popup.jpg",
	
	};

//this is the actual line that calls the notification
chrome.notifications.create(options);

//Listener for notification click, some function is added inside ()
chrome.notifications.onClicked.addListener(userSettings)


//funtion opens new window or tab based on user prefences in Chrome. Cannot force new tab only. Will focus on new window/tab when opened.
function userSettings(){
	
	var x = window.open("index.html", '_blank');
	x.focus();
		
}

//This will change the icon file in the manifest and then change the icon on the browser
chrome.browserAction.setIcon({path:"icon2.png"});
