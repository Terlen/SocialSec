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
	
function storage() {
	// Eventhandler for Load button click
	document.getElementById("retrieve").onclick = function() {
		// chrome.storage API call, retrieve data stored under key "myKey", inject the data back into the textarea.
		chrome.storage.sync.get("myKey", function(items){
		// Display fetch results on page
		options.message = items.myKey;
		chrome.browserAction.setIcon({path:"icon2.png"});
		chrome.notifications.create(options);
	});
		
	}
	// Eventhandler for Submit button click
	document.getElementById("submittext").onclick = function() {
		// Pull data from textarea and store in 'd'
		var d = document.getElementById("userinput").value;
		// chrome.storage API call, save data 'd' with key "myKey"
		chrome.storage.sync.set({ "myKey" : d }, function() {
		if (chrome.runtime.error) {
			console.log("Runtime error.");
		} else {
			options.message = "Data Saved!"
			chrome.browserAction.setIcon({path:"icon.png"});
			chrome.notifications.create(options);

		}
		// Empty textarea after data is saved
		document.getElementById("userinput").value = "";
  });
};
	
}