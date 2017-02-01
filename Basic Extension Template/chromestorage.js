// Function handling storage and retrieval of data via the chrome.storage API
// Waits for popup.html to fully load before executing so all buttons are available

var options = {
	type:"basic",
	title:"SocialSec",
	message:"",
	iconUrl:"popup.jpg",
	
	};

chrome.notifications.onClicked.addListener(userSettings)

function userSettings(){
	
	var x = window.open("index.html", '_blank');
	x.focus();
		
}
	