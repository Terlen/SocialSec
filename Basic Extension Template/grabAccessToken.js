// This is a content script that runs on any page with a URL of https://www.facebook.com/connect/*
// It is used to grab the user access token after they log in through the extension
//alert(document.location);
var token = document.location.toString();
// The URL fetched from the Facebook login page is parsed and the access token is extracted
token = token.substring(token.indexOf('=')+1, token.indexOf('&') -1);
alert(token);
// The extracted token is then saved to chrome.storage.
chrome.storage.sync.set({ "accessToken" : token }, function() {
		if (chrome.runtime.error) {
			alert("Runtime error.");
		} else {
			window.close();
		}
  });
