// Function handling storage and retrieval of data via the chrome.storage API
// Waits for popup.html to fully load before executing so all buttons are available
window.onload = function() {
	// Eventhandler for Load button click
	document.getElementById("retrieve").onclick = function() {
		// chrome.storage API call, retrieve data stored under key "myKey", inject the data back into the textarea.
		chrome.storage.sync.get("myKey", function(items){
		// Display fetch results on page
		document.getElementById("demo").innerText = items.myKey;
		document.getElementById("status").innerText = "Data Loaded";
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
			document.getElementById("status").innerText = "Data Saved!";
		}
		// Empty textarea after data is saved
		document.getElementById("userinput").value = "";
  });
};
	
}