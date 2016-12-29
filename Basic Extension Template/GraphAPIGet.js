// HTTP GET request function. 'theUrl' is passed from FacebookLogin.js and consists of the desired Graph API endpoint with the user's access token appended.
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        // XMLHttpRequests are Asynchronous, so this code detects when the request has successfully completed.
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

// Facebook JSON formatted data is converted to an object for easier handling.
function jsonParse(json) {
	var userData = JSON.parse(json);
	wordlistStore(userData);
}

// Store JSON object in Google storage to retrieve later
function wordlistStore(jsonobject) {
	chrome.storage.sync.set({ "userdata" : jsonobject}, function() {
		if (chrome.runtime.error){
			alert("Runtime Error");
		}
});
}
