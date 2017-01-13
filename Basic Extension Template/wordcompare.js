// When submit button is pressed, textarea contents are checked against wordlist
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
		if (request.greeting != null){
			sendResponse({complete: "done"});
		}
		wordMatch(request.greeting);
	}
)
function wordMatch(text){
	document.getElementById("submit").onclick = function() {
		var submitstring = document.getElementById("text").value;
		if (wordlist.indexOf(submitstring) > -1) {
			alert("String matched");
		} else {
			alert("No exact match");
		}
	}
}