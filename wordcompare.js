// Creates array of words to be checked against
var wordlist = ["Cat","California","Music","New York"];

// When submit button is pressed, textarea contents are checked against wordlist
window.onload = function() {
	document.getElementById("submit").onclick = function() {
		var submitstring = document.getElementById("text").value;
		if (wordlist.indexOf(submitstring) > -1) {
			alert("String matched");
		} else {
			alert("No exact match");
		}
	}
	
}