// This is a content script that runs on any page with a URL of https://www.facebook.com/connect/*
// It is used to grab the user access token after they log in through the extension
var token = document.location.toString();
// The URL fetched from the Facebook login page is parsed and the access token is extracted
token = token.substring(token.indexOf('=')+1, token.indexOf('&'));
alert(token);
chrome.runtime.sendMessage({greeting:"secure"}, function(response){
			console.log(response.complete);
		});

// The extracted token is then saved to chrome.storage.
chrome.storage.sync.set({ "accessToken" : token }, function() {
		if (chrome.runtime.error) {
			alert("Runtime error.");
		} else {
			// The login success page has no additional purpose and can safely be closed.
			//window.close();
		}
  });
