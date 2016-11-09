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
// Debugging function that serves as the callback function for httpGetAsync. Generates a popup dialog containing the returned JSON from the API call.
function GetAlert(response) {
	alert(response);
}
function jsonParse(json) {
	// Facebook JSON formatted data is converted to an object for easier handling.
	var userData = JSON.parse(json);
	//var userArray = Object.keys(userData).map(function(k) {return userData[k]});
	// Debugging: Print the object in console for examination
	console.log(userData);
}
